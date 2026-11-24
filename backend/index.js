require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ app: "OndePassa", status: "online" })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend do OndePassa no ar. Porta: ${PORT}.`)
})