const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser') //Permite receber via POST os dados
const loginFirebase = require('./firebase/lerDados') //Le dados firebase

const port = 3000
var path = require('path')
const app = express()

app.use(session({
    secret:'fjvbdskjvbsdjkvbdskjvbdsjkvb', 
    proxy: true,
    resave: true, 
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended:true}))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

app.post('/',(req,res)=>{
    // loginFirebase(req.body.email, req.body.password, (verifica)=>{
        // if(verifica == true){
            //Logado com Sucesso!
            req.session.email = req.body.email
            res.render('dashboard')
        // } else {
            // res.render('login')
        // }
    // })
})

app.post('/report',(req,res)=>{
    loginFirebase(req.body.email, req.body.passoword, (verifica)=>{
        if(verifica == true){
            //Logado com Sucesso!
            req.session.email = req.body.email
            res.render('report')
        } else {
            res.render('login')
        }
    })
})

app.post('/settings',(req,res)=>{
    loginFirebase(req.body.email, req.body.passoword, (verifica)=>{
        if(verifica == true){
            //Logado com Sucesso!
            req.session.email = req.body.email
            res.render('settings')
        } else {
            res.render('login')
        }
    })
})

app.post('/help',(req,res)=>{
    loginFirebase(req.body.email, req.body.passoword, (verifica)=>{
        if(verifica == true){
            //Logado com Sucesso!
            req.session.email = req.body.email
            res.render('help')
        } else {
            res.render('login')
        }
    })
})

app.get('/', (req,res)=>{
    if(req.session.email){
        res.render('dashboard')
    } else{
        res.render('login')
    }
})

app.get('/report', (req,res)=>{
    if(req.session.email){
        res.render('report')
    } else{
        res.render('login')
    }
})

app.get('/settings', (req,res)=>{
    if(req.session.email){
        res.render('settings')
    } else{
        res.render('login')
    }
})

app.get('/help', (req,res)=>{
    if(req.session.email){
        res.render('help')
    } else{
        res.render('login')
    }
})

app.get('/about', (req,res)=>{
    res.render('about')
})

app.get('/knowing', (req,res)=>{
    res.render('knowing')
})

app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.listen(port, () => {
    console.log("Servidor Rodando")
})