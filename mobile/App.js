import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'
import Carregando from './src/components/Carregando'
import ListaFilmes from './src/components/ListaFilmes'
import Busca from './src/components/Busca'
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Novos estados da Fase 7
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)

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

  async function handleBuscar() {
    setCarregando(true)
    setErro(null)
    try {
      const response = await backendClient.get(`/filmes?busca=${termo}`)
      setResultados(response.data)
      setTermoBuscado(termo)
    } catch (err) {
      console.error(err)
      const mensagemErro = err.response?.data?.mensagem || "Não foi possível buscar os filmes."
      setErro(mensagemErro)
    } finally {
      setCarregando(false)
    }
  }

  function handleLimpar() {
    setTermo('')
    setTermoBuscado('')
    setResultados(null)
    setErro(null)
  }

  // Lógica de renderização de acordo com as condições da Tabela 8
  function renderizarConteudo() {
    if (carregando) {
      const mensagemCarregamento = resultados !== null || termo !== '' 
        ? "Procurando filmes..." 
        : "Buscando os filmes em alta..."
      return <Carregando mensagem={mensagemCarregamento} />
    }

    if (erro) {
      return (
        <View style={styles.centro}>
          <Text style={styles.textoErro}>{erro}</Text>
        </View>
      )
    }

    if (resultados === null) {
      return <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
    }

    if (resultados.length === 0) {
      return (
        <View style={styles.centro}>
          <Text style={styles.textoVazio}>Nenhum filme encontrado para "{termoBuscado}".</Text>
        </View>
      )
    }

    return <ListaFilmes titulo={`Resultados para "${termoBuscado}"`} filmes={resultados} />
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Cabecalho />
        
        <Busca
          termo={termo}
          onTermoAlterado={setTermo}
          onBuscar={handleBuscar}
          onLimpar={handleLimpar}
        />

        <View style={styles.conteudo}>
          {renderizarConteudo()}
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
  textoVazio: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
})