const express = require('express');
var app = express();

app.get('/', (req,res) => {
    res.sendFile('D:\\20202\\Chuyên đề\\Chuyen-De\\controllers\\home.html');
})

app.listen(3000, () =>{
    console.log('connect successfully');
})