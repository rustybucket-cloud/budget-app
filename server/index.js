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
        "available": 850
    },
    {
        "name": "Food",
        "total": 300,
        "available": 250,
        "expenses": [
          {"date": "11/20/21", "expense": "Little Caesers", "amount": 20},
          {"date": "11/19/21", "expense": "Little Caesers", "amount": 20},
          {"date": "11/18/21", "expense": "Little Caesers", "amount": 20},
          {"date": "11/17/21", "expense": "Little Caesers", "amount": 20},
          {"date": "11/16/21", "expense": "Little Caesers", "amount": 20}
        ]
    },
    {
        "name": "Transportation",
        "total": 150,
        "available": 50
    }
  ]
}
app.post('/categories', (req, res) => {
  console.log("hello")
  res.send(example)
})

app.post('/categoryexpenses', (req, res) => {
  const category = req.body.category

  // find the category
  const selectedCategory = example.categories.find(cat => {
    return cat.name === category
  })
  console.log(selectedCategory)

  res.send(selectedCategory)
})