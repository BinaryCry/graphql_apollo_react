import { buildSchema } from 'graphql';

const Schema = buildSchema(`
    type Query {
        user(id: ID): User
    }

    type User {
        id: ID!
        name: String!
        age: Int
        job: String,
        collegues: [ID]
    }
`);

export default Schema;