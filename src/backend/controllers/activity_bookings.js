import express from "express";
import validator from "validator";
import { getAllActivityBookings, getActivityBookingWithDetailsById, createActivityBooking, getActivityBookingById, getActivityBookingWithDetails, updateActivityBookingById, deleteActivityBookingById } from "../models/activity_bookings.js";
import access_control from "../../access_control.js"

const activityBookingsController = express.Router()

activityBookingsController.get("/all", (request, response) => {
    getAllActivityBookings()
        .then(([results]) => {
            response.status(200).json(
                {
                    status: 200,
                    bookings: results
                }
            )
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

activityBookingsController.post("/create",
access_control(["trainer", "manager"]),
(req,response) => {
    let activity_bookings = req.body
    if (!validator.isAlphanumeric(activity_bookings.activity_id, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid content detected")
        return
    }
    // if (!validator.isNumeric(activity_booking.booking_date, "en-AU", {ignore: " ./-"})) {
    //     response.status(400).json("Invalid duration length")
    //     return
    // }
    if (!validator.isAlphanumeric(activity_bookings.trainer_user_id, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid level")
        return
    }
    if (!validator.isAlphanumeric(activity_bookings.room_number, "en-AU", {ignore: " ./-"})) {
        response.status(400).json("Invalid room number")
        return
    }
    createActivityBooking(
        validator.escape(activity_bookings.activity_id),
        validator.escape(activity_bookings.booking_date),
        validator.escape(activity_bookings.trainer_user_id),
        validator.escape(activity_bookings.room_number),
    )
    .then(([results]) => {
        response.status(200).json("New class booking created with the following id: " + results.insertId)
    })
    .catch(error => {
        response.status(500).json("Failed to book activity")
        console.log(error)
    })
})

activityBookingsController.get("/all_with_details", (request, response) => {
    getActivityBookingWithDetails()
        .then(([results]) => {
            response.status(200).json({
                    status: 200,
                    bookings: results
            })
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

activityBookingsController.get("/:activity_bookings_id", (req,response) => {
    let activity_bookings_id = req.params.activity_bookings_id

    getActivityBookingById(activity_bookings_id)
    .then(([results]) => {
        if (results.length > 0) {
            response.status(200).json({
                status: 200,
                bookings: results[0]
            })
        } else {
            response.status(404).json("Activity booking not found")
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).json("Failed to get activity booking")
    })
})

activityBookingsController.get("/with_details/:activity_bookings_id", (req,response) => {
    let activity_bookings_id = req.params.activity_bookings_id

    getActivityBookingWithDetailsById(activity_bookings_id)
    .then(([results]) => {
        if (results.length > 0) {
            response.status(200).json({
                status: 200,
                bookings: results[0]
            })
        } else {
            response.status(404).json("Activity booking not found")
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).json("Failed to get activity booking")
    })
})


activityBookingsController.patch("/update", access_control(["trainer", "manager"]), (request, response) => {
    let activity_bookings = request.body
    // if (!validator.isAlphanumeric(order.order_date)) {
    //     response.status(400).json("Invalid order date")
    //     return
    //     }

        updateActivityBookingById(
            activity_bookings.activity_bookings_id,
            activity_bookings.activity_id,
            activity_bookings.booking_date,
            activity_bookings.trainer_user_id,
            activity_bookings.room_number

        // VALIDATORS COMMENTED OUT BECAUSE IT DOESN'T WORK WITH JSON.STRINGIFY
        // validator.escape(activity_bookings.activity_bookings_id),
        // validator.escape(activity_bookings.activity_id),
        // validator.escape(activity_bookings.booking_date),
        // validator.escape(activity_bookings.trainer_user_id),
        // validator.escape(activity_bookings.room_number),
        )
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json({
                    message: "Activity booking updated",
                    status: 200})
            } else {
                response.status(404).json("Activity booking not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("failed to update activity booking")
        })
})

activityBookingsController.post("/delete", access_control(["trainer", "manager"]), (request, response) => {
    let activity_bookings_id = request.body.activity_bookings_id

    deleteActivityBookingById(activity_bookings_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("Activity booking deleted")
            } else {
                response.status(404).json("Activity booking not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("Failed to delete activity booking")
        })
})

export default activityBookingsController