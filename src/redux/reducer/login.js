const login = (state = false, action ) => {
    switch(action.type) {
        case "LOGIN":
            return true;
            break;
        case "LOGOUT":
            return false;
            break;
    }
}

export default login