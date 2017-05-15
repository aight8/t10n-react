const express = require('express')

const app = express()

app.use('/', express.static('build/prod'));

app.listen(process.env.PORT || 7070)
