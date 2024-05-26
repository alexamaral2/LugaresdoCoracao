import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../assets/style.js';
import { CameraComponent } from './Camera.js'; 
import { MapComponent } from './Map.js';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { initDB, insertLugar, fetchLugares, deleteLugar, updateLugar, syncLugaresWithFirebase } from './Database';


export function TelaSegura({ onLogout }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [formDatas, setFormDatas] = useState([]);
  const [currentData, setCurrentData] = useState({
    imageUri: '',
    mapCoordinates: null,
  });

  useEffect(() => {
    initDB();
    loadLugares();
    syncLugaresWithFirebase();
  }, []);

  const loadLugares = () => {
    fetchLugares((success, data) => {
      if (success) setFormDatas(data);
    });
  };

  const handleLogout = () => {
    onLogout();
  };
  
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditId(null);
    setTitulo('');
    setCurrentData({imageUri: '', mapCoordinates: null });
    setDescricao('');
    setErrorMessage('');
    loadLugares();
    setModalVisible(false);
  };

  const handleOpenCamera = () => {
    setCameraVisible(true);
    setModalVisible(false);
  };

  const handleCloseCamera = (imageUri) => {
    setCurrentData(prevData => ({
      ...prevData,
      imageUri: imageUri,
    }));
    setCameraVisible(false);
    setModalVisible(true);
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
    setModalVisible(true);
  };
  
  const handleUpdate = (latitude, longitude, image) => {
    if (editId !== null) {
      updateLugar(editId,  titulo, latitude , longitude, image, descricao, (success, data) => {
        if (success) {
          setEditId(null);
          setTitulo('');
          setCurrentData({imageUri: '', mapCoordinates: null });
          setDescricao('');
          loadLugares();
          setModalVisible(false);
        }
      });
    }
  };

  const handleEdit = (id, title, image, latitude, longitude, descricao) => {
    setEditId(id),
    setTitulo(title),
    setCurrentData({imageUri: image, mapCoordinates: {latitude: latitude,longitude: longitude}}),
    setDescricao(descricao),
    setModalVisible(true)
  };

  const handleDelete = (id) => {
    deleteLugar(id, (success, data) => {
      if (success) loadLugares();
    });
  };

  const handleSaveFormData = () => {   
    if (!titulo.trim()) {
      setErrorMessage('O título é obrigatório.');
      return;
    }
    if (!currentData.imageUri) {
      setErrorMessage('A imagem é obrigatória.');
      return;
    }
    if (!currentData.mapCoordinates) {
      setErrorMessage('A localização é obrigatória.');
      return;
    }
    setErrorMessage('');

    const { latitude, longitude } = currentData.mapCoordinates;
    let image = currentData.imageUri;

    if (editId !== null) {
      handleUpdate(latitude, longitude, image);
    } else {
      if (titulo !== '') {
        insertLugar(titulo, latitude, longitude, image, descricao, (success, data) => {
          if (success) {
            setTitulo('');
            setCurrentData({imageUri: '', mapCoordinates: null });
            setDescricao('');
            loadLugares();
            setModalVisible(false);
          }
        });
      }
    }
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
          <Text style={styles.cardTitle}>{data.title}</Text>
          <Image
     source={{
        uri: `data:image/jpeg;base64,${data.image}`,}} style={styles.cardImage} />
          <MapView
            style={styles.cardMap}
            initialRegion={data.mapCoordinates}
          >
            <Marker coordinate={{ latitude: data.latitude, longitude: data.longitude }} />
          </MapView>
          <Text style={styles.cardContent}>{data.description}</Text>
          <TouchableOpacity style={styles.floatingButtonRemove} onPress={() => handleDelete(data.id)}>
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingButton} onPress={() => handleEdit(data.id, data.title, data.image, data.latitude, data.longitude, data.description)}>
            <AntDesign name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress={handleOpenModal}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cadastre um Lugar no seu coração </Text>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <View style={styles.textAreaContainer}>
          <TouchableOpacity>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Titulo (Obrigatório)" />
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenCamera}>
            <Text style={styles.modalOptionText}> <AntDesign name="camerao" size={24} color="black" /> | Foto </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenMap}>
            <Text style={styles.modalOptionText}> <Feather name="map-pin" size={24} color="black" /> | Map </Text>
          </TouchableOpacity>
          <View style={styles.textAreaContainer}>
          <TouchableOpacity>
            <TextInput style={styles.modalInput} value={descricao} onChangeText={setDescricao} placeholder="Descrição (Opcional)" />
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
      

      <Modal visible={cameraVisible} animationType="slide"  onRequestClose={() => handleCloseCamera(currentData.imageUri)}>
        <CameraComponent onClose={handleCloseCamera} />
      </Modal>
      <Modal visible={mapVisible} animationType="slide" onRequestClose={() => handleCloseMap(currentData.mapCoordinates)}>
        <MapComponent onClose={handleCloseMap} />
      </Modal>
    </View>
  );
}
