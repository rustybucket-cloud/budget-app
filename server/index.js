const data = require("./data.json")
const profiles = require("./profile.json")

const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3000

const dataFunctions = require("./data.js")

let loggedIn = "pattonja";

app.listen(PORT, console.log(`Listening on port ${PORT}`))
app.use('/static', express.static(path.join(__dirname, '../build//static')));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});

app.post('/categories', (req, res) => {
  res.send(data[loggedIn])
})

app.get('/viewcategories/:id', async (req, res) => {
  const id = req.params.id
  let categories
  try {
    categories = await dataFunctions.viewCategoryies(id)
  } catch(err) {
    console.error(err)
  } finally {
    res.send(categories)
  }
})

app.post('/addcategory', async (req,res) => {
  const id = req.body.id
  const categoryName = req.body.categoryName
  const total = req.body.total

  let categoryData
  try {
    categoryData = await dataFunctions.addCategory(id, categoryName, total)
  } catch(err) {
    console.error(err)
    res.send('error')
    return
  } finally {
    res.status(200).send(categoryData)
  }
})

app.put('/updatecategory', async (req, res) => {
  const category_id = req.body.category_id
  const updated_column = req.body.updated_column
  const new_column_value = req.body.new_column_value

  console.log(category_id, updated_column, new_column_value)

  let updateData
  try {
    updateData = await dataFunctions.updateCategory(category_id, updated_column, new_column_value)
  } catch (err) {
    console.error(err)
    res.send(err)
    return
  } finally {
    res.send(updateData)
  }
})

app.post('/addexpense', async (req, res) => {
  const user_id = req.body.user_id
  const category_id = req.body.category_id
  const date = req.body.date
  const expense_name = req.body.expense_name
  const amount = req.body.amount

  let expenseData
  try {
    expenseData = await dataFunctions.addExpense(user_id, category_id, date, expense_name, amount)
  } catch(err) {
    console.error(err)
    res.send('error')
    return
  } finally {
    res.status(200).send(expenseData)
  }
})

app.get('/viewexpenses/:categoryid', async (req, res) => {
  const category_id = req.params.categoryid

  let expenses
  try {
    expenses = await dataFunctions.viewExpenses(category_id)
  } catch(err) {
    res.send('error')
    return
  } finally {
    res.send(expenses)
  }
})

app.put('/updateexpense', async (req, res) => {
  const expense_id = req.body.expense_id
  const updated_column = req.body.updated_column
  const new_column_value = req.body.new_column_value

  let updateData
  try {
    updateData = await dataFunctions.updateExpense(expense_id, updated_column, new_column_value)
  } catch (err) {
    console.error(err)
    res.send(err)
    return
  } finally {
    res.send(updateData)
  }
})

app.post('/categoryexpenses', (req, res) => {
  const category = req.body.category

  // find the category
  const selectedCategory = example.categories.find(cat => {
    return cat.name === category
  })

  res.send(selectedCategory)
})


// for login attempts
app.post("/login", async (req, res) => {
  // user attempt
  const username = req.body.username
  const password = req.body.password

  // checks if submitted username exists then checks if submitted password matches
  let userLogin
  try {
    userLogin = await dataFunctions.login(username, password)
  } catch (err) {
    console.error(err)
    res.send({error: "Error logging in"})
  } finally {
    if (typeof userLogin !== "object") {
      res.send({error: "Error logging in"})
      return
    }
    if (userLogin.error) {
      if (userLogin.error === "User not found") res.send({error: "User not found"})
      else if (userLogin.error === "Incorrect password") res.send({error: "Incorrect password"})
      else res.send({error: "Error logging in"})
    }
    res.send(userLogin)
  }
})

app.post("/signup", async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  let userLogin
  try {
    userLogin = await dataFunctions.addUser(email, password)
  } catch (err) {
    console.error(err)
  } finally {
    res.send(userLogin)
  }
})