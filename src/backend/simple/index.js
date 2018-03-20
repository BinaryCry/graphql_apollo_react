import graphqlHTTP from 'express-graphql';
import express from 'express';
import Schema from './schema';
import cors from 'cors';

const PORT = 5002;

const findUserById = (userlist, id) => userlist.find(user => user.id == id);

const Users = [
    {
        id: 1,
        name: 'John',
        age: '25',
        job: 'Manager'
    },
    {
        id: 2,
        name: 'Mikael',
        age: '37',
        job: 'CEO'
    },
    {
        id: 3,
        name: 'Lucy L',
        age: '21',
        job: 'Secretary'
    }
];

const root = {
    user: (query) => findUserById(Users, query.id),
    users: () => Users
};

const app = express();

app.use(cors());
app.all('/', (req, res) => res.redirect('/graphql'));
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`\nNow browse to localhost:${PORT}/graphql`));