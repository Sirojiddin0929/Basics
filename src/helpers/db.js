import {promises as fs} from "fs"
import path from "path"

let dbPath=path.resolve("src","db")

async function read(file) {
    let filePath=path.join(dbPath,file)
    try{
        let data= await fs.readFile(filePath,"utf-8")
        return JSON.parse(data || "[]")
    }catch(err){
        await fs.writeFile(filePath,"[]")
        return []
    }
    
}

async function write(file,data){
    let filePath=path.join(dbPath,file)
    await fs.writeFile(filePath,JSON.stringify(data,null,2))
}

export default {read,write}