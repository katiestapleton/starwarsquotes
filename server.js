const express = require('express');
const app = express();

//ES6 style. 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000, function() {
    console.log('listening on 3000')
})