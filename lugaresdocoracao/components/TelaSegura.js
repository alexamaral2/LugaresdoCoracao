import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { styles } from '../assets/style.js';
import { CameraComponent } from './Camera.js'; 
import { MapComponent } from './Map.js'; 
import { AntDesign, Entypo } from '@expo/vector-icons';

export function TelaSegura({ onLogout }) {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false); 

  const handleLogout = () => {
    onLogout();
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
  };

  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  const handleOpenMap = () => {
    setMapVisible(true);
  };

  const handleCloseMap = () => {
    setMapVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo! </Text>
      <View style={localStyles.bottomIconsContainer}>
        <TouchableOpacity onPress={handleOpenCamera}>
          <AntDesign name="camera" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenMap}>
          <Entypo name="map" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign name="poweroff" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <Modal visible={cameraVisible} animationType="slide">
        <CameraComponent onClose={handleCloseCamera} />
      </Modal>
      <Modal visible={mapVisible} animationType="slide" onRequestClose={handleCloseMap}>
        <MapComponent onClose={handleCloseMap} />
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  bottomIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    paddingVertical: 10,
  },
});
