const express = require("express")
const app = express()

const path = require("path")

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Listening on port ${PORT}`))
app.use('/static', express.static(path.join(__dirname, '../build//static')));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});

const example = {
  "categories": [
    {
        "name": "Rent",
        "total": 850,
        "available": 850,
        "expenses": [
          {"type": "debit", "date": "11/05/21", "expense": "Rent", "amount": 850},
          {"type": "credit", "date": "10/28/21", "expense": "Paycheck", "amount": 425},
          {"type": "credit", "date": "10/12/21", "expense": "Paycheck", "amount": 425},
          {"type": "debit", "date": "10/05/21", "expense": "Rent", "amount": 850},
          {"type": "credit", "date": "9/28/21", "expense": "Paycheck", "amount": 425},
          {"type": "credit", "date": "9/12/21", "expense": "Paycheck", "amount": 425},
        ]
    },
    {
        "name": "Food",
        "total": 300,
        "available": 250,
        "expenses": [
          {"type": "debit","date": "11/20/21", "expense": "Little Caesers", "amount": 20},
          {"type": "debit","date": "11/19/21", "expense": "Little Caesers", "amount": 20},
          {"type": "debit","date": "11/18/21", "expense": "Little Caesers", "amount": 20},
          {"type": "debit","date": "11/17/21", "expense": "Little Caesers", "amount": 20},
          {"type": "debit","date": "11/16/21", "expense": "Little Caesers", "amount": 20},
          {"type": "credit", "date": "10/28/21", "expense": "Paycheck", "amount": 150},
          {"type": "credit", "date": "10/12/21", "expense": "Paycheck", "amount": 150}
        ]
    },
    {
        "name": "Transportation",
        "total": 150,
        "available": 50,
        "expenses": [
          {"type": "debit","date": "11/15/21", "expense": "Bus", "amount": 2.50},
          {"type": "debit","date": "11/10/21", "expense": "Train", "amount": 2.50},
          {"type": "credit", "date": "10/28/21", "expense": "Paycheck", "amount": 75},
          {"type": "credit", "date": "10/12/21", "expense": "Paycheck", "amount": 75}
        ]
    }
  ]
}
app.post('/categories', (req, res) => {
  res.send(example)
})

app.post('/categoryexpenses', (req, res) => {
  const category = req.body.category

  // find the category
  const selectedCategory = example.categories.find(cat => {
    return cat.name === category
  })

  res.send(selectedCategory)
})