import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Creditos() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  texto: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },
})