import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes({ titulo, filmes }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tituloSecao}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CartaoFilme
            titulo={item.titulo}
            ano={item.ano}
            nota={item.nota}
            poster={item.poster}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 12,
    marginBottom: 8,
  },
})