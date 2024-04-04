import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { styles } from '../assets/style.js';
import { CameraComponent } from './Camera.js'; 
import { AntDesign, Entypo } from '@expo/vector-icons';

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
      <Text style={styles.title}>Bem Vindo! </Text>
      <View style={localStyles.bottomIconsContainer}>
        <TouchableOpacity onPress={handleOpenCamera}>
          <AntDesign name="camera" size={50} color="black" />
        </TouchableOpacity>
        <Entypo name="map" size={50} color="black" />
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign name="poweroff" size={50} color="black" />
        </TouchableOpacity>
      </View>
      <Modal visible={cameraVisible} animationType="slide">
        <CameraComponent onClose={handleCloseCamera} />
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  bottomIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
