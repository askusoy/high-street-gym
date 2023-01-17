import { db_conn } from "../database.js";

export function getAllUsers() {
    return db_conn.query("SELECT * FROM users")
}

export function getAllMembers () {
    return db_conn.query("SELECT * FROM users WHERE role = 'member'")
}

export function getAllTrainers () {
    return db_conn.query("SELECT * FROM users WHERE role = 'trainer'")
}

export function getUserByID(user_id) {
    return db_conn.query("SELECT * FROM users WHERE user_id = ?", [user_id])
}

// // TO-DO: getUserByLoginID... make login id row in table
// export function getUserByLoginID(login_id) {
//     return db_conn.query("SELECT * FROM users WHERE login_id = ?", [
//         login_id,
//     ]);
// }

export function createUser(firstname, lastname, email, phone, username, password, role, health_conditions) {
    return db_conn.query (
        "INSERT INTO users (firstname, lastname, email, phone, username, password, role, health_conditions)" + 
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [firstname, lastname, email, phone, username, password, role,health_conditions]
    )
}

export function updateUserByID(user_id, firstname, lastname, email, phone, username, password, role, health_conditions) {
    return db_conn.query(
        "UPDATE users " +
        "SET firstname = ?, lastname = ?, email = ?, phone = ?, username = ?, password = ?, role = ?, health_conditions = ? " +
        "WHERE user_id = ?",
        [firstname, lastname, email, phone, username, password, role, health_conditions, user_id]
    )
}

export function getUserByUsername(username) {
    return db_conn.query("SELECT * FROM users WHERE username = ?", [username])
}

export function deleteUserByID(user_id) {
    return db_conn.query("DELETE FROM users WHERE user_id = ?", [user_id])
}

export function getTrainerByID(user_id) {
    return db_conn.query("SELECT * FROM users WHERE login_id = ? AND role = 'trainer'", [
        user_id,
    ]);
}