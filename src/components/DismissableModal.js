import React from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Button from './Button';

export function DismissableModal(props) {
  return (
    <Modal transparent visible style={{ width: '100%', height: '100%' }} animationType="slide">
      <SafeAreaView style={{ width: '100%', height: '100%' }}>
        <TouchableOpacity onPress={props.onDismiss} style={{ backgroundColor: '#000', opacity: .9, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 1 }}></TouchableOpacity>
        <View style={[{ borderRadius: 12, backgroundColor: 'rgba(255,255,255, .8)', position: 'absolute', left: 15, top: 40, right: 15, zIndex: 2 }, props.style]}>
          {props.children}
          <Button onPress={props.onDismiss} textStyle={{ color: '#f77' }} style={{ position: 'absolute', top: 5, right: 5, borderRadius: 20 }}>X</Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
