import express from 'express';
import path from 'path'
import usuarios from './assets/js/usuarios.js';
const app = express()
const PORT =3000;

const __dirname = path.resolve()

app.use(express.static('assets'));

app.get('/', (req, res)=>{
    res.send('Bienvenidos al servidor Adacadabra');
});

app.get('/abracadabra/usuarios', (erq, res)=>{
    res.json(usuarios)
})

app.use('/abracadabra/juego/:usuario', (req, res, next)=>{
    const usuario = req.params.usuario 
    const validar = usuarios.map((u) => u.toLowerCase()).includes(usuario.toLocaleLowerCase())
    if(validar){
        next()
    }else{
        res.sendFile(__dirname +'/assets/who.jpeg')
    }
})

app.get('/abracadabra/juego/:usuario', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/abracadabra/conejo/:n', (req, res)=>{
    const numero = Math.floor(Math.random() * 4 + 1);
    const n = +req.params.n;
    if(n == numero){
        res.sendFile(__dirname + '/assets/conejito.jpg')
    }else {
        res.sendFile((__dirname + '/assets/voldemort.jpg'));
    }
});

app.get('*', (req, res) => {
res.send(
    `<center><br><h1> Lo Sentimos, esta página no existe </h1></center>`
);
})

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});