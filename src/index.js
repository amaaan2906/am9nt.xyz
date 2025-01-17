import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __root = path.resolve()

const app = express()
dotenv.config({
	path: 'src/.env',
})

// Middlewares
app.use(morgan('common'))
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

import base from './routes/index.js'
app.use('/', base)

// Register demo app urls
// TODO: need to plan integration techniques
// import demoUrls from "../data/demo.js"
// demoUrls.demos.map((a) => {
// 	app.get(`/project/${a.baseUrl}`, (req, res) => {
// 		res.send(a.buildPath)
// 	})
// })

// Error handlers
app.use((req, res, next) => {
	res.status(404)
	const error = new Error(`- Not Found - ${req.originalUrl}`)
	next(error)
})
app.use((err, req, res, next) => {
	const code = res.statusCode !== 200 ? res.statusCode : 500
	res.status(code)
	res.json({
		message: err.message,
	})
})

// Run app
const PORT = process.env.PORT || 2906
app.listen(PORT, () => {
	console.log('server is live on ' + PORT)
})
