// STILL NEED TO DO MODELS ETC!!! WORK IN PROGRESS... GETUSERBYLOGINID

import express from "express";
import bcrypt from "bcryptjs";
import { getLoginByUsername } from "../models/logins.js"; // to-do??
import { getUserByID, getUserByLoginID, getTrainerByID } from "../models/users.js";
import { getStaffByLoginID } from "../models/staff.js"; //may not need this

const loginController = express.Router();

// GET /identity
// This end points returns the id and details
// of the currently logged in user as observed by backend
// This endpoint is used to keep the frontend and backend in sync
loginController.get("/identity", async (req,res) => {
    let body = {
        status: 200,
        logged_in: false,
        user: null,
        staff: null,
    }

    if (req.session.login) {
        // Update the logged in status
        body.logged_in = true

        // add customer object to body if there's a customer_id
        // in the session object.
        if (req.session.login.user_id) {
            // this loads up the customer row that matches
            // session.login.customer_id from the db
            let [[user]] = await getUserByID(
                req.session.login.user_id
            );
            // Put the customer row data into the body object
            body.user = user;
        }

        // Add staff object to body if there's a staff_id
        // in the session object.
        if (req.session.login.staff_id) {
            let [[staff]] = await getTrainerByID(req.session.login.staff_id);
            body.staff = staff;
        }
    }
    res.status(200).json(body);
});

// POST /login
// Attempt to login a user by username and password
loginController.post("/login", async (req,res) => {
    // Destructures the request body into username and password variables
    const {username: username = null, password: password = null} = req.body;

    // Query matching logins by username and store the list of
    // matching logins into the logins variable
    const [logins] = await getLoginByUsername(username)

    // Check each of the matching logins if the passwrd also matches
    for (const users of logins) {
        if (await bcrypt.compare(password, users.password)) {
            // if the program reaches this point, the username
            // and password match the current login row from the db

            // create a new login object in the session
            req.session.login = {};

            // add the login ID to the session
            req.session.login.user_id = users.user_id;

            // next check if this login is linked to a customer or staff member
            // and add related customer/staff member details to the session

            // look up the customer row
            const [[user]] = await getUserByLoginID(users.user_id);
            if (user) {
                req.session.login.user_id = user.user_id;
            }

            // look up the staff row ... EITHER CHANGE THIS OR MAKE A STAFF TABLE
            const [[staff]] = await getTrainerByID(users.user_id);
            if (staff) {
                req.session.login.user_id = users.user_id;
            }

            // Login process is finished
            res.status(200).json({
                status: 200,
                message: "Login successful"
            })

            // Loop stops here otherwise it will keep trying to login
            // users with matching usernames
            return;
        }
    }

    res.status(404).json({
        status: 404,
        message: "Invalid login details",
    })
});

// POST /logout
// Clear backend session state and logout the user
loginController.post("/logout", (req,res) => {
    req.session.destroy();
    res.status(200).json({
        status: 200,
        message: "Logout successful",
    })
})

export default loginController;
