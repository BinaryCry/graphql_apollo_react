import { MongoClient, ObjectId } from 'mongodb';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { URL, PORT, MONGO_URL, HOME_PATH } from './config';
import { convertIDtoString } from './service';
import typeDefs from './types';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const main = async () => {
    const db = await MongoClient.connect(MONGO_URL);
    const Posts = db.collection('posts');
    const Comments = db.collection('comments');

    const resolvers = {
        Query: {
            post: async (root, { _id }) => {
                return convertIDtoString(await Posts.findOne(ObjectId(_id)));
            },
            posts: async () => {
                return (await Posts.find({}).toArray()).map(convertIDtoString)
            },
            comment: async (root, { _id }) => {
                return convertIDtoString(await Comments.findOne(ObjectId(_id)));
            },
        },
        Post: {
            comments: async ({ _id }) => {
                return (await Comments.find({ postId: _id.toString() }).toArray()).map(convertIDtoString)
            }
        },
        Comment: {
            post: async ({ postId }) => {
                return convertIDtoString(await Posts.find(ObjectId(postId)))
            }
        },
        Mutation: {
            createPost: async (root, args, context, info) => {
                const res = await Posts.insert(args)
                return convertIDtoString(await Posts.findOne({ _id: res.insertedIds[0] }))
            },
            createComment: async (root, args) => {
                const res = await Comments.insert(args)
                return convertIDtoString(await Comments.findOne({ _id: res.insertedIds[0] }))
            },
        },
    };

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const app = express();

    app.use(cors());
    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
    app.use(HOME_PATH, graphiqlExpress({
        endpointURL: '/graphql'
    }))
    app.listen(PORT, () => {
        console.log(`\nUI running on ${URL}:${PORT}${HOME_PATH}`)
    })
};

export default main;