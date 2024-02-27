const jwt=require('jsonwebtoken');
const mongoose=require('mongoose')
const User=require('../../src/db/models/userSchema')
const Task=require('../../src/db/models/tasksSchema')




const userOneId=new mongoose.Types.ObjectId()
const userOne={
        _id:userOneId,
        name:"test",
        password:'12345678',
        email:"test2@gmail.com",
        age:20,
        tokens:[{
            token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
        }]
}


const userTwoId=new mongoose.Types.ObjectId()
const userTwo={
        _id:userTwoId,
        name:"Jess",
        password:'12345678',
        email:"Jess2@gmail.com",
        age:27,
        tokens:[{
            token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
        }]
}


const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:"First task",
    owner:userOne._id
}

const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:"Second task",
    completed:true,
    owner:userOne._id
}

const taskThree={
    _id:new mongoose.Types.ObjectId(),
    description:"Third task",
    completed:true,
    owner:userTwo._id
}

const setupDatabase=async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}


module.exports={userOne,userOneId,userTwo,userTwoId,taskOne,taskTwo,taskThree,setupDatabase}