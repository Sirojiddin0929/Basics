import db from "../helpers/db.js"

let FILE="users.json"

export async function getUsers(req,res) {
    let users=await db.read(FILE)
    res.json(users)
    
}

export async function createUser(req,res) {
    let {name,email}=req.body
    if(!name || !email){
        return res.status(400).json({message:"Name va email shart"})
    }

    let users= await db.read(FILE)
    if(users.find((user)=>user.email===email)){
        res.status(400).json({message:`email allaqachoon mavjud`})
    }

    let newUser={
        id:users.length>0 ? users[users.length-1].id+1 : 1,
        name,
        email
    }
    users.push(newUser)
    await  db.write(FILE,users)
    res.status(201).json(newUser)
    
}

export async function updateUser(req,res) {
    let {id}=req.params
    let {name,email}=req.body

    let users=await db.read(FILE)
    let index=users.find((user)=>user.id=== +id)

    if(index===-1){
        return res.status(404).json({message:`#${index} user topilmdi`})
    }
    
    if(email && users.some((user)=>user.email===email && user.id !==+id)){
        return res.status(404).json({message: "Email band"})
    }
    

    Object.assign()
    await db.write(FILE,users)

    res.json(users[index])
}

export async function deleteUser(req,res) {
    let {id}=req.params
    let users=await db.read(FILE)

    let filtered=users.filter((user)=>user.id !== +id)

    if(users.length===filtered.length){
        res.status(404).json({message: 'Foydalanuvchi topilmadi'})
    }

    await db.write(FILE,filtered)
    res.json({message: "User ochirildi"})
}