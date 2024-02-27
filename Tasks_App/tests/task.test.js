const request=require('supertest')
const Task= require('../src/db/models/tasksSchema')
const app=require('../src/app')
const {userOne,userTwo,taskOne,taskTwo,taskThree,setupDatabase}=require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user',async ()=>{
    await request(app)
    .post('/tasks')
    .set('Authorization',userOne.tokens[0].token)
    .send({
        description:"From tests"
    })
    .expect(200)
})

test('One user deleting task of other user',async()=>{
    const response=await request(app)
    .delete(`/task/${taskThree._id}`)
    .set('Authorization',userOne.tokens[0].token)
    .expect(404)

    console.log(response.body);
})


test('Should show tasks of user',async ()=>{
    const response=await request(app)
    .get('/tasks')
    .set('Authorization',userOne.tokens[0].token)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})