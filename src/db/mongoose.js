const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})


// const me= new User({
//     name:'    Amanda ',
//     email:'  AMANDA@GMAIL.COM',
//     password: '123456987'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })



// const newTask = new Task({
// })

// newTask.save().then(()=>{
//     console.log(newTask)
// }).catch((error)=>{
//     console.log(error)
// })