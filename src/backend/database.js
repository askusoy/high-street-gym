import mysql from "mysql2/promise";

export const db_conn = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "mobile_hour_user",
    password: "mobile_hour",
    database: "high_street",
})