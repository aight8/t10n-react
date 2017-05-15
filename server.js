const express = require('express')

const app = express()

app.use('/', express.static('build/prod'));
app.use('/', express.static('public'));

app.listen(process.env.PORT || 7070)
