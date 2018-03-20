import { buildSchema } from 'graphql';

const Schema = buildSchema(`
    type Query {
        user(id: ID): User
        users: [User]
    }

    type User {
        id: ID
        name: String
        age: Int
        job: String
    }
`);

export default Schema;