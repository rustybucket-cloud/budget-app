const cateogires = (state = [], action) => {
    switch(action.type) {
        case "ADD_CATEGORY":
            return [...state, action.payload]
        case "REMOVE_ARRAY":
            return state.filter(element => element !== action.payload)
        case "RESET_CATEGORIES":
            return []
        case "ADD_EXPENSE":
            let thisState = state.map( category => {
                if (category.name === action.payload.category) {
                    // add expense to category expense array
                    category.expenses.push({type: action.payload.type, date: action.payload.date, expense: action.payload.expense, amount: action.payload.amount})
                    // sort expenses by date
                    category.expenses.sort((date1, date2) => new Date(date2.date) - new Date(date1.date))
                }
                return category
            })
            return thisState
        default:
            return state
    }
}

export default cateogires