const jwt= require('jsonwebtoken')
const mongoose= require('mongoose')
const User= require('../../src/models/user')
const Task= require('../../src/models/task')

const userOneId= new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name:'Amanda Camacho',
    email:'ajmandi94@gmail.com',
    password:'ajcr109$',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}


const userTwoId= new mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name:'Vernoca Camacho',
    email:'vero@exaple.com',
    password:'vt14cr99$',
    tokens:[{
        token: jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description:'Task one',
    completed:false,
    owner:userOne._id
}

const taskTwo= {
    _id: new mongoose.Types.ObjectId(),
    description:'Task two',
    completed:false,
    owner:userOne._id
}

const taskThree= {
    _id: new mongoose.Types.ObjectId(),
    description:'Task three',
    completed:false,
    owner:userTwo._id
}


const setupDatabase= async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()

}



module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}