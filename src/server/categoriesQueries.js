import { gql } from "@apollo/client";

export default {
    userCategories: () => gql`
        query userCategories($userId: String!) {
            userCategories(userId: $userId) {
                total
                remaining
                categories {
                    category_id
                    name
                    total
                    remaining
                    expenses {
                        description
                        amount
                    }
                }
            }
        }
    `,
    addCategory: () => gql`
        mutation AddCategory($userId: String!, $name: String!, $total: Float!) {
            addCategory(userId: $userId, name: $name, total: $total) {
                name
            }
        }
    `,
}