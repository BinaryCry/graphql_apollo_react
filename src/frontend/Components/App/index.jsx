import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { List, ListItem } from 'material-ui/List';
import Posts from '../../Queries/posts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css';

class App extends Component {
    render() {
        const { data } = this.props;
        const { refetch } = data;
        return data.posts ?
            <MuiThemeProvider>
                <div className={style.postsWrapper}>
                    <List>
                        {
                            data.posts.map(post => (
                                <ListItem key={post._id} leftIcon={<ActionGrade />}>
                                    <div className={style.postHeader}>{post.title}</div>
                                    <div className={style.postContent}>{post.content}</div>
                                </ListItem>
                            ))
                        }
                    </List>
                    <RaisedButton onClick={() => refetch()} label="Fetch" secondary={true} />
                </div>
            </MuiThemeProvider>
        : null
    }
}

export default graphql(Posts)(App);