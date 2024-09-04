import { Request, Response } from "express"

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const storyRouter = require('./stories').router

const app = express()
const PORT = process.env.PORT || 8080;


app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.get('/', (req: Request, res: Response) => { 
    res.send('API is running...')
})

app.use('/stories', storyRouter)

app.listen(PORT, console.log(`Server started on port ${PORT}`));