import React from 'react';
import PopularFeed from './PopularFeed'


interface FeedState {
    feed: [],
    error: boolean
}

/**
 * This is a container component that runs the api call
 *  The passes the feed to the two diferent feed componenets
 */
class FeedContainer extends React.Component<{}, FeedState> {
    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            error: false
        }
    }

    async componentDidMount() {
        // load api call
        let response = await fetch("/v1/blogs");
        if (response.ok) {
            let feedJson = await response.json();
            console.log(response.ok)
            this.setState({feed: feedJson})
        }
        else this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return <h1>Could not load feed from server</h1>
        }
        else {
            return <PopularFeed feed={this.state.feed}/>
        }
    }

}

export default FeedContainer;