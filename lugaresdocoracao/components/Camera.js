import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import styles from '../assets/style_camera.js';

export function CameraComponent({ onClose }) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  if (hasPermission === null || hasMediaLibraryPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Libere o uso da câmera</Text>;
  }

  if (hasMediaLibraryPermission === false) {
    return <Text>Libere o uso da mídia</Text>;
  }

  async function take() {
    if (ref) {
      const data = await ref.current.takePictureAsync();
      setCaptured(data.uri);
      setOpen(true);
      setShowCloseButton(false);
      console.log(data);
      if (hasMediaLibraryPermission === true) {
        await MediaLibrary.saveToLibraryAsync(data.uri);
      } else {
        console.warn('Sem permissão para salvar na galeria!');
      }
    }
  }

  function handleClose() {
    setOpen(false);
    setShowCloseButton(true); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Image style={styles.icon} source={require("../assets/flip.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTake} onPress={take}>
            <Image style={styles.icon} source={require("../assets/camera.png")} />
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open} >
        <View style={styles.contentPhoto}>
          <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
            <Image style={styles.icon} source={require("../assets/close.png")} />
          </TouchableOpacity>
          <Image style={styles.img} source={{ uri: captured }} />
        </View>
      </Modal>
      {showCloseButton && ( 
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar Câmera</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
