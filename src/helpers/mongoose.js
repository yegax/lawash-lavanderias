const mongoose = require('mongoose')
const { MONGO_CONN_URL } = require(__basedir + '/config')

mongoose.connect(MONGO_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("[MONGODB] Connected!")
}).catch((error => {
    console.log("[MONGODB] error: ", error)
    // exitting helps when Mongo doesn't connect, to restart the server
    process.exit(10)
}))
