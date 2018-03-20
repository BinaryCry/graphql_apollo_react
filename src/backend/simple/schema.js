import { buildSchema } from 'graphql';

const Schema = buildSchema(`
    type Query {
        user(id: Int): User
        users: [User]
    }

    type User {
        id: Int
        name: String
        age: Int
        job: String
    }
`);

export default Schema;