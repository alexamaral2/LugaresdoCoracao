import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';

export function MapComponent({ onClose }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastMarker, setLastMarker] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão da localização negada!');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLastMarker(coordinate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => onClose(lastMarker)}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <MapView
        loadingEnabled={true}
        region={
          !location ?
            {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            } :
            {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }
        }
        style={styles.map}
        onPress={handleMapPress}
      >
        {location && (
          <Marker
            coordinate={location}
            title="Localização atual"
            description="Você está aqui."
            pinColor="blue"
          />
        )}

        {lastMarker && (
          <Marker
            coordinate={lastMarker}
            title="Novo Marcador"
            description="Nova Localização selecionada."
          />
        )}
      </MapView>
      <View style={styles.textContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>{errorMsg || `Localização atual: ${JSON.stringify(location)}`}</Text>
          <Text style={styles.text}>{lastMarker ? `Marcador Selecionado: ${JSON.stringify(lastMarker)}` : 'Toque no mapa para selecionar um marcador'}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "80%",
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  text: {
    margin: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  scrollView: {
    width: '100%',
  },
});
