const request = require('supertest')
const app = require('../src/app')
const User= require('../src/models/user')
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Singup a new user', async()=>{ 
    const response=await  request(app).post('/users').send({
        name:'Amanda Camacho',
        email:'averotravels@gmail.com',
        password:'ajcr109$'
    }).expect(201)

    // Assertions that the db was changed correctly
    const user= await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            name:'Amanda Camacho',
            email:'averotravels@gmail.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('ajcr109$')
})

test('Login existing user', async()=>{
    const response=await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    // Assertions that the db was changed correctly
    const user= await User.findById(userOneId) 
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Login nor existing user',async  ()=>{
    await request(app)
        .post('/users/login')
        .send({
            email:userOne.email,
            password:'239eidsndsk!!'
    }).expect(400)
})

test('Get profile for user', async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Get profile for unauthentication user', async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('Delete account for authenticate user',async()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Delete account for unauthenticate user',async()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Upload avatar image', async()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('Update  valid user fields', async ()=>{
    const response= await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'Amandi'
        })
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Amandi')
    
})


test('Update  invalid user fields', async ()=>{
    const response= await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            lastname:'Amandi'
        })
        .expect(400)
    
    
})