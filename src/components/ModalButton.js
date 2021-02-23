import React, { Fragment, useState } from 'react';
import Button from './Button';
import { DismissableModal } from './DismissableModal';

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
