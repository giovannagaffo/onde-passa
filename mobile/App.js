import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'
import Carregando from './src/components/Carregando'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregarFilmesEmAlta() {
      try {
        const response = await backendClient.get('/em-alta')
        setEmAlta(response.data)
      } catch (err) {
        console.error(err)
        setErro("Não foi possível carregar os filmes. Verifique se o backend está no ar.")
      } finally {
        setCarregando(false)
      }
    }

    carregarFilmesEmAlta()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Cabecalho />
        
        <View style={styles.conteudo}>
          {carregando ? (
            <Carregando mensagem="Buscando os filmes em alta..." />
          ) : erro ? (
            <View style={styles.centro}>
              <Text style={styles.textoErro}>{erro}</Text>
            </View>
          ) : (
            <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
          )}
        </View>

        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoErro: {
    color: '#E0473C',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
})