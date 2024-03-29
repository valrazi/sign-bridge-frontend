require('dotenv').config()

const pjson = require('./package')
const port = process.env.PORT

module.exports = {
    apps: [{
        name: `${pjson.name}:${port || 8080}`,
        script: './app.cjs',
        watch: false,
        env: {
            ...require('dotenv').config().parsed
        },
    }]
}