const express = require('express');
const cors = require('cors');
const app = express();

const Connection = require('./connection');
Connection.createTable();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type','access-control-allow-origin'],
        credentials: true,
        optionsSuccessStatus: 200,
        maxAge: 86400
    })
);

app.get('/', async (req, res) => {
    //const params  = req.query;
    //console.log(id)
    if(req.query){
        const dados = await Connection.getData(req.query)
        return res.json(dados);
    }else{
        const dados = await Connection.getDatas();
        return res.json(dados);
    }
})

app.get('/login', async (req, res) => { 
    console.log(req.query); 
    const dados = await Connection.login(req.query)
    return res.json(dados);
})

app.post('/user', (req, res) => {
    //const { name, title } = req.body;
    Connection.createUser(req.body)
    return res.json(req.body);
})

app.post('/', (req, res) => {
    //const { name, title } = req.body;
    Connection.create(req.body)
    return res.json(req.body);
})

app.patch('/update', async (req, res) => {
    //const { id, name, title } = req.body;
    //const dados = await Connection.getData(id);
    Connection.update(req.body)
    return res.json({message:  'Alterado'});
})


module.exports = app;