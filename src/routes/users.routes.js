import { Router } from "express";
import { getUsers,createUser,updateUser,deleteUser,getUserById, } from "../controllers/users.controller.js";

let router=Router()

router.get("/",getUsers)
router.post("/",createUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
router.get("/:id", getUserById)

export default router
