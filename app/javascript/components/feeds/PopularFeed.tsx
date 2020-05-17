import React from 'react';
import {Link} from 'react-router-dom';

interface ItemProps {
    title?: string,
    author?: string,
    date?: string,
    id?: number 
}

// TODO: ADD TESTING FOR ALL OF THIS CRAP

const PopularItem: React.FC<ItemProps> = (props: ItemProps ) => {
    const dateObj = new Date(props.date);
    const prettyDateString = ` ${dateObj.toDateString()}`
    return (
        <React.Fragment>
            <strong>{props.title}</strong>
            <p className={"content is-small"}>{props.author}</p>
            <p className={"content is-small"}>{prettyDateString}</p>
        </React.Fragment>
    )
};

interface PopularFeedProps {
    feed?: ItemProps[]
}

/**
 * A popular article feed component
 * @param props 
 *  Feed, a json list of items to show in the feed
 */
const PopularFeed: React.FC<PopularFeedProps> = (props: PopularFeedProps) => {

    

    let feedItems = props.feed.map(item => ( <Link to={`/blog/view/${item.id}`}>
                                                <PopularItem title={item.title} 
                                                             author={item.author} 
                                                             date={item['created_at']}
                                                             key={item.id}/>
                                            </Link>
                                            ));
   
    return (
        <div>
            <strong className={'title is-4'}>Trending on DevRamblings</strong>
            <hr/>
            {feedItems}
        </div>
    )
}

export default PopularFeed;