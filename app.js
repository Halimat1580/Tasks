const express = require('express')
const app = express();
const PORT = 8082;
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')


const mongoDBUrl = process.env.DBURL
// custom middlewares
app.set('view engine', 'ejs')
app.use((req,res,next)=>{
    console.log('new request made');
    console.log('host:', req.hostname);
    console.log('path:',req.path);
    console.log('method:',req.method);
    next()
})

app.use(morgan('dev'))
app.use(express.static('public'))

//routes
// app.get('/',(req,res)=>{
//     res.send('welcome home')
// }
// )

const task = [
    {name:"Halimat", title:'halimats clothing', tasks:'client deliveries this morning'},
    {name:"Chimelu", title:'I.T experience', tasks:'To give my instructor my log book'},
    {name:"Steve", title:'New House Alert', tasks:'Show client a new house'},
]

app.get('/',(req,res)=>{
    res.render('index',{title:'Home || page',task})

}
)



app .get('/about',(req,res)=>{
    res.render('about',{title:'About || page'})
})

app .get('/task',(req,res)=>{
    res.render('task',{title:'Task || Page'})
})

app .use((req,res)=>{
    res.render('404',{title:'Error || page'})
})
 
//db connection
mongoose.connect(mongoDBUrl)
.then(() => console.log('Connected!'));

app.listen(PORT,()=>{
    console.log(`server connected to http://localhost:${PORT}`);
}
)