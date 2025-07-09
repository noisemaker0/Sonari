import React from 'react';
import { Modal as PaperModal, Portal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const Modal = ({ visible, onDismiss, children, style }) => {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, style]}
      >
        {children}
      </PaperModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default Modal;