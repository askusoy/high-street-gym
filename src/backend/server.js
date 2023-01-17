import express, { response } from "express";
import session from "express-session";

// Create an express app and define listing port for later
const app = express();
const port = 8080;

// Enable ejs view engine (used to render XML documents)
app.set("view engine", "ejs");
app.set("view", "/src/backend/xml");

// Enable support for JSON and URL-encoded request bodies
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Enable session
app.use(session ({
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    cookie: { secret: false } // Should be true in once deployed online under HTTPS.
}))

// TODO: Hook up controllers
import usersController from "./controllers/users.js";
app.use("/users", usersController)
import activitiesController from "./controllers/activities.js";
app.use("/activities", activitiesController)
import blogpostsController from "./controllers/blogposts.js";
app.use("/blogposts", blogpostsController)
import activityBookingsController from "./controllers/activity_bookings.js";
app.use("/activity_bookings", activityBookingsController)
import memberActivityBookingsController from "./controllers/member_activity_bookings.js";
app.use("/member_activity_bookings", memberActivityBookingsController)
import exportController from "./controllers/export.js";
app.use("/export", exportController)


app.listen(port, () => {
    console.log(`Express server started on http://localhost:${port}`);
});