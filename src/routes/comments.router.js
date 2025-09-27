import { Router } from "express"
import {
  getComments,
  createComment,
  deleteComment
} from "../controllers/comments.controller.js"

const router = Router({ mergeParams: true })

router.get("/:postId", getComments)
router.post("/:postId", createComment)
router.delete("/:id", deleteComment)

export default router
