// load environment variables from .env file
require('dotenv').config()

module.exports = {
  DATASET_FOLDER: process.env.DATASET_FOLDER || './dataset',
  PORT: process.env.PORT || 3000,
  MONGO_CONN_URL: process.env.MONGO_CONN_URL || 'mongodb://127.0.0.1:27017/a2-superheroes',
}
