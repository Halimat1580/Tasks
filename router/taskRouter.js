const express = require('express');
const { create_task , delete_task , route_task} = require('../controller/taskController');
const router = express.Router();
const Tasks = require('../model/taskModel')


// post route C -- create
router.post('/create',create_task);


//route params for single page
router.get('/route/:id',route_task)


//delete route D -- delete
router.get('/delete/:id', delete_task)

module.exports = router;