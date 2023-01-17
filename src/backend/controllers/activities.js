import express from "express";
import validator from "validator";
import { createActivity, getAllActivities, getActivityById, getActivityBySearch, updateActivityById, deleteActivityById } from "../models/activities.js";
import access_control from "../../access_control.js"

const activitiesController = express.Router()

activitiesController.post("/create", access_control(["trainer", "manager"]), (req,response) => {
    let activity = req.body
    if (!validator.isAlphanumeric(activity.name, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid content detected")
        return
    }
    if (!validator.isNumeric(activity.duration_minutes, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid duration length")
        return
    }
    if (!validator.isAlphanumeric(activity.level, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid level")
        return
    }

    createActivity(
        validator.escape(activity.name),
        validator.escape(activity.duration_minutes),
        validator.escape(activity.level),

    )
    .then(([results]) => {
        response.status(200).json("New class created with the following id: " + results.insertId)
    })
    .catch(error => {
        response.status(500).json("Failed to create activity")
        console.log(error)
    })
})

activitiesController.patch("/update", 
access_control(["trainer", "manager"]),
(req,response) => {
    let activity = req.body
    if (!validator.isAlphanumeric(activity.name, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid content detected")
        return
    }
    if (!validator.isNumeric(activity.duration_minutes, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid duration length")
        return
    }
    if (!validator.isAlphanumeric(activity.level, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid level")
        return
    }
    updateActivityById(
        validator.escape(activity.activity_id),
        validator.escape(activity.name),
        validator.escape(activity.duration_minutes),
        validator.escape(activity.level)
    )
    .then(([results]) => {
        if (results.affectedRows > 0) {
            response.status(200).json({
                message: "Activity updated",
                status: 200})
        } else {
            response.status(404).json("Activity not found")
        }
    })
    .catch(error => {
        response.status(500).json("Failed to update activity")
        console.log(error)
    })
})

activitiesController.get("/all", (request, response) => {
    getAllActivities()
        .then(([results]) => {
            response.status(200).json({
                status: 200,
                activities: results
            })
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

activitiesController.get("/:activity_id", (req,response) => {
    // let activity_id = req.params.activity_id
    if (req.params.activity_id) {
        getActivityById(req.params.activity_id)
        .then(([results]) => {

            // if (results.length > 0) {
            //     const first_activity = results[0]
            //     res.status(200).json({
            //         status: 200,
            //         activity: first_activity
            //     })

            if (results.length > 0) {
                response.status(200).json({
                    status: 200,
                    activity: results[0]
                })

            } else {
                response.status(404).json("Activity not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("Failed to get activity")
        })
    } else {
    response.status(400).json({
        status: 400,
        message: "Missing activity ID from request"
        })
    }
})

activitiesController.get("/search/:search_term", (request, response) => {
    getActivityBySearch(request.params.search_term)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results)
            } else {
                response.status(404).json("No results found")
            }
        })
        .catch(error => {
            // console.log("Failed to search activity" + error)
            response.status(500).json("Failed to search activity")
        })
})


activitiesController.post("/delete/",
access_control(["trainer", "manager"]),
(req,res) => {
    let activities_id = req.body.activity_id

    deleteActivityById(activities_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                res.status(200).json("Activity deleted")
            } else {
                res.status(404).json("Activity not found")
            }
        })
        .catch(([error])=> {
            res.status(500).json("Failed to delete activity")
        })
})

export default activitiesController
