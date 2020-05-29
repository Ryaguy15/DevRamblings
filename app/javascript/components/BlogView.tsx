import React from 'react';
import {withRouter} from 'react-router-dom';
import {WithRouterProps} from '../utils/types';
import BlogPreview from './BlogPreview';

interface BlogViewState {
    blog?: {title: string, body: {id: string, type: string, value: string}[], created_at: string}
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
            let blogData = await response.json();
            blogData.body = JSON.parse(blogData.body);
            this.setState({blog: blogData});
        }
    }

    render() {
        if (this.state.blog === undefined) return <h1>There is nothing here!</h1>
        const blog = this.state.blog;
        return (
            <BlogPreview title={blog.title} blocks={blog.body}>
                <small>{new Date(blog.created_at).toDateString()}</small>
            </BlogPreview>
        )
    }
}


export default withRouter(BlogView);