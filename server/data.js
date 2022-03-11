const sqlite3 = require("sqlite3")
const db = new sqlite3.Database('./data.db')
const bcrypt = require("bcrypt")
const saltRounds = 10

/* 
    Users
    id PRIMARY KEY NOT NULL     email TEXT NOT NULL     password TEXT NOT NULL  
    
    Categories
    id PRIMARY KEY NOT NULL     user_id INT NOT NULL     category_name TEXT NOT NULL      total FLOAT       remaining FLOAT
    
    Expenses     
    id PRIMARY KEY NOT NULL     user_id INT NOT NULL    category_id INT NOT NULL     expense_name TEXT NOT NULL       amount FLOAT NOT NULL
*/
module.exports = {
    addUser: async (email, password) => { // add to database
        db.run("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email UNIQUE NOT NULL, password NOT NULL)", (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

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
                        function(err, result) {
                            if (err) reject(err)
                            resolve({id: this.lastID, email})
                        })
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
    addCategory: (user, category, total) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT NOT NULL, category_name TEXT NOT NULL, total FLOAT, remaining FLOAT)", (err) => {
                    if (err) reject(err)
                })
                db.run("INSERT INTO Categories (user_id, category_name, total, remaining) VALUES ($user_id, $category_name, $total, $total)", {$user_id:user, $category_name: category, $total: total },
                    function(err, result) {
                        if (err) reject(err)
                        else resolve({user_id: user, category_id: this.lastID, category_name: category})
                    }
                )
            })
        })
    },

    // display all of a users budget categories
    viewCategoryies: (user) => {
        return new Promise((response, reject) => {
            db.all(`
            SELECT *
            FROM Categories
            WHERE user_id=$user_id`, { $user_id: user },
            (err, row) => {
                if (err) reject(err)
                else response(row)
            }
            )
        })
    },

    updateCategory: (category_id, updated_column, new_column_value) => {
        return new Promise((resolve, reject) => {
            db.run(`
                UPDATE Categories
                SET ${updated_column} = $new_column_value
                WHERE id=$category_id`, {
                    $category_id: category_id,
                    $new_column_value: new_column_value
                }, 
                function(err, results) {
                    if (err) reject(err)
                    else resolve({result: "success"})
                }
            )
        })
    },

    // adds expense to selected category of selected user
    addExpense: (user, category, date, expense, amount) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("CREATE TABLE IF NOT EXISTS Expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT NOT NULL, category_id INT NOT NULL, date DATE, expense_name TEXT NOT NULL, amount FLOAT)", (err) => {
                    if (err) reject(err)
                })
                db.run(`
                    INSERT INTO EXPENSES 
                    (user_id, category_id, date, expense_name, amount)
                    VALUES ($user_id, $category_id, $date, $expense_name, $amount)
                    `, {
                        $user_id: user,
                        $category_id: category,
                        $date: date,
                        $expense_name: expense,
                        $amount: amount
                    },
                    function(err, result) {
                        if (err) reject(err)
                        else resolve({expense_id: this.lastID, category_id: category, expense_name: expense})
                    }
                )
            })
        })
    },

    // view expenses of selected category
    viewExpenses: (category_id) => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT * 
                FROM Expenses
                WHERE category_id=$category_id
                `, {
                    $category_id: category_id
                },
                (err, rows) => {
                    if (err) reject(err)
                    else resolve(rows)
                }
            )
        })
    },

    updateExpense: (expense_id, updated_column, new_column_value) => {
        return new Promise((resolve, reject) => {
            db.run(`
                UPDATE Expenses
                SET ${updated_column} = $new_column_value
                WHERE id=$expense_id`, {
                    $expense_id: expense_id,
                    $new_column_value: new_column_value
                }, 
                function(err, results) {
                    if (err) reject(err)
                    else resolve({result: "success"})
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