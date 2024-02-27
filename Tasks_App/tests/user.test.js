const app=require('../src/app')
const request=require('supertest')
const {userOne,setupDatabase}=require('./fixtures/db')
const User= require('../src/db/models/userSchema')

beforeEach(setupDatabase)

test('Should sign up a new user ',async ()=>{
    await request(app).post('/users')
    .send({
        name:"Nishant",
        password:'12345678',
        email:"asnaninishant2@gmail.com",
        age:20
    })
    .set('Accept','application/json')
    .expect(200)
})


test('Should Log in a user ',async ()=>{
    await request(app).post('/user/login')
    .send({
        password:userOne.password,
        email:userOne.email,
    })
    .expect(200)
})

test('Should not log in a user ',async ()=>{
    await request(app).post('/user/login')
    .send({
        password:'dfkshv',
        email:userOne.email,
    })
    .expect(400)
})


test('Should show details of a user ',async ()=>{
    await request(app).get('/user/me')
    .set('Authorization',userOne.tokens[0].token)
    .expect(200)
})

test('Should not show details of an unauthenticated user ',async ()=>{
    await request(app).get('/user/me')
    .expect(401)
})

test('Should  not delete details of a user ',async ()=>{
    await request(app).delete('/user/me')
    .expect(401)
})

test('Should Upload avatar image',async()=>{
    await request(app)
        .post('/user/me/avatar')
        .set('Authorization',userOne.tokens[0].token)
        .attach('avatar','tests/fixtures/image.jpg')
        .expect(201)
})

test('Should update user details',async()=>{
    await request(app)
        .patch('/user/me')
        .set('Authorization',userOne.tokens[0].token)
        .send({
            name:"Jess"
        })
        .expect(200)
        const user=await User.findById(userOne._id)
        expect(user.name).toEqual('Jess')
})