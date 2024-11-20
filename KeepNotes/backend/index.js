import express from "express"
import dotenv from "dotenv"

dotenv.config({
    path: "../.env"
})

import cors from "cors"
// const corsOptions = {
//     origin: process.env.FRONTEND_URI,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }

const app = express()
const port=process.env.PORT
const notes = []
let id = 1
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('<h1>Welcome to Keep Notes...</h1>')
})

app.get('/api/get-all', (req, res) => {
    res.send(notes)
})

app.post('/api/add', (req, res) => {
    const newNote = {
        id: id++,
        title: req.body.title,
        body: req.body.body
    }
    notes.push(newNote)
    res.send(JSON.stringify(newNote))
})

app.put('/api/update/:id', (req, res) => {
    const urlIndex = parseInt(req.params.id)
    const elementIdx = notes.findIndex( index => index.id === urlIndex)
    if ( elementIdx === -1 ){
        return res.send(`id not found...`)
    }
    notes[elementIdx].id = urlIndex
    notes[elementIdx].name = req.body.name
    notes[elementIdx].title = req.body.title
    res.send(`Note Updated...${req.body}`)
})

app.get('/api/get/:id', (req, res) => {
    const elementIdx = notes.find( index => index.id === parseInt(req.params.id))
    if (!elementIdx){
        return res.send(`id not found...`)
    }
    res.send(elementIdx)
})

app.delete('/api/remove/:id', (req, res) => {
    const urlIndex = parseInt(req.params.id)
    const elementIdx = notes.findIndex( index => index.id === urlIndex)
    if ( elementIdx === -1 ){
        return res.send(`id not found...`)
    }
    notes.splice(elementIdx, 1)
    res.send(`Note Deleted...`)
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})