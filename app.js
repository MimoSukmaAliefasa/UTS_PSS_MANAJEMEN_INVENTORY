const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))    

const routers = require ('./routes')
app.use ('/', routers)

app.listen(port, () => {
    console.log(port);
})