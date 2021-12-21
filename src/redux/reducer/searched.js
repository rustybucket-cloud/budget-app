const searched = (state = false, action) => {
    switch (action.type) {
        case "SET_SEARCHED":
            return !state
        default:
            return state
    }
}
export default searched