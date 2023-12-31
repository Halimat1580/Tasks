const express = require('express')
const app = express();
const port =process.env.PORT || 6075;
const morgan = require('morgan')
const Tasks = require('./model/taskModel')
const mongoose = require('mongoose')
const connect = require('./db/mongoDB')
const taskRouter = require('./router/taskRouter')
require('dotenv/config')



// const mongoDBUrl = process.env.DBURL
// custom middlewares
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}));
// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path:',req.path);
//     console.log('method:',req.method);
//     next()
// })

//TESTING OUR MODEL AND DATABASE
// .save() method is a mongoose method for saving data to our database
app.get('/post-tasks',async(req,res)=>{
    const testData = new Tasks({
        name:'Murewa',
        title:'express Tuts',
        tasks:'we just ended using mongo DB'
    })
    try{
        const newTasks = await testData.save();
        res.status(201).send(newTasks)
    }catch(error){
        console.log(error);
    }
})


// .find() method is a mongoose method for getting all the data from our database


  
app.get('/get-posts',async(req,res)=>{
    try{
        const getTasks =await Tasks.find();
        res.status(200).send(getTasks)
    }catch(error){
        console.log(error);
    }
})
// .find() method is a mongoose method for finding a specific data from our database

app.get ('/single-task',async(req,res)=>{
    try{
        const singleTask = await Tasks.findById("65522eb2f93a654c37f504b4");
        res.status(200).send(singleTask)
    }catch(error){
        console.log(error);
    }
})


//END OF DATABASE TEST

app.use(morgan('dev'))
app.use(express.static('public'))

//routes
// app.get('/',(req,res)=>{
//     res.send('welcome home')
// }
// )

// const task = [
//     {name:"Halimat", title:'halimats clothing', tasks:'client deliveries this morning'},
//     {name:"Chimelu", title:'I.T experience', tasks:'To give my instructor my log book'},
//     {name:"Steve", title:'New House Alert', tasks:'Show client a new house'},
// ]



app.use('/api/v1',taskRouter)



//page routes
app.get('/',async(req,res)=>{
//     res.render('index',{title:'Home || page',task})

// }
// )

try{
    const result = await Tasks.find();
    res.render("index",{ title: "Home || Page", tasks:result
    })
} catch (error){
    console.log(error);
}
});




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
connect()
.then(()=>{
    try{app.listen(port,()=>{
        console.log(`server connected to http://localhost:${port}`);
    }
    )

    }catch(error){
        console.log('cannot connect to the server');
    }
})
.catch((error)=>{
    console.log('invalid database connection..!' ,error);
})

