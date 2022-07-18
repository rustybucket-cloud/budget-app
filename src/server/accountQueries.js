import { gql } from '@apollo/client'

const login = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user_id
            email
        }
    }
`

const signUp = gql`
    mutation SignUp($email: String!, $password: String!) {
        addUser(email: $email, password: $password) {
            user_id
            email
        }
    }
`

export default {
    login,
    signUp
}