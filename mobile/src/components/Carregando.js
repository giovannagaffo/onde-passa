import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'

export default function Carregando({ mensagem = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#E0473C" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
})