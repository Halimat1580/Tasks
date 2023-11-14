//Require mongoose
//From mongoose we bwould use a method called scheme,this defines the structure of the document that we will store in the collection.Model is used to wrap the Scheme and then sends into the db

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
     name:{
        type:String,
        require:true
     },
     title:{
        type:String,
        required:true
     },
     tasks:{
        type:String,
        required:true
     }
},{timestamps:true})

//lets ctreate our model(model is what surrounds the schema and provides us with an interfere by the which to communicate with our database)
const Tasks = mongoose.model('Task',taskSchema);
module.exports = Tasks