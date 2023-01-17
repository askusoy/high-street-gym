import { db_conn } from "../database.js"
// TODO!!!

// JOIN, logic behind is similar to create product, but JOIN 2 TABLES???

export function getAllActivityBookings() {
    return db_conn.query("SELECT * FROM activity_bookings")
}

export function getActivityBookingById (activity_bookings_id) {
    return db_conn.query ("SELECT * FROM activity_bookings WHERE activity_bookings_id = ?", [activity_bookings_id])
}

export function createActivityBooking(activity_id, booking_date, trainer_user_id, room_number) {
    return db_conn.query(
            "INSERT INTO activity_bookings (activity_id, booking_date, trainer_user_id, room_number) VALUES (?, ?, ?, ?)",
            [activity_id, booking_date, trainer_user_id, room_number] 
    )
}


// the following joins activities for activity details AND users for trainer name
export function getActivityBookingWithDetails () {
    return db_conn.query(`
    SELECT *
    FROM high_street.activity_bookings
    INNER JOIN high_street.activities
    ON high_street.activity_bookings.activity_id = high_street.activities.activity_id
    INNER JOIN high_street.users
    ON high_street.activity_bookings.trainer_user_id = high_street.users.user_id;
    `)
}

//TO-DO: integrate this to DELETE ACTIVITY BOOKINGS page and BOOKING CONFIRMATION page
export function getActivityBookingWithDetailsById (activity_bookings_id) {
    return db_conn.query(`
    SELECT *
    FROM high_street.activity_bookings
    INNER JOIN high_street.activities
    ON high_street.activity_bookings.activity_id = high_street.activities.activity_id
    INNER JOIN high_street.users
    ON high_street.activity_bookings.trainer_user_id = high_street.users.user_id
    WHERE activity_bookings_id = ?
    `, [activity_bookings_id])
}

export function updateActivityBookingById(activity_bookings_id, activity_id, booking_date, trainer_user_id, room_number) {
    return db_conn.query(
        "UPDATE activity_bookings " +
        "SET activity_id = ?, booking_date = ?, trainer_user_id = ?, room_number = ?  " +
        "WHERE activity_bookings_id = ?",
        [activity_id, booking_date, trainer_user_id, room_number, activity_bookings_id]
    )
}

export function deleteActivityBookingById(activity_bookings_id) {
    return db_conn.query("DELETE FROM activity_bookings WHERE activity_bookings_id = ?", [activity_bookings_id])
}