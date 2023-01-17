import { db_conn } from "../database.js"

export function createActivity (name, duration_minutes, level) {
    return db_conn.query(
        "INSERT INTO activities (name, duration_minutes, level)" +
        "VALUES (?, ?, ?)",
        [name, duration_minutes, level]
    )
}

export function getAllActivities () {
    return db_conn.query ("SELECT * FROM activities")
}

export function getActivityById (activity_id) {
    return db_conn.query ("SELECT * FROM activities WHERE activity_id = ?", [activity_id])
}

export function getActivityBySearch (search_term) {
    return db_conn.query("SELECT * FROM activities WHERE name LIKE ? " +
    "OR duration_minutes LIKE ? " +
    "OR level LIKE ?", [search_term, search_term, search_term])
}

export function updateActivityById (activity_id, name, duration_minutes, level) {
    return db_conn.query(
        "UPDATE activities " +
        "SET name = ?, duration_minutes = ?, level = ?" +
        "WHERE activity_id = ?",
        [name, duration_minutes, level, activity_id]
    )
}

export function deleteActivityById (activity_id) {
    return db_conn.query("DELETE FROM activities WHERE activity_id = ?", [activity_id])
}