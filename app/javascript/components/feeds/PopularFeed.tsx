import React from 'react';

interface ItemProps {
    title?: string,
    author?: string,
    date?: string
}
const PopularItem: React.FC<ItemProps> = (props: ItemProps ) => {
    return (
        <React.Fragment>
            <strong>{props.title}</strong>
            <p className={"content is-small"}>{props.author}</p>
            <p className={"content is-small"}>{props.date}</p>
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

    let feedItems = props.feed.map(item => <PopularItem title={item.title} 
                                                        author={item.author} 
                                                        date={item.date}/>);
   
    return (
        <div>
            <strong className={'title is-4'}>Trending on DevRamblings</strong>
            <hr/>
            {feedItems}
        </div>
    )
}

export default PopularFeed;