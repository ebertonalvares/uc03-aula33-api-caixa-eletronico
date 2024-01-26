const express = require('express')

const app = express()
const port = 5000

app.use(express.json())

app.get("/status", (request, response) => {
  response.send({ "status": "ok" })
})

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})