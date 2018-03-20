import graphqlHTTP from 'express-graphql';
import express from 'express';
import typeDefs from './types';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools'

const PORT = 5002;

const findUserById = (userlist, id) => userlist.find(user => user.id == id);

const Users = [
    {
        id: 1,
        name: 'John',
        age: '25',
        job: 'Manager',
        collegues: [2]
    },
    {
        id: 2,
        name: 'Mikael',
        age: '37',
        job: 'CEO',
        collegues: [1, 3]
    },
    {
        id: 3,
        name: 'Lucy L',
        age: '21',
        job: 'Secretary',
        collegues: [2]
    }
];

const resolvers = {
    Query: {
        user: (root, query) => findUserById(Users, query.id),
        users: () => Users
    },
    User: {
        collegues: (query) => {
            const founded = findUserById(Users, query.id);
            return founded.collegues.map(collegueId =>
                findUserById(Users, collegueId));
        }
    }
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

app.use(cors());
app.all('/', (req, res) => res.redirect('/graphql'));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`\nNow browse to localhost:${PORT}/graphql`));