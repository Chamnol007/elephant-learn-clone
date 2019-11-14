import React, { Component } from 'react';
import { Modal, Button, Icon, Alert, Message } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import _ from 'lodash';

class Global extends Component {
  render() {
    const {
      isAlertVisible,
      alertData,
      closeAlert,
      closeConfirmSaveModal,
      isConfirmModalVisible,
      saveDataToDatabase,
      dataToSave,
      closeConfirmLogout,
      logout,
      isConfirmLogoutVisible
    } = this.props;
    return (
      <div
        style={{
          paddingTop: '3.5em',
          paddingBottom: '1em',
          zIndex: '1',
          minHeight: '4em'
        }}
      >
        {isAlertVisible && (
          <Message
            closable
            onClose={closeAlert}
            showIcon
            type={alertData.type}
            title={_.upperFirst(alertData.type)}
            description={alertData.content}
          />
        )}
        <Modal
          backdrop="static"
          show={isConfirmLogoutVisible}
          onHide={closeConfirmLogout}
          size="xs"
        >
          <Modal.Body>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Icon
                icon="remind"
                style={{
                  color: '#ffb300',
                  fontSize: 24
                }}
              />
              <div style={{ fontSize: 16, marginTop: 10, textAlign: 'center' }}>
                {'Are you sure you wish to logout from system?'}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                logout().then(respone => {
                  if (_.isEmpty(respone)) {
                    Alert.success('Logout successfully');
                  } else {
                    Alert.error('Unable to logout!!!!');
                  }
                });
                closeConfirmLogout();
              }}
              appearance="primary"
            >
              Ok
            </Button>
            <Button onClick={closeConfirmLogout} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="xs"
          centered
          show={isConfirmModalVisible}
          color={'orange'}
          onHide={() => {
            closeConfirmSaveModal();
          }}
        >
          <Modal.Header closeButton>
            <h1>Confirm Save</h1>
          </Modal.Header>
          <Modal.Footer
            style={{
              justifyContent: 'space-between',
              display: 'flex'
            }}
          >
            <Button
              appearance="link"
              onClick={() => {
                closeConfirmSaveModal();
              }}
            >
              <MdCancel size={100} color={'red'} />
            </Button>
            <Button
              appearance="link"
              onClick={() => {
                saveDataToDatabase(dataToSave.data, dataToSave.type);
                closeConfirmSaveModal();
              }}
            >
              <MdCheckCircle size={100} color={'green'} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Global;
