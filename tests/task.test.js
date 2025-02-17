const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')

const { userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Create a task for user', async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'Test task'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})


test('Get task from user', async()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})


test(' Delete task segurity', async()=>{
    await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})