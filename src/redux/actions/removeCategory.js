const removeCategory = (x) => {
    return {
        type: "REMOVE_CATEGORY",
        payload: x
    }
}

export default removeCategory