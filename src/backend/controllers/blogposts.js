import express, { response } from "express";
import validator from "validator";
import { createBlogpost, getAllBlogposts, getBlogpostById, updateBlogpostById, deleteBlogpostById } from "../models/blogposts.js";

const blogpostsController = express.Router()

blogpostsController.post("/create", (req,res) => {
    let blogpost = req.body
    if (!validator.isAlphanumeric(blogpost.content, "en-AU", {ignore: " ./-"})) {
        res.status(400).json("Invalid content detected")
        return
    }
    if (!validator.isAlphanumeric(blogpost.member_user_id, "en-AU", {ignore: " ./-"})) {
        res.status(400).json("Invalid member id")
        return
    }
    // if (!validator.isAlphanumeric(blogpost.posttime, "en-AU", {ignore: " ./-"})) {
    //     response.status(400).json("Invalid post time")
    //     return
    // } may not need because this is just time indicator?
    if (!validator.isAlpha(blogpost.category, "en-AU", {ignore: " ./-"})) {
        res.status(400).json("Invalid category")
        return
    }
    createBlogpost(
        validator.escape(blogpost.content), 
        validator.escape(blogpost.member_user_id), 
        validator.escape(blogpost.category), 
        )
        .then(([results]) => {
            res.status(200).json("Post created successfully! Post id -> " + results.insertId)
        })
        .catch(error => {
            res.status(500).json("Failed to create post")
            console.log(error)
        })
})

blogpostsController.get("/all", (request, response) => {
    getAllBlogposts()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

blogpostsController.get("/:blogpost_id", (req,res) => {
    let blogpost_id = req.params.blogpost_id

    getBlogpostById(blogpost_id)
    .then(([results]) => {
        if (results.length > 0) {
            res.status(200).json(results[0])
        } else {
            res.status(404).json("Post not found")
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).json("Failed to get post")
    })
})

blogpostsController.post("/update", (req,res) => {
    let blogpost = req.body
    if (!validator.isAlphanumeric(blogpost.content, "en-AU", {ignore: " ./-"})) {
        res.status(400).json("Invalid content detected")
        return
    }
    if (!validator.isAlphanumeric(blogpost.member_user_id, "en-AU", {ignore: " ./-"})) {
        res.status(400).json("Invalid member id")
        return
    }
    // if (!validator.isAlphanumeric(blogpost.posttime, "en-AU", {ignore: " ./-"})) {
    //     res.status(400).json("Invalid post time")
    //     return
    // }
    if (!validator.isAlphanumeric(blogpost.category, "en-AU", {ignore: " ./-"})) {
        res.status(400).json("Invalid category")
        return
    }
    updateBlogpostById(
        validator.escape(blogpost.blogpost_id), 
        validator.escape(blogpost.content), 
        validator.escape(blogpost.member_user_id),
        // validator.escape(blogpost.posttime),  
        validator.escape(blogpost.category), 
        )
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Post updated")
            } else {
                response.status(404).json("Post not found")
            }
        })
        .catch(error => {
            response.status(500).json("Failed to update post")
            console.log(error)
        })
})

blogpostsController.post("/delete",
    
    (req,res) => {
    let blogpost_id = req.body.blogpost_id

    deleteBlogpostById(blogpost_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                res.status(200).json("Post deleted")
            } else {
                res.status(404).json("Post not found")
            }
        })
        .catch(([error])=> {
            res.status(500).json("Failed to delete post")
        })
})

export default blogpostsController