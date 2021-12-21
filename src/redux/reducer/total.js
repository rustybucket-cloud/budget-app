const total = (state = {total: 0, available: 0}, action) => {
    switch(action.type) {
        case "UPDATE_TOTAL":
            return {total: action.payload + state.total, available: state.available}
        case "UPDATE_AVAILABLE":
            return {...state, available: action.payload + state.available}
        default:
            return state
    }
}
export default total