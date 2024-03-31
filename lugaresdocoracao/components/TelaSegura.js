import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../assets/style.js';
import { AntDesign  } from '@expo/vector-icons';

export function TelaSegura({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
      <AntDesign name="logout" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}
