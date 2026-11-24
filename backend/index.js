require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

// Cliente Axios configurado conforme o enunciado da Fase 3
const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
  },
  params: {
    language: 'pt-BR'
  }
})

// Função para simplificar o filme conforme a Tabela 5
function simplificarFilme(filme) {
  return {
    id: filme.id,
    titulo: filme.title,
    ano: filme.release_date ? filme.release_date.substring(0, 4) : null,
    nota: filme.vote_average ? Number(filme.vote_average.toFixed(1)) : null,
    poster: filme.poster_path ? `https://image.tmdb.org/t/p/w342${filme.poster_path}` : null
  }
}

// Rota de status inicial
app.get('/', (req, res) => {
  res.json({ app: "OndePassa", status: "online" })
})

// Rota GET /em-alta
app.get('/em-alta', async (req, res) => {
  try {
    const response = await tmdbClient.get('/trending/movie/week')
    const filmesSimplificados = response.data.results.map(simplificarFilme)
    res.json(filmesSimplificados)
  } catch (error) {
    console.error(error.message)
    res.status(502).json({ mensagem: "Não foi possível consultar o catálogo de filmes." })
  }
})

// Rota GET /filmes?busca=...
app.get('/filmes', async (req, res) => {
  const busca = req.query.busca

  if (!busca || busca.trim() === "") {
    return res.status(400).json({ mensagem: "Informe o título de um filme." })
  }

  const termoLimpo = busca.trim()
  console.log(`Busca: ${termoLimpo}`)

  try {
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query: termoLimpo,
        include_adult: false
      }
    })
    const filmesSimplificados = response.data.results.map(simplificarFilme)
    res.json(filmesSimplificados)
  } catch (error) {
    console.error(error.message)
    res.status(502).json({ mensagem: "Não foi possível consultar o catálogo de filmes." })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend do OndePassa no ar. Porta: ${PORT}.`)
})