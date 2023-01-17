import { db_conn } from "../database.js"

export function getAllMemberBookings() {
   return db_conn.query ("SELECT * FROM member_activity_bookings")
}

export function createMemberBookings(member_user_id, activity_bookings_id) {
    return db_conn.query (
        "INSERT INTO member_activity_bookings (member_user_id, activity_bookings_id)" + 
        "VALUES (?, ?)", [member_user_id, activity_bookings_id]
    )
}

export function getMemberBookingsById(member_activity_bookings_id) {
    return db_conn.query ("SELECT * FROM member_activity_bookings WHERE member_activity_bookings_id = ?", [member_activity_bookings_id])
}

export function getMemberBookingsWithDetails () {
    return db_conn.query(`
    SELECT *
    FROM high_street.member_activity_bookings
    INNER JOIN high_street.activity_bookings
    ON high_street.member_activity_bookings.activity_bookings_id = high_street.activity_bookings.activity_bookings_id
    INNER JOIN high_street.users
    ON high_street.member_activity_bookings.member_user_id = high_street.users.user_id
    `)
}

export function getMemberBookingsWithDetailsById (member_activity_bookings_id) {
    return db_conn.query(`
    SELECT *
    FROM high_street.member_activity_bookings
    INNER JOIN high_street.activity_bookings
    ON high_street.member_activity_bookings.activity_bookings_id = high_street.activity_bookings.activity_bookings_id
    INNER JOIN high_street.users
    ON high_street.member_activity_bookings.member_user_id = high_street.users.user_id
    WHERE member_activity_bookings_id = ?
    `, [member_activity_bookings_id])
} // can sort by: member_user_id = ? OR trainer_user_id = ? (member view, trainer view)

export function getMemberBookingsUserView (member_user_id) {
    return db_conn.query(`
    SELECT * FROM high_street.member_activity_bookings
    INNER JOIN high_street.activity_bookings
    ON high_street.member_activity_bookings.activity_bookings_id = high_street.activity_bookings.activity_bookings_id
    INNER JOIN high_street.activities
    ON high_street.activity_bookings.activity_id = high_street.activities.activity_id
    WHERE member_user_id = ?
    `, [member_user_id])
} // joined activity_bookings AND activities together

export function deleteMemberBookingsById(member_activity_bookings_id) {
    return db_conn.query ("DELETE FROM member_activity_bookings WHERE member_activity_bookings_id = ?", [member_activity_bookings_id])
}