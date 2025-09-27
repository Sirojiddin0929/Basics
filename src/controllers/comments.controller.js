import db from "../helpers/db.js"
let FILE = "comments.json"

export async function getComments(req, res) {
  let { postId } = req.params
  let comments = await db.read(FILE)
  let filtered = comments.filter(c => c.postId === +postId)
  res.json(filtered)
}

export async function createComment(req, res) {
  const { postId } = req.params
  const { name, content } = req.body

  if (!name || !content) return res.status(400).json({ message: "Name va content shart" })

  let comments = await db.read(FILE)
  let newComment = {
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    postId: +postId,
    name,
    content,
    createdAt: new Date().toISOString()
  }

  comments.push(newComment)
  await db.write(FILE, comments)
  res.status(201).json(newComment)
}

export async function deleteComment(req, res) {
  const { id } = req.params
  const comments = await db.read(FILE)
  const filtered = comments.filter(c => c.id !== +id)

  if (filtered.length === comments.length) return res.status(404).json({ message: "Comment topilmadi" })

  await db.write(FILE, filtered);
  res.json({ message: "Comment o'chirildi" })
}
