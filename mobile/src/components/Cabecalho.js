import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <View style={styles.linhaTitulo}>
        <Text style={styles.emoji}>🍿</Text>
        <Text style={styles.titulo}>OndePassa</Text>
      </View>
      <Text style={styles.subtitulo}>Descubra onde assistir qualquer filme</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
  },
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginRight: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
})