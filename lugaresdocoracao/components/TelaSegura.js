import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../assets/style.js';
import { CameraComponent } from './Camera.js'; 
import { MapComponent } from './Map.js';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';


export function TelaSegura({ onLogout }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [formDatas, setFormDatas] = useState([]);
  const [currentData, setCurrentData] = useState({
    imageUri: '',
    mapCoordinates: null,
  });

  const handleLogout = () => {
    onLogout();
  };
  
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
    setModalVisible(false);
  };

  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  const handleOpenMap = () => {
    setMapVisible(true);
    setModalVisible(false);
  };

  const handleCloseMap = (coordinates) => {
    setCurrentData(prevData => ({
      ...prevData,
      mapCoordinates: coordinates,
    }));
    setMapVisible(false);
  };

  const handleSaveFormData = () => {
     setFormDatas(prevFormDatas => [
      ...prevFormDatas,
      {
        imageUri: currentData.imageUri || 'https://via.placeholder.com/400',
        mapCoordinates: currentData.mapCoordinates || {
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      }, 
    ]);
    setModalVisible(false);
    setCurrentData({ imageUri: '', mapCoordinates: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem Vindo! </Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <AntDesign name="poweroff" size={36} color="black" />
      </TouchableOpacity>

      {/* Renderização dos Cards */}
      <ScrollView style={styles.scrollView}>
      {formDatas.map((data, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Informação do Card</Text>
          <Image source={{ uri: data.imageUri }} style={styles.cardImage} />
          <MapView
            style={styles.cardMap}
            initialRegion={data.mapCoordinates}
          >
            <Marker coordinate={data.mapCoordinates} />
          </MapView>
          <Text style={styles.cardContent}>Hic card brevem descriptionem continet. Textus est in lingua Latina. Utilis ad informationem essentialem et concisam praebendam. </Text>
        </View>
      ))}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handleOpenModal}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cadastre um Lugar no seu coração </Text>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenCamera}>
            <Text style={styles.modalOptionText}> <AntDesign name="camerao" size={24} color="black" /> | Foto </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenMap}>
            <Text style={styles.modalOptionText}> <Feather name="map-pin" size={24} color="black" /> | Map </Text>
          </TouchableOpacity>
          <View style={styles.textAreaContainer}>
          <TouchableOpacity>
            <TextInput style={styles.modalInput} placeholder="Descrição (Opcional)" />
          </TouchableOpacity>
          </View>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={[styles.modalButtonCancel]} onPress={handleCloseModal}>
              <Text style={styles.buttonText}> <MaterialIcons name="cancel" size={24} color="black" /> | Cancelar </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButtonSend]} onPress={handleSaveFormData}>
              <Text style={styles.buttonText}> <Feather name="send" size={24} color="black" /> | Enviar </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      

      <Modal visible={cameraVisible} animationType="slide">
        <CameraComponent onClose={handleCloseCamera} />
      </Modal>
      <Modal visible={mapVisible} animationType="slide" onRequestClose={() => handleCloseMap(currentData.mapCoordinates)}>
        <MapComponent onClose={handleCloseMap} />
      </Modal>
    </View>
  );
}
