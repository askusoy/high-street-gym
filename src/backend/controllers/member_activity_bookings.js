import express from "express";
import validator from "validator";
import { getAllMemberBookings, 
    createMemberBookings, 
    getMemberBookingsWithDetails, 
    getMemberBookingsById, 
    getMemberBookingsWithDetailsById, 
    getMemberBookingsUserView,
    deleteMemberBookingsById } from "../models/member_activity_bookings.js";
import access_control from "../../access_control.js"

const memberActivityBookingsController = express.Router()

memberActivityBookingsController.get("/all", (request, response) => {
    getAllMemberBookings()
        .then(([results]) => {
            response.status(200).json(
                {
                    status: 200,
                    member_bookings: results
                }
            )
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

memberActivityBookingsController.get("/all_with_details", (request, response) => {
    getMemberBookingsWithDetails()
        .then(([results]) => {
            response.status(200).json({
                    status: 200,
                    member_bookings: results
            })
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

memberActivityBookingsController.get("/:member_activity_bookings_id", (req,res) => {
    let member_activity_bookings_id = req.params.member_activity_bookings_id
        getMemberBookingsById(member_activity_bookings_id)
        .then(([results]) => {
            if (results.length > 0) {
                res.status(200).json({
                    status: 200,
                    member_bookings: results[0]
                })
            } else {
                res.status(404).json("Member booking not found")
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json("Failed to get member booking detail")
        })
})

memberActivityBookingsController.get("/with_details/:member_activity_bookings_id", (req,res) => {
    let member_activity_bookings_id = req.params.member_activity_bookings_id
        getMemberBookingsWithDetailsById(member_activity_bookings_id)
        .then(([results]) => {
            if (results.length > 0) {
                res.status(200).json({
                    status: 200,
                    member_bookings: results[0]
                })
            } else {
                res.status(404).json("Member booking not found")
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json("Failed to get member booking detail")
        })
})

memberActivityBookingsController.get("/user_view/:member_user_id", (req,res) => {
    let member_user_id = req.params.member_user_id // change to: request.session.user.user_id
        getMemberBookingsUserView(member_user_id)
        .then(([results]) => {
            if (results.length > 0) {
                res.status(200).json({
                    status: 200,
                    member_bookings: results //sort by date??
                })
            } else {
                res.status(404).json("Cannot find your booking details")
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json("Failure: either not logged on, or not a member")
        })
})


memberActivityBookingsController.post("/create",
// access_control(["trainer", "manager"]),
(req,response) => {
    let member_activity_bookings = req.body
    if (!validator.isAlphanumeric(member_activity_bookings.member_user_id, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid content detected")
        return
    }
    if (!validator.isAlphanumeric(member_activity_bookings.activity_bookings_id, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid content detected")
        return
    }

    createMemberBookings(
        validator.escape(member_activity_bookings.member_user_id),
        validator.escape(member_activity_bookings.activity_bookings_id)
    )
    .then(([results]) => {
        response.status(200).json("New member booking create with id: " + results.insertId)
    })
    .catch(error => {
        response.status(500).json("Failed to create member booking")
        console.log(error)
    })
})

memberActivityBookingsController.post("/delete", 
// access_control(["trainer", "manager"]),
(request, response) => {
    let member_activity_bookings_id = request.body.member_activity_bookings_id

    deleteMemberBookingsById(member_activity_bookings_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Member activity booking deleted")
            } else {
                response.status(404).json("Member activity booking not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("Failed to delete member activity booking")
        })
})

export default memberActivityBookingsController