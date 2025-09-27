import { Router } from "express";
import { getPosts,createPost,updatePost,deletePost ,getPostById,likePost,unlikePost} from "../controllers/posts.controller.js";

let router=Router()

router.get("/",getPosts)
router.post("/",createPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.get("/:id", getPostById)
router.post("/:id/like", likePost)
router.post("/:id/unlike", unlikePost)
export default router