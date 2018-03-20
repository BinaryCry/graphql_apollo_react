const typeDefs = [`
type Query {
    user(id: Int): User
    users: [User]
}

type User {
    id: Int
    name: String
    age: Int
    job: String
    collegues: [User]
}
`];

export default typeDefs;