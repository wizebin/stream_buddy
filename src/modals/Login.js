import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login(props) {
  const { onDismiss, credentials, onSave } = props;
  const [host, setHost] = useState(credentials?.host || '192.168.1.107:9434');
  const [password, setPassword] = useState(credentials?.password || 'wizebin');

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: '200' }}>Enter your OBS creds</Text>
      <Text style={{ fontSize: 14, marginBottom: 30 }}>These are you obs-websocket credentials</Text>
      <Input value={host} onChangeText={setHost} placeholder="host"></Input>
      <Input secureTextEntry textContentType="password" value={password} onChangeText={setPassword} placeholder="password"></Input>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
        <Button style={{ backgroundColor: '#555' }} onPress={() => onSave({ host, password })}>Save</Button>
      </View>
    </View>
  );
}
