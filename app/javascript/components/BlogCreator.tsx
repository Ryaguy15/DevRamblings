import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import Block from './blocks/Block'
import { CodeBlock, ImageBlock, QuoteBlock, TextBlock } from './blocks/BlockContent'
import { generateUUID } from '../utils/uuid'
import BlogPreview from './BlogPreview'
import BlockType from './blocks/BlockTypes'
import { getUserToken } from '../redux/selectors';
import { WithRouterProps } from '../utils/types'



interface BlogCreatorProps extends WithRouterProps {
    user_token: string
}

interface CreatorState {
    blocks: { id: string, type: string, value: string }[]
    title: string
}

class BlogCreator extends React.Component<BlogCreatorProps, CreatorState> {

    constructor(props: Readonly<BlogCreatorProps>) {
        super(props);
        this.state = { blocks: [], title: "Blog Title" };
        this.addBlock = this.addBlock.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.postBlog = this.postBlog.bind(this);
    }

    blockTypeChanged(id: number, type: string) {
        console.log("Running block type changed function");
        let blocks = Array.from(this.state.blocks);
        let block = blocks[id];
        block.type = type;
        block.value = ""; // clear out the last value
        this.setState({ blocks: blocks })
    }

    handleBlockContentChange(id: string, value: string) {
        let blocks = Array.from(this.state.blocks);
        let changedBlock = blocks.find(block => block.id === id);
        changedBlock!.value = value;
        this.setState({ blocks: blocks })
    }
    // Reads the block type from the state and generates the apporiate block content component
    generateBlockContent() {
        return this.state.blocks.map((block) => {
            switch (block.type) {
                case BlockType.text:
                    return <TextBlock onContentChange={this.handleBlockContentChange.bind(this, block.id)} content={block.value} />;
                case BlockType.image:
                    return <ImageBlock onContentChange={this.handleBlockContentChange.bind(this, block.id)} content={block.value} />;
                case BlockType.code:
                    return <CodeBlock onContentChange={this.handleBlockContentChange.bind(this, block.id)} content={block.value} />;
                case BlockType.quote:
                    return <QuoteBlock onContentChange={this.handleBlockContentChange.bind(this, block.id)} content={block.value} />
            }
        });
    }

    addBlock() {
        let blocks = Array.from(this.state.blocks);
        blocks.push({ id: generateUUID(), type: BlockType.text, value: "" });
        this.setState({ blocks: blocks })
    }

    removeBlock(id: string) {
        // eslint-disable-next-line no-restricted-globals
        let doDeletion: boolean = confirm("Are you sure you want to delete this block?");
        if (doDeletion) {
            let blocks = Array.from(this.state.blocks);
            this.setState({
                blocks: blocks.filter((value) => value.id !== id)
            })
        }
    }

    handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ title: e.target.value })
    }

    async postBlog() {
        const response = await fetch("/v1/blogs", {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title, body: JSON.stringify(this.state.blocks)}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': this.props.user_token
            }

        })
        const responseBody = await response.json();
        if (response.ok) {
            // move back to the homepage
            this.props.history.replace('/');
        }
        else {
            // show a warning message
            console.log(responseBody.message);
        }
    }

    render() {

        let blocks = this.generateBlockContent()
            .map((blockContent, index) =>
                <Block onTypeChange={this.blockTypeChanged.bind(this, index)}
                    onDelete={this.removeBlock.bind(this, this.state.blocks[index].id)}
                    key={this.state.blocks[index].id} description={this.state.blocks[index].value}>
                    {blockContent}
                </Block>
            );

        return (
            <div className={'columns'}>
                <div className={'column is-three-fifths'}>
                    <BlogPreview title={this.state.title} blocks={this.state.blocks} />
                </div>
                <div className={'column'} id={'editor'}>
                    <div id={'editor-header'} className={'has-background-primary content has-text-centered is-marginless'}>
                        <h3 className={'is-large level-item has-text-white-bis'}>Blog Blocks</h3>
                    </div>
                    <div id={'block-container'} className={'box container is-marginless'}>
                        <input className={"input"} type={"text"} placeholder={"Blog Title"} onChange={this.handleTitleChange} />
                        {blocks}
                        <hr />
                        <button className={'button is-primary is-fullwidth'} onClick={this.addBlock}>
                            Add Block
                        </button>
                        <br />
                        <button className={'button is-fullwidth'} onClick={this.postBlog}>
                            Post Blog
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


const MapStateToProps = state => ({
    user_token: getUserToken(state)
});

export default connect(MapStateToProps)(withRouter(BlogCreator));