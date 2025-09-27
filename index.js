import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"

import UsersRouter from "./src/routes/users.routes.js"
import PostsRouter from "./src/routes/posts.routes.js"
import CommentsRouter from "./src/routes/comments.router.js"

dotenv.config()

let app=express()


let PORT=process.env.PORT || 4500

app.use(express.json())
app.use(morgan("dev"))

app.use("/users",UsersRouter)
app.use("/posts",PostsRouter)
app.use("/comments", CommentsRouter)

app.get("/",(req,res)=>{
    res.json({message:`API yaxshi ishlamoqda`})
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})