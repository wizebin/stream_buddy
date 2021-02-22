import React, { Fragment, useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Button from './Button';

function DismissableModal(props) {
  return (
    <Modal visible style={{ width: '100%', height: '100%' }}>
      <SafeAreaView style={{ width: '100%', height: '100%' }}>
        <TouchableOpacity onPress={props.onDismiss} style={{ backgroundColor: '#333', opacity: .5, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 1 }}></TouchableOpacity>
        <View style={[{ borderRadius: 12, backgroundColor: 'rgba(255,255,255, .8)', position: 'absolute', left: 15, top: 40, right: 15, bottom: 15, zIndex: 2 }, props.style]}>
          {props.children}
          <Button onPress={props.onDismiss} textStyle={{ color: '#222' }} style={{ position: 'absolute', top: 5, right: 5, borderRadius: 20, backgroundColor: '#fff' }}>X</Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default function ModalButton(props) {
  const { children, onSave, modal, modalProps, modalContainerStyle,  ...rest } = props;
  const ModalView = modal;
  const [modalVisible, setModalVisible] = useState(false);
  const dismiss = () => setModalVisible(false);
  const save = (...passthrough) => {
    dismiss();
    onSave?.(...passthrough);
  };

  return (
    <Fragment>
      <Button onPress={() => setModalVisible(true)} {...rest}>{children}</Button>
      {modalVisible ? <DismissableModal style={modalContainerStyle} onDismiss={dismiss}><ModalView {...modalProps} onSave={save} onDismiss={dismiss} /></DismissableModal> : null}
    </Fragment>
  );
};
