import express from 'express'
import path from 'path'

const base = express.Router()

// Public pages
base.use(
	'/',
	express.static(path.resolve('src/portfolio'), {
		extensions: ['html'],
	})
)

// Health endpoint
base.route('/health').get((req, res) => {
	res.sendStatus(200)
})

// File download endpoints
base.get('/file/resume', (req, res) => {
	res.sendFile(path.resolve('data/Aman Tawakley 2023.pdf'))
})

// API data endpoints
base.get('/api/project-list', (req, res) => {
	res.sendFile(path.resolve('data/projects.json'))
})

base.post('/api/contact-form', (req, res) => {
	console.log(req.body)
	res.sendStatus(200)
})

export default base
