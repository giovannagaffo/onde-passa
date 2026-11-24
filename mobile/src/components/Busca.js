import React from 'react'
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'

export default function Busca({ termo, onTermoAlterado, onBuscar, onLimpar }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme"
      />
      {termo !== '' && (
        <Pressable style={styles.botaoLimpar} onPress={onLimpar}>
          <Text style={styles.textoBotaoLimpar}>x</Text>
        </Pressable>
      )}
      <Pressable style={styles.botaoBuscar} onPress={onBuscar}>
        <Text style={styles.textoBotaoBuscar}>Buscar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 14,
  },
  botaoLimpar: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoLimpar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  botaoBuscar: {
    backgroundColor: '#E0473C',
    borderRadius: 6,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  textoBotaoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
})