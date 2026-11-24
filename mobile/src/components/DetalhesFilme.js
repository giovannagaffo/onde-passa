import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native'
import backendClient from '../utils/backendClient'
import Carregando from './Carregando'
import { formatarNota, formatarDuracao } from '../utils/formatacao'

export default function DetalhesFilme({ id, onVoltar }) {
  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const response = await backendClient.get(`/filme?id=${id}`)
        setFilme(response.data)
      } catch (err) {
        console.error(err)
        const mensagem = err.response?.data?.mensagem || "Não foi possível carregar os detalhes."
        setErro(mensagem)
      } finally {
        setCarregando(false)
      }
    }

    carregarDetalhes()
  }, [id])

  if (carregando) {
    return <Carregando mensagem="Carregando os detalhes..." />
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.textoErro}>{erro}</Text>
      </View>
    )
  }

  // Montagem da linha de informações conforme regras do PDF
  const partesInfo = []
  if (filme.ano) partesInfo.push(filme.ano)
  
  const duracaoFormatada = formatarDuracao(filme.duracao)
  if (duracaoFormatada) partesInfo.push(duracaoFormatada)
  
  if (filme.generos && filme.generos.length > 0) {
    partesInfo.push(filme.generos.join(' · '))
  }
  
  const linhaInformacoes = partesInfo.join(' · ')

  return (
    <View style={styles.container}>
      <Pressable style={styles.botaoVoltar} onPress={onVoltar}>
        <Text style={styles.textoBotaoVoltar}>‹ Voltar</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filme.fundo ? (
          <Image source={{ uri: filme.fundo }} style={styles.fundo} />
        ) : null}

        <View style={styles.conteudoPrincipal}>
          {filme.poster ? (
            <Image source={{ uri: filme.poster }} style={styles.poster} />
          ) : (
            <View style={styles.semPoster}>
              <Text style={styles.textoSemPoster}>Sem pôster</Text>
            </View>
          )}

          <View style={styles.infoGeral}>
            <Text style={styles.titulo}>{filme.titulo}</Text>
            {linhaInformacoes !== '' ? (
              <Text style={styles.linhaInfo}>{linhaInformacoes}</Text>
            ) : null}
            <Text style={styles.nota}>{formatarNota(filme.nota)}</Text>
          </View>
        </View>

        <View style={styles.secaoSinopse}>
          <Text style={styles.tituloSecao}>Sinopse</Text>
          <Text style={styles.textoSinopse}>
            {filme.sinopse ? filme.sinopse : "Sinopse indisponível."}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  botaoVoltar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textoBotaoVoltar: {
    fontSize: 16,
    color: '#E0473C',
    fontWeight: 'bold',
  },
  scroll: {
    paddingBottom: 20,
  },
  fundo: {
    width: '100%',
    height: 180,
  },
  conteudoPrincipal: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  semPoster: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  textoSemPoster: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  infoGeral: {
    flex: 1,
    marginLeft: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  linhaInfo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  nota: {
    fontSize: 15,
    color: '#e67e22',
    fontWeight: '600',
  },
  secaoSinopse: {
    paddingHorizontal: 12,
    marginTop: 10,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  textoSinopse: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
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