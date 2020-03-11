import React from "react"
import BlockType from "./blocks/BlockTypes"
import {CodeBlockPreview, QuoteBlockPreview} from "./blocks/BlockPreview"

interface PreviewProps { title: string, blocks: {id: string, type: string, value: string}[] }


class BlogPreview extends React.Component<PreviewProps, {}> {

    createPreviewContent(block: {id: string, type: string, value: string}) {
        switch (block.type) {
            case BlockType.text:
                return <p  key={block.id} className={'is-family-primary'}>{block.value}</p>;
            case BlockType.code:
                return <CodeBlockPreview key={block.id} data={block.value}></CodeBlockPreview>;
            case BlockType.quote:
                return <QuoteBlockPreview key={block.id} data={block.value}/>;
            default:
                return (<h1 key={block.id} className={"has-text-danger"}>
                        Could not generate preview for type {block.type}
                        </h1>)
        }
    }

    render() {
        let blockPreviews = this.props.blocks.map((block) => this.createPreviewContent(block));

       return (
           <div className={'content'}>
            <h1>{this.props.title}</h1>
            {blockPreviews}
           </div>
       )
   } 
}

export default BlogPreview