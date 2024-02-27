const users=[]

const addUser=({id,username,room})=>{

    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()


    if(!username || ! room){
        return{
            error:"Username and room are required"
        }
    }

    const existingUser=users.find((user)=>{
        return user.room===room && user.username===username
    })
    

    if(existingUser){
        return{
            error:"Username in use"
        }
    }

    const user={id,username,room}
    users.push(user)
    return {user}

}

const removeUser=(id)=>{
    const index=users.findIndex((user)=>user.id===id)

    if(index!=-1){
       return users.splice(index,1)[0]
    }
}



const getUser=(id)=>{
const user=users.find((user)=>{
    return user.id===id
})

if(user){
    return user
}else{
    return undefined
}
}


const getUsersInRoom=(room)=>{
    const userInRoom=users.filter((user)=>{
        return user.room===room
    })
    
    if(userInRoom){
        return userInRoom
    }else{
        return undefined
    }
    }






module.exports={getUser,getUsersInRoom,removeUser,addUser}
