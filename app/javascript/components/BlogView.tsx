import React from 'react';
import {withRouter} from 'react-router-dom';
import {WithRouterProps} from '../utils/types';

interface BlogViewState {
    blog?: {title: string, body: string, created_at: string}
}

class BlogView extends React.Component<WithRouterProps, BlogViewState> {
    constructor(props) {
        super(props);
       this.state = {}; 
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        const response = await fetch(`/v1/blogs/${id}`);
        if (response.ok) {
            const blogData = await response.json();
            this.setState({blog: blogData});
        }
    }

    render() {
        if (this.state.blog === undefined) return <h1>There is nothing here!</h1>
        const blog = this.state.blog;
        return (
            <>
            <h1>{blog.title}</h1>
            <small>{new Date(blog.created_at).toDateString()}</small>
            </>
        )
    }
}


export default withRouter(BlogView);