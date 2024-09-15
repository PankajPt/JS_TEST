require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (rep, res) => {
    res.send('<h2>Twitter Id: @Pankajpt40</h2>')
})

app.get('/youtube', (req, res) => {
    res.send('<h1>Coming Soon.....!!!</h1>')
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})