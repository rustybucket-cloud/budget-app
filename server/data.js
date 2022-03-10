const sqlite3 = require("sqlite3")
const db = new sqlite3.Database('./data.db')
const bcrypt = require("bcrypt")
const saltRounds = 10

/* 
    Users
    id PRIMARY KEY NOT NULL     email TEXT NOT NULL     password TEXT NOT NULL  
    
    Categories_[user id]
    id PRIMARY KEY NOT NULL     category TEXT NOT NULL      total FLOAT       remaining FLOAT
    
    Expenses_[category name]_[user id]      
    id PRIMARY KEY NOT NULL     expense TEXT NOT NULL       amount FLOAT NOT NULL
*/
module.exports = {
    addUser: async (email, password) => { // add to database
        // generate a hashed password
        const saltRounds = 10
        const hashPassword = () => {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) reject(err)
                    bcrypt.hash(password, salt, (err, hashGenerated) => {
                        if (err) reject(err)
                        else {
                            resolve(hashGenerated)
                        }
                    })
                })
            }) 
        }

        // check if user already exists in database
        const checkIfUserExists = () => {
            return new Promise((resolveUserExists, rejectUserExists) => {
                db.get(`SELECT email FROM Users WHERE email='${email}'`, 
                    (err, row) => {
                        if (err) rejectUserExists(err)
                        if (row) resolveUserExists(true) // user exists
                        else resolveUserExists(false) // user does not exists
                    }
                )
            })
        }

        // create new user in database
        const createUser = (email, password) => {
            return new Promise((resolve, reject) => {
                db.serialize(() => {
                    // insert user into users table
                    db.run("INSERT INTO Users (email, password) VALUES ($email, $password)", 
                        {
                            $email: email,
                            $password: password
                        },
                        err => {
                            if (err) reject(err)
                        }
                    )
                    // get user id
                    db.get("SELECT id, email FROM Users WHERE email=$email", { $email:email }, 
                        (err, row) => {
                            if (err) reject(err)
                            // create user expenses table
                            db.run(`CREATE TABLE Categories_${row.id} (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, total FLOAT, remaining FLOAT)`,
                                (err) => {
                                    if (err) reject(err)
                                    else resolve(row)
                                }
                            )
                        }
                    )
                })
            })
        }

        const hash = await hashPassword()
        const userExists = await checkIfUserExists()
        let userCreated
        return await createUser(email, hash)
    },

    // checks if user input is correct and returns user data
    login: (email, password) => {
        return new Promise((resolve, reject)=> {
            db.get("SELECT * FROM Users WHERE email=$email", { $email: email },
                async (err, row) => {
                    if (err) {
                        reject(err)
                    }
                    if (!row) {
                        resolve({error: "User not found"})
                    }
                    else {
                        const match = await bcrypt.compare(password, row.password)
                        if (match) resolve({id: row.id, email: row.email})
                        else resolve({error: "Incorrect password"})
                    }
                }
            )
        })
    },

    // adds category to user category table
    addExpenseCategory: (user, category, total) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`INSERT INTO Categories_${user} (category, total, remaining) VALUES ($category, $total, $total)`, { $category: category, $total: total },
                    (err) => {
                        if (err) reject(err)
                        else console.log(`Expense category ${category} added.`)
                    }
                )
                db.run(`CREATE TABLE Category_${user}_${category} 
                (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, date DATE NOT NULL, expense TEXT NOT NULL, amount FLOAT NOT NULL)`, 
                    (err) => {
                        if (err) reject(err)
                        else resolve(`${category} category table created for ${user}`)
                    }
                )
            })
        })
    },

    // display all of a users budget categories
    viewCategoryies: (user) => {
        return new Promise((response, reject) => {
            db.all(`SELECT category, total, remaining FROM Categories_${user}` ,
                (err, row) => {
                    if (err) reject(err)
                    else response(row)
                }
            )
        })
    },

    // adds expense to selected category of selected user
    addExpense: (user, category, expense, amount) => {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO Category_${user}_${category} (expense, amount)
            VALUES ('${expense}', ${parseFloat(amount)})`,
                (err) => {
                    if (err) {
                        if (err.erno === 1) reject(400)
                        else reject(500)
                    }
                    else resolve(`Expense added to ${category}.`)
                }
            )
        })
    },

    // view expenses of selected category
    viewExpenses: (user, category) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM Category_${user}_${category}`, 
                (err, rows) => {
                    if (err) reject(err)
                    else {
                        resolve(rows)
                    }
                }
            )
        })
    },

    // gets user id
    getUserId: (user) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT id FROM Users WHERE email=$email", { $email: user }, 
                async (err, row) => {
                    if (err) {
                        reject(err)
                    }
                    if (row) resolve(row.id)
                    else resolve("User not found.")
                }
            )
        })
    },

    viewAllUsers: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT id, email FROM USERS", 
                (err, rows) => {
                    if (err) reject(err)
                    else resolve(rows)
                }
            )
        })
    }
}
// create user with email and password


// test data functions
async function runData() {
    db.run("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email UNIQUE NOT NULL, password NOT NULL)", (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
    process.stdin.on('data', async (input) => {
        const trimmed = input.toString().trim().split(" ", 5)
        const action = trimmed[0]
        const email = trimmed[1]
        const userId = await getUserId(email)

        try {
        switch (action) {
            case "create":
                const passwordToCreate = trimmed[2]
                const userCreated = await addUser(email, passwordToCreate)
                console.log(userCreated)
                break;
            case "login":
                const passwordToLogin = trimmed[2]
                const userLoggedIn = await login(email, passwordToLogin)
                console.log(userLoggedIn)
                break;
            case "addCategory":
                const category = trimmed[2]
                const amount = trimmed[3]
                const categoryAdded = await addExpenseCategory(userId, category, amount)
                console.log(categoryAdded)
                break;
            case "addExpense":
                const categoryOfExpense = trimmed[2]
                const expenseName = trimmed[3]
                const expenseAmount = trimmed[4]
                const expenseAdded = await addExpense(userId, categoryOfExpense, expenseName, expenseAmount)
                console.log(expenseAdded)
                break;
            case "viewCategories":
                const categories = await viewCategoryies(userId)
                console.log(categories)
                break;
            case "viewExpenses":
                const categoryOfExpenses = trimmed[2]
                const expenses = await viewExpenses(userId, categoryOfExpenses)
                console.log(expenses)
                break
            case "viewAllUsers":
                const allUsers = await viewAllUsers()
                console.log(allUsers)
                break
    }
    } catch (err) {
        console.error(err)
    }
    })
}
runData()