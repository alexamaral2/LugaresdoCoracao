import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../assets/style.js';
import { CameraComponent } from './Camera.js'; 

export function TelaSegura({ onLogout }) {
  const [cameraVisible, setCameraVisible] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
  };

  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenCamera}>
        <Text style={[styles.button, { backgroundColor: 'green' }]}>Abrir Câmera</Text>
      </TouchableOpacity>
      <Modal visible={cameraVisible} animationType="slide">
        <CameraComponent onClose={handleCloseCamera} />
      </Modal>
      <Text style={styles.title}>Usuário logado com sucesso! </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.button}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}
