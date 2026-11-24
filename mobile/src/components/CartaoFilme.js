import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { formatarNota } from '../utils/formatacao'

export default function CartaoFilme({ titulo, ano, nota, poster }) {
  return (
    <View style={styles.cartao}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={styles.semPoster}>
          <Text style={styles.textoSemPoster}>Sem pôster</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
        {ano ? <Text style={styles.ano}>{ano}</Text> : null}
        <Text style={styles.nota}>{formatarNota(nota)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 12,
    padding: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  poster: {
    width: 70,
    height: 105,
    borderRadius: 6,
  },
  semPoster: {
    width: 70,
    height: 105,
    backgroundColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  textoSemPoster: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ano: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nota: {
    fontSize: 14,
    color: '#e67e22',
    fontWeight: '600',
  },
})