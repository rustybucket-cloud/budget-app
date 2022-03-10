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

  try {
    await dataFunctions.addExpenseCategory(id, categoryName, total)
  } catch(err) {
    console.error(err)
    res.send('error')
    return
  } finally {
    res.status(200).send('category added')
  }
})

app.post('/addexpense', async (req, res) => {
  const id = req.body.id
  const category = req.body.category
  const date = req.body.data
  const expense = req.body.expense
  const amount = req.body.amount

  try {
    await dataFunctions.addExpense(id, category, expense, amount)
  } catch(err) {
    console.error(err)
    res.send('error')
    return
  } finally {
    res.status(200).send('expense added')
  }
})

app.get('/viewexpenses/:id/:category', async (req, res) => {
  const id = req.params.id
  const category = req.params.category

  let expenses
  try {
    expenses = await dataFunctions.viewExpenses(id, category)
  } catch(err) {
    res.send('error')
    return
  } finally {
    res.send(expenses)
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