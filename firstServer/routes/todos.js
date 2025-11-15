const express = require('express');
const Todo = require("../models/todo");
const {sendError, sendSuccess } = require("../utils/response");

const router = express.Router();




router.get('/',async(req,res)=>{
    try{
        const { completed , sort, limit = 10, page=1} = req.query;
        const filter = {};
        if(completed !== undefined) filter.completed = completed=== "true";
    
        const todos = await Todo.find(filter)
        .sort(sort ? {title:sort === "asc" ? 1 : -1}:{})
        .limit(Number(limit))
        .skip((Number(page) - 1)*Number(limit));

        return sendSuccess(res,{
            page : Number(page),
            limit: Number(limit),
            data:todos}
        );
    }
    catch(err){
        return sendError(res,"Server Error",500);
    }
    
});


// const todo = Todo.find(t=>t.id === parseInt(req.params.id));
router.get('/:id',async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id);
        if(!todo) return sendError(res,"Todo not found",404);
        return sendSuccess(res,todo);
    }
    catch(err){
        console.log(err);
        return sendError(res,"Server Error",500);
    }
   
});


router.get('/stats',async (req,res) =>{
    try{
        const total= await Todo.countDocuments();
        const completed = await Todo.countDocuments({completed:true});
        const pending = total - completed;
        return sendSuccess(res,{total,completed,pending});
    }
    catch(err){
        return sendError(res,"Server Error",500);
    }
})

router.post('/',async(req,res)=>{
    // const newTodo ={
    //     id: data.length + 1,
    //     title: req.body.title || `Task ${data.length+1}`,
    //     completed : !!req.body.completed,
    // };
    try{
        const todo = new Todo(req.body);
        await todo.save();
        return sendSuccess(res,todo);
    }
    catch(err){
        console.log(err);
        return sendError(res,"Server Error",500);
    }
  
});


router.put('/:id',async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id);
    if(!todo){
        console.log('Error, file not found');
        return sendError(res,"Not found",404);
    }

    todo.title=req.body.title ?? todo.title;
    todo.completed=req.body.completed ?? todo.completed;

    await todo.save();
    return sendSuccess(res,todo);
    }
    catch(err){
        return sendError(res,"Server Error",500);
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if(!deletedTodo) return sendError(res,"Not found",404);
        return sendSuccess(res,deletedTodo);
    }
    catch(err){
        console.log(err);
        return sendError(res,"Server Error",500);
    }
   
})

module.exports = router;