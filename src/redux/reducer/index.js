import { combineReducers } from "redux"

import categories from "./categories"
import total from "./total"
import searched from "./searched"
import login from "./login"

const Reducers = combineReducers({
    categories, total, searched
})
export default Reducers