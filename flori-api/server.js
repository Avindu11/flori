const app = require('./app')
const { sequelize } = require('./models/index')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await sequelize.authenticate()
        logger.info('Database connected successfully.')

        app.listen(PORT, () => {
            console.log(`>>>>>> SERVER RUNNING ${process.env.NODE_ENV} MODE ON PORT ${PORT}} >>>>>>`)
            logger.info(`>>>>>> SERVER RUNNING ${process.env.NODE_ENV} MODE ON PORT ${PORT}} >>>>>>`)
        })
    } catch (error) {
        logger.error(`Unable to start server:`, error)
        process.exit(1)
    }
}

startServer()