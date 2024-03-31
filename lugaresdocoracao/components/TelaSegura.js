import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/style.js';

export function TelaSegura({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuário logado com sucesso! </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.button}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}
