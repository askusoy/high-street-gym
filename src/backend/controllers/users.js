import { getAllUsers, createUser, getAllMembers, getAllTrainers, getUserByID, deleteUserByID, getUserByUsername, updateUserByID, getTrainerByID } from "../models/users.js";
import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import access_control from "../../access_control.js"

const usersController = express.Router()

usersController.get("/all", (request, response) => {
    getAllUsers()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

usersController.get("/members", (request, response) => {
    getAllMembers()
        .then(([results]) => {
            response.status(200).json(results)
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

usersController.get("/trainers", (request, response) => {
    getAllTrainers()
        .then(([results]) => {
            response.status(200).json({
                status: 200,
                trainer_details: results
            })
        })
        .catch(error => {
            response.status(500).json(error)
        })
})

usersController.get("/status", (request, response) => {
    if (request.session.user != null) {
        response.status(200).json({
            role: request.session.user.role,
            user_id: request.session.user.user_id,
            firstname: request.session.user.firstname
        })
    } else {
        response.status(200).json({
            role: "unauthorised"
        })
    }
})

usersController.get("/:user_id", (request, response) => {
    let user_id = request.params.user_id

    getUserByID(user_id)
        .then(([results]) => {
            if (results.length > 0) {
                response.status(200).json(results[0])
            } else {
                response.status(404).json("user not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("failed to get user")
        })
})

usersController.post("/create",
// access_control(["trainer", "manager"]),
(request, response) => {
    let user = request.body
    if (!validator.isAlpha(user.firstname)) {
        response.status(400).json("Invalid first name")
        return
    }

    if (!validator.isAlpha(user.lastname)) {
        response.status(400).json("Invalid last name")
        return
    }

    if (!validator.isEmail(user.email)) {
        response.status(400).json("Invalid e-mail")
        return
    }
    
    if (!validator.isAlphanumeric(user.phone)) {
        response.status(400).json("Invalid phone")
        return
    }

    if (!validator.isAlphanumeric(user.username)) {
        response.status(400).json("Invalid user name (letters and numbers only)")
        return
    }

    // if(!(user.role == "admin" || user.role == "employee")) {
    //     response.status(400).json("Invalid role")
    //     return
    // }

    if (!validator.isAlpha(user.health_conditions)) {
        response.status(400).json("Invalid health conditions")
        return
    }
 

    let encrypted_password = bcrypt.hashSync(user.password, 6)

    createUser(
        validator.escape(user.firstname), 
        validator.escape(user.lastname), 
        validator.escape(user.email), 
        validator.escape(user.phone), 
        validator.escape(user.username), 
        encrypted_password,
        "member", 
        validator.escape(user.health_conditions),
        )
        .then(([results]) => {
            response.status(200).json("user created with id " + results.insertId)
        })
        .catch(error => {
            response.status(500).json("failed to create user")
            console.log(error)
        })
})

usersController.post("/create_by_manager", 
access_control(["manager"]),
(request, response) => {
    let user = request.body

    // Validation

    // If the user's firstname is not just letters we
    // should send back an error and stop the request
    if (!validator.isAlpha(user.firstname)) {
        response.status(400).json("Invalid first name")
        return
    }

    if (!validator.isAlpha(user.lastname)) {
        response.status(400).json("Invalid last name")
        return
    }

    if (!validator.isEmail(user.email)) {
        response.status(400).json("Invalid e-mail")
        return
    }
    
    if (!validator.isAlphanumeric(user.phone)) {
        response.status(400).json("Invalid phone")
        return
    }

    if (!validator.isAlphanumeric(user.username)) {
        response.status(400).json("Invalid user name (letters and numbers only)")
        return
    }

    if(!(user.role == "manager" || user.role == "trainer" || user.role == "member")) {
        response.status(400).json("Invalid role")
        return
    }

    if (!validator.isAlpha(user.health_conditions)) {
        response.status(400).json("Invalid health conditions")
        return
    }
 

    let encrypted_password = bcrypt.hashSync(user.password, 6)

    createUser(
        validator.escape(user.firstname), 
        validator.escape(user.lastname), 
        validator.escape(user.email), 
        validator.escape(user.phone), 
        validator.escape(user.username), 
        encrypted_password,
        validator.escape(user.role), 
        validator.escape(user.health_conditions),
        )
        .then(([results]) => {
            response.status(200).json("user created with id " + results.insertId)
        })
        .catch(error => {
            response.status(500).json("failed to create user")
            console.log(error)
        })
})


usersController.post("/update", 
access_control(["trainer", "manager"]),
(request,response) => {
    let user = request.body

    // Validation for the UPDATE function
    if (!validator.isAlpha(user.firstname)) {
        response.status(400).json("Invalid first name")
        return
    }

    if (!validator.isAlpha(user.lastname)) {
        response.status(400).json("Invalid last name")
        return
    }

    if (!validator.isEmail(user.email)) {
        response.status(400).json("Invalid e-mail")
        return
    }
    
    if (!validator.isAlphanumeric(user.phone)) {
        response.status(400).json("Invalid phone")
        return
    }

    if (!validator.isAlphanumeric(user.username)) {
        response.status(400).json("Invalid user name (letters and numbers only)")
        return
    }

    // if the password is not encrypted, encrypt it
    let encrypted_password = user.password
    if (!user.password.startsWith("$")) {
        encrypted_password = bcrypt.hashSync(user.password, 6)
    }

    if(!(user.role == "manager" || user.role == "member" || user.role == "trainer")) {
        response.status(400).json("Invalid role")
        return
    }

    if (!validator.isAlpha(user.health_conditions)) {
        response.status(400).json("Invalid health conditions")
        return
    }
 

    updateUserByID(
        validator.escape(user.user_id),
        validator.escape(user.firstname), 
        validator.escape(user.lastname), 
        validator.escape(user.email), 
        validator.escape(user.phone), 
        validator.escape(user.username), 
        encrypted_password,
        validator.escape(user.role), 
        validator.escape(user.health_conditions),
    )
    .then(([results]) => {
        if (results.affectedRows > 0) {
            response.status(200).json("user updated")
        } else {
            response.status(404).json("user not found")
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).json("failed to update user")
    })
        
})

usersController.post("/delete", 
access_control(["trainer", "manager"]),
(request, response) => {
    let user_id = request.body.user_id

    deleteUserByID(user_id)
        .then(([results]) => {
            if (results.affectedRows > 0) {
                response.status(200).json("user deleted")
            } else {
                response.status(404).json("user not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("failed to delete user")
        })
})

// login
usersController.post("/login", (request, response) => {
    // { username: "", password: ""}
    let login_details = request.body
    // Look up the user by username provided in login_details
    getUserByUsername(login_details.username)
        .then(([results]) => {
            if (results.length > 0) {
                let user = results[0]
                if (bcrypt.compareSync(login_details.password, user.password)) {
                    request.session.user = {
                        user_id: user.user_id,
                        role: user.role,
                    }
                    response.status(200).json({
                        status: 200,
                        user_id: user.user_id,
                        user_role: user.role
                    })
                } else {
                    response.status(400).json("login unsuccessful")
                }
            } else {
                response.status(404).json ("user not found")
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).json("login error")
        })
})


// usersController.post("/login", async (req, res) => {
//     const { username: username = null, password: password = null} = req.body;
//     const [logins] = await getUserByUsername(username);

//     for (const login of logins) {
//         if (await bcrypt.compare(password, login.password)) {
//             req.session.login = {}

//             req.session.login.user_id = login.user_id;
//             req.session.login.role = login.role;

//             // const [[trainer]] = await getTrainerByID(users.user_id)
//             // if (trainer) {
//             //     req.session.login.user_id = users.user_id
//             // }

//             res.status(200).json({
//                 status: 200,
//                 message: "Login successful",
//                 user_id: login.user_id,
//                 role: login.role
//             });
//             return;
//         }
//     }
//     }
// )

usersController.post("/logout", (request, response) => {
    request.session.destroy()
    response.status(200).json("Logged out successfully")
})

export default usersController