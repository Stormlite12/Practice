const request = require("supertest");
const express = require("express");
const {connect , closeDatabase, clearDatabase} = require("../tests/setup.test");
const todosRouter = require("../routes/todos");
const Todo = require("../models/todo");

const app = express();
app.use(express.json());
app.use('/todos',todosRouter);

beforeAll(async()=> await connect());
afterEach(async()=> await clearDatabase());
afterAll(async()=> await closeDatabase());



describe("Todos API",()=>{
    it("Should create a new Todo",async()=>{
        const res = await request(app).
        post("/todos").
        send({title : "Write tests", completed: false});
    
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Write tests");

    });

    it("Should get all todos",async()=>{
        
        await Todo.create({title :"Tast A", completed: true});

        const res = await request(app).
        get("/todos");

        console.log("res.body:", JSON.stringify(res.body, null, 2));


        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
     
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(1);
    });


    it("should get a single todo by id", async()=>{
        const todo = await Todo.create({title : "Task A", completed: true});
        const res = await request(app).get(`/todos/${todo._id}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toBe(todo._id.toString());
    });

    it("should update a todo",async()=>{
        const todo = await  Todo.create({title :"Task A",completed : true});
        const res =  await request(app).put(`/todos/${todo._id}`).send({title:"Task B"});

        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe("Task B");
    });

    it("Should delete a todo",async()=>{
        const todo = await Todo.create({title :"Task A",completed : true});
        const res = await request(app).delete(`/todos/${todo._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const deleted = await request(app).get(`/todos/${todo._id}`);
        expect(deleted.statusCode).toBe(404);
    });

})