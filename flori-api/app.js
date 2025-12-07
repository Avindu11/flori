const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const logger = require('./utils/logger')

require('dotenv').config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))

app.use((err, req, res, next) => {
    logger.error(err.stack)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app