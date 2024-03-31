// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { TelaSegura } from './components/TelaSegura';
import { styles } from './assets/style';

export default function App() {
  const [biometria, setBiometria] = useState(false);
  const [render, setRender] = useState(false);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    (async () => {
      const compativel = await LocalAuthentication.hasHardwareAsync();
      setBiometria(compativel);
    })();
  }, []);

  const changeRender = () => setRender(true);

  useEffect(() => {
    if (render) {
      (async () => {
        const authentication = await LocalAuthentication.authenticateAsync();
        if (authentication.success) {
          setAccess(true);
        } else {
          setAccess(false);
          setRender(false);
        }
      })();
    }
  }, [render]);

  const handleLogout = () => {
    setRender(false);
    setAccess(false);
  };

  if (render && access) {
    return <TelaSegura onLogout={handleLogout} />;
  } else {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/Icon-central.jpg')} style={{ width: 100, height: 100, marginBottom: 20 }} />
        <Text style={styles.title}>
          {biometria ? 'Olá!' : 'Dispositivo não compatível com biometria'}
        </Text>
        <TouchableOpacity onPress={changeRender}>
          <Text style={styles.button}>Login </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}
