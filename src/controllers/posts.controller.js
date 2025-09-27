import db from "../helpers/db.js"
import { slugify } from "../helpers/slugify.js"

let FILE="posts.json"

export async function getPosts(req,res) {
    let {term,page,limit}=req.query
    page=Number(page)
    limit=Number(limit)

    let posts=await db.read(FILE)

    if(term){
        term=term.toLowerCase()
        posts=posts.filter(
            (p)=>p.title.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.content.toLowerCase().includes(term))
    }

    let startIndex=(page-1)*limit
    let endIndex=page*limit

    let paginated=posts.slice(startIndex,endIndex)
    res.json({
        total:posts.length,
        page,
        limit,
        data:paginated
    })
    
}

export async function createPost(req, res) {
  const { title, content, category, summary, status = "draft" } = req.body

  if (!title || !content || !category || !summary) {
    return res.status(400).json({ message: "Barcha maydonlar shart" })
  }

  let posts = await db.read(FILE)
  const slug = slugify(title)

  if (posts.find((p) => p.slug === slug)) {
    return res.status(400).json({ message: "Slug allaqachon mavjud" })
  }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    category,
    summary,
    slug,
    status,
    views: 0,
    likes: 0,
  }

  posts.push(newPost)
  await db.write(FILE, posts)

  res.status(201).json(newPost)
}

export async function updatePost(req, res) {
  const { id } = req.params
  const { title, content, category, summary, status } = req.body

  let posts = await db.read(FILE)
  const index = posts.findIndex((p) => p.id === +id)

  if (index === -1) return res.status(404).json({ message: "Post topilmadi" })

  let slug = posts[index].slug
  if (title) {
    slug = slugify(title)
    if (posts.some((p) => p.slug === slug && p.id !== +id)) {
      return res.status(400).json({ message: "Slug band" })
    }
  }

  posts[index] = {
    ...posts[index],
    title,
    content,
    category,
    summary,
    status,
    slug,
  };

  await db.write(FILE, posts)

  res.json(posts[index])
}


export async function deletePost(req, res) {
  const { id } = req.params
  let posts = await db.read(FILE)
  const filtered = posts.filter((p) => p.id !== +id)

  if (posts.length === filtered.length) {
    return res.status(404).json({ message: "Post topilmadi" })
  }

  await db.write(FILE, filtered)
  res.json({ message: "Post o'chirildi" })
}

