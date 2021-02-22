import OBS from 'obs-websocket-js';
const obs = new OBS();

let state = { recording: false, recording_paused: false };

function setStateAndLog(stateUpdate) {
  Object.assign(state, stateUpdate);

  console.log(state);
}

async function updateRecordingStatus() {
  const recordingStatus = await obs.send('GetRecordingStatus');

  if (recordingStatus.status === 'ok') {
    setStateAndLog({
      recording: recordingStatus.isRecording,
      recording_paused: recordingStatus.isRecordingPaused
    });
  } else {
    console.error('weird status', recordingStatus);
  }
}

async function execute() {
  try {
    obs.on('AuthenticationSuccess', (data) => console.log('AuthenticationSuccess', data));
    obs.on('AuthenticationFailure', (data) => console.log('AuthenticationFailure', data));

    obs.on('RecordingStarted', () => setStateAndLog({ recording: true }));
    obs.on('RecordingPaused', () => setStateAndLog({ recording_paused: true }));
    obs.on('RecordingResumed', () => setStateAndLog({ recording_paused: false }));
    obs.on('RecordingStopped', () => setStateAndLog({ recording: false }));

    await obs.connect({ address: 'localhost:9434', password: 'sillypassword' });

    await updateRecordingStatus();
  } catch (err) {
    console.error(err);
  }
}

function cleanup() {
  obs.removeAllListeners();
}

execute();
