class Script {
    constructor() {
        require('dotenv').config()
        require('colors')
        require('./mongoose')
    }

    async run(callback) {
        try {
            console.log(`script started...`)
            await callback()
            console.log(`script completed.`)
        } catch (error) {
            console.error(error)
        } finally {
            process.exit(1)
        }
    }

    delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }
}

module.exports = new Script()