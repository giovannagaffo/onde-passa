import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

export default function Provedores({ titulo, provedores }) {
  if (!provedores || provedores.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloSecao}>{titulo}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.lista}>
        {provedores.map((item) => (
          <View key={item.nome} style={styles.item}>
            {item.logo ? (
              <Image source={{ uri: item.logo }} style={styles.logo} />
            ) : (
              <View style={styles.semLogo}>
                <Text style={styles.textoSemLogo}>Sem logo</Text>
              </View>
            )}
            <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  lista: {
    paddingVertical: 2,
  },
  item: {
    alignItems: 'center',
    marginRight: 12,
    width: 64,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginBottom: 4,
  },
  semLogo: {
    width: 56,
    height: 56,
    backgroundColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 4,
  },
  textoSemLogo: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
  },
  nome: {
    fontSize: 11,
    color: '#444',
    textAlign: 'center',
  },
})