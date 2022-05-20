import React, {useCallback} from 'react';
import {Modal} from 'react-native';

import Text from '../typography';

import {
  Container,
  Content,
  MessageContainer,
  ConfirmButton,
  CancelButton,
} from './styles';

export type AlertProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  cancelText: string;
  onCancel: () => void;
  onClose?: () => void;
};

const Alert: React.FC<AlertProps> = ({
  visible,
  title,
  message,
  confirmText,
  onConfirm,
  cancelText,
  onCancel,
  onClose,
}) => {
  const _onClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  return (
    <Modal visible={visible} transparent={true} onRequestClose={_onClose}>
      <Container>
        <Content>
          <MessageContainer>
            <Text variant="AlertTitle">{title}</Text>
            <Text variant="AlertMessage">{message}</Text>
          </MessageContainer>
          <ConfirmButton onPress={onConfirm}>
            <Text variant="AlertConfirm">{confirmText}</Text>
          </ConfirmButton>
          <CancelButton onPress={onCancel}>
            <Text variant="AlertCancel">{cancelText}</Text>
          </CancelButton>
        </Content>
      </Container>
    </Modal>
  );
};

export default React.memo(Alert);
