import graphqlHTTP from 'express-graphql';
import express from 'express';
import Schema from './schema';
import cors from 'cors';

const PORT = 5002;

const createUser = (id, name, age, job) => ({
    id,
    name,
    age,
    job
});

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
        name: 'Lucy',
        age: '21',
        job: 'Secretary',
        collegues: [2]
    }
];

const root = {
    user: (query) => findUserById(Users, query.id)
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