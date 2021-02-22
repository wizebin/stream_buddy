import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Button from './components/Button';
import ModalButton from './components/ModalButton';
import Login from './modals/Login';
import OBS from 'obs-websocket-js';
import Measure from './components/Measure';
import { constrainAspectRatio } from './utilities/constrainAspectRatio';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(props) {
  const [credentials, setCredentials] = useState({});
  const [recording, setRecording] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState();
  const [screenshotTimeout, setScreenshotTimeout] = useState(1000);
  const [pausedRecording, setPausedRecording] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [imageDimensions, setImageDimensions] = useState(null);
  const obs = useRef();

  useEffect(() => {
    const loadPersisted = async () => {
      const value = await AsyncStorage.getItem('stream_buddy_credentials');
      if (value) {
        try {
          const creds = JSON.parse(value);
          setCredentials(creds);
        } catch (err) {
          console.log('error grabbing credentials, probably not set yet', err);
        }
      }
    };
    loadPersisted();
  }, []);

  const cleanup = () => {
    if (obs.current) {
      obs.current?.removeAllListeners();
      obs.current?.disconnect();
      obs.current = null;
      setConnected(false);
    }
  };

  const persistCredentials = async () => {
    const jsonValue = JSON.stringify(credentials);
    await AsyncStorage.setItem('stream_buddy_credentials', jsonValue);
  };

  const reconnect = async () => {
    try {
      cleanup();
      if (credentials?.host && credentials?.password) {
        setError(null);
        obs.current = new OBS();

        obs.current.on('AuthenticationSuccess', (data) => setConnected(true));
        obs.current.on('AuthenticationFailure', (data) => {
          cleanup();
          setError(data);
        });

        obs.current.on('RecordingStarted', () => setRecording(true));
        obs.current.on('RecordingPaused', () => setPausedRecording(true));
        obs.current.on('RecordingResumed', () => setPausedRecording(false));
        obs.current.on('RecordingStopped', () => setRecording(false));

        await obs.current.connect({ address: credentials.host, password: credentials.password });

        const recordingStatus = await obs.current.send('GetRecordingStatus');
        setPausedRecording(recordingStatus.isRecordingPaused);
        setRecording(recordingStatus.isRecording);
      }
    } catch (err) {
      setError(err);
    }
  };

  const grabScreenshot = async () => {
    if (obs.current) {
      const sourceSettings = await obs.current.send('GetVideoInfo');
      const imageData = await obs.current.send('TakeSourceScreenshot', { embedPictureFormat: 'png', width: 600 });

      const { outputHeight, outputWidth } = sourceSettings;
      setImageDimensions({ width: outputWidth, height: outputHeight });
      setImageSource(imageData?.img);
    }
  };

  useEffect(() => {
    const interval = setInterval(grabScreenshot, screenshotTimeout);
    grabScreenshot();

    return () => clearInterval(interval);
  }, [recording, screenshotTimeout]);

  const startRecording = async () => {
    await obs.current.send('StartRecording');
  };

  const stopRecording = async () => {
    await obs.current.send('StopRecording');
  };

  const pauseRecording = async () => {
    await obs.current.send('PauseRecording');
  };

  const resumeRecording = async () => {
    await obs.current.send('ResumeRecording');
  };

  useEffect(() => {
    reconnect();
    persistCredentials();
    return cleanup;
  }, [credentials]);

  let recordingStatus = 'Not Recording';
  let statusColor = '#777';
  if (connected) {
    if (recording) {
      if (pausedRecording) {
        recordingStatus = 'Paused';
        statusColor = 'yellow';
      } else {
        recordingStatus = 'Recording';
        statusColor = 'red';
      }
    }
  } else {
    recordingStatus = '---';
    statusColor = '#777';
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#333', height: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12 }}>
        {!connected && <Button style={{ backgroundColor: '#555', marginRight: 20 }} onPress={reconnect}>Reconnect</Button>}
        <ModalButton style={{ backgroundColor: '#555' }} onSave={setCredentials} modalContainerStyle={{ backgroundColor: '#eee', padding: 30 }} modal={Login} modalProps={{ credentials }}>Login</ModalButton>
      </View>

      <View style={{ flexDirection: 'row', minHeight: 160, alignItems: 'center' }}>
        <View style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: statusColor }}></View>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 32, fontWeight: '600', color: '#fff' }}>{connected ? 'Connected' : 'Disconnected'}</Text>
          <Text style={{ fontSize: 21, fontWeight: '300', color: '#fff' }}>{recordingStatus}</Text>
        </View>
      </View>

      {error ? <Text>{JSON.stringify(error?.message || error)}</Text> : null}

      <Button onPress={recording ? stopRecording : startRecording} style={{ padding: 40, backgroundColor: '#444', margin: 15 }}>{recording ? 'Stop' : 'Record'}</Button>
      <Button onPress={pausedRecording ? resumeRecording : pauseRecording} style={{ padding: 40, backgroundColor: '#444', margin: 15 }}>{pausedRecording ? 'Resume' : 'Pause'}</Button>

      <View style={{ flex: 1, padding: 10 }}>
        {!!imageSource && !!imageDimensions && <Measure style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {dimensions => {
            const outputSize = constrainAspectRatio(dimensions, imageDimensions);

            return <Image style={{ width: outputSize.width, height: outputSize.height, backgroundColor: 'green' }} source={{ uri: imageSource }} />;
          }}
        </Measure>}
      </View>
    </SafeAreaView>
  );
}
