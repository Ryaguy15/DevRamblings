import React from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {convertCodeBlockStringToObject, convertQuoteBlockStringToObject} from '../../utils/blockContentConverters'

interface BlockPreviewProps {
    data: string
}

export function CodeBlockPreview (props: BlockPreviewProps) {
        if (props.data.length > 0) {
            let description = convertCodeBlockStringToObject(props.data);
            return <SyntaxHighlighter style={darcula} showLineNumbers language={description.language.toLowerCase()}>
                        {description.code}
                   </SyntaxHighlighter> 
        }
        return <code></code>
}


export function QuoteBlockPreview (props: BlockPreviewProps) {
    if (props.data.length > 0) {
        let description = convertQuoteBlockStringToObject(props.data);
        
        if (description.person.length > 0) {
            return (
                <div className={"person-quote"}>
                    <blockquote>{description.quote}</blockquote>
                    <p>-- {description.person}</p>
                </div>
             )
        }
        return <blockquote>{description.quote}</blockquote>
    }
    return <q></q>
}
