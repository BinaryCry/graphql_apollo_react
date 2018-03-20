import gql from 'graphql-tag';

const Posts = gql
`query Posts {
    posts {
        _id
        title
        content
        comments {
            _id
            postId
            content
        }
    }
}`;

export default Posts; 