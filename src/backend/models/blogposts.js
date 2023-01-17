import { db_conn } from "../database.js"

export function createBlogpost(content, member_user_id, category) {
    return db_conn.query (
        "INSERT INTO blogposts (content, member_user_id, posttime, category) VALUES (?, ?, ?, ?)",
        [content, member_user_id, new Date().toISOString().slice(0, 19).replace('T', ' '), category] 
    )
}

export function getAllBlogposts() {
    return db_conn.query("SELECT * FROM blogposts")
}

export function getBlogpostById (blogpost_id) {
    return db_conn.query("SELECT * FROM blogposts WHERE blogpost_id = ?", [blogpost_id])
}

export function updateBlogpostById (blogpost_id, content, member_user_id, posttime, category) {
    return db_conn.query(
        "UPDATE blogposts " +
        "SET content = ?, member_user_id = ?, posttime = ?, category = ? WHERE blogpost_id = ?"
        [content, member_user_id, posttime, category, blogpost_id]
        )
}

export function deleteBlogpostById(blogpost_id) {
    return db_conn.query("DELETE FROM blogposts WHERE blogpost_id = ?", [blogpost_id])
}