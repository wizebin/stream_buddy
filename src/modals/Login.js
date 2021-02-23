import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login(props) {
  const { credentials, onSave } = props;
  const [host, setHost] = useState(credentials?.host);
  const [password, setPassword] = useState(credentials?.password);

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: '200', color: '#fff' }}>OBS-Websocket Credentials</Text>
      <Text style={{ fontSize: 14, marginBottom: 30, color: '#fff' }}>Enter the computer ip running OBS, and the port/password you specified in the obs-websocket plugin</Text>
      <Input style={{ color: '#fff' }} value={host} onChangeText={setHost} placeholder="host (eg. 192.168.0.2:4444)"></Input>
      <Input style={{ color: '#fff' }} secureTextEntry textContentType="password" value={password} onChangeText={setPassword} placeholder="password"></Input>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
        <Button style={{ backgroundColor: '#5a5' }} onPress={() => onSave({ host, password })}>Save</Button>
      </View>
    </View>
  );
}
