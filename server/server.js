const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const PORT = 3000 || process.env.PORT
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))
app.get('/', (req, res) => res.status(200).send({hello: 'word'}))



app.listen(PORT, () => console.log('Example app listening on port 3000!'))
