import express from "express";
import fs from "fs";
import ejs from "ejs";
import { getActivityBookingWithDetails } from "../models/activity_bookings.js"
import { getAllBlogposts } from "../models/blogposts.js";
// import { getPortsByID } from "../models/ports.js";
// import { getAllBookingsByCruiseID } from "../models/bookings.js";
// import { getCustomerByID } from "../models/customers.js";

const exportController = express.Router();

// // CHANGE THIS TO FIT HIGH STREET GYM, NEST AN ARRAY WITHIN AN ARRAY

exportController.get("/activities-list", async (req, res) => {
    // Build list of cruise objects from relational data
    const [activities] = await getActivityBookingWithDetails();
    // ??? = activities
    // NOT SURE IF I SHOULD NEST SINCE I ALREADY INNERJOINED THINGS IN MODELS??
//     for (const activity of activities) {
//         // Query ports and inject into cruise object
//         const [[to_port]] = await getPortsByID(cruise.to_port_id);
//         const [[from_port]] = await getPortsByID(cruise.from_port_id);
//         cruise["to_port"] = to_port;
//         cruise["from_port"] = from_port;

//         // Query bookings and inject to cruise object
//         const [bookings] = await getAllBookingsByCruiseID(cruise.cruise_id);
//         for (const booking of bookings) {
//             const [[customer]] = await getCustomerByID(booking.customer_id);
//             booking["customer"] = customer;
//         }
//         cruise["bookings"] = bookings;
//     }

//     // Generate XML document using template
    const xml = ejs.render(
        fs.readFileSync("./src/backend/xml/activity_booking.xml.ejs").toString(),
        {
            activities: activities,
        }
    );

//     // Send XML as download
    res.status(200)
        .header(
            "Content-Disposition",
            'attachment; filename="activity_booking.xml"'
        )
        .header("Content-Type", "application/xml")
        .send(xml);
});


// ***BLOGPOST XML***
exportController.get("/blogposts-list", async (req, res) => {

    const [blogposts] = await getAllBlogposts();
    for (const blogpost of blogposts) {
        blogpost["blogpost"] = blogpost
    }


    const xml = ejs.render(
        fs.readFileSync("./src/backend/xml/blogposts.xml.ejs").toString(),
        {
            blogposts: blogposts,
        }
    );

    res.status(200)
        .header(
            "Content-Disposition",
            'attachment; filename="blogposts.xml"'
        )
        .header("Content-Type", "application/xml")
        .send(xml);
});


export default exportController;
