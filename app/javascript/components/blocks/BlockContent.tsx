import React from 'react'
import Icon from '@mdi/react'
import {mdiUpload} from '@mdi/js'
import {convertCodeBlockStringToObject, convertQuoteBlockStringToObject} from '../../utils/blockContentConverters'
import {ProgLangs} from '../../utils/proglangs'


interface BlockContentProps {
    onContentChange: (value: string) => void
    content?: string
}

export class ImageBlock extends React.Component<BlockContentProps, {}> {
    contentUpdated(e: React.ChangeEvent<HTMLInputElement>) {
        let fileName = e.target.value;
        // TODO: make the file name change as well for the component
        this.props.onContentChange(fileName)
    }

    render() {
        return (
            <div className={'file has-name'}>
                <label className={'file-label'}>
                    <input className={'file-input'} type={'file'} accept={"jpg/png/gif"}/>                              
                    <span className={'file-cta'}>
                        <span className={'file-icon'}>
                            <Icon path={mdiUpload}/>
                        </span>
                        <span className={'file-label'}>
                            Choose an image file 
                        </span>
                    </span>
                    <span className={'file-name'}>
                        No image uploaded
                    </span>
                </label>
            </div>
        )
    }
}


interface CodeBlockState  {language: string, code: string}
export class CodeBlock extends React.Component<BlockContentProps, CodeBlockState> {

    constructor(props: Readonly<BlockContentProps>) {
        super(props);
        
        if (this.props.content!.length > 0) {
           this.state = convertCodeBlockStringToObject(this.props.content!)
        }
        else {
            this.state = {language: "", code: ""}
        }

        this.contentUpdated = this.contentUpdated.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this)
    }

    handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let language = e.target.value;
        this.setState( (state, props) => ({language: language}), () => {
            this.contentUpdated() 
         })
    }

    handleCodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let code = e.target.value;
        this.setState( (state, props) => ({code: code}), () => {
            this.contentUpdated()
        })
    }

    contentUpdated() {
        let content = `${this.state.language}\n${this.state.code}`;
        this.props.onContentChange(content)
    }

    render() {
        let langOptions = [<option>Languages</option>];
        Object.values(ProgLangs).forEach(lang => {langOptions.push(<option>{lang}</option>)});
        return (
            <div>
                <div className={'select'}>
                    <select onChange={this.handleLanguageChange} value={this.state.language}>
                        {langOptions}
                    </select>
                </div>
                <textarea className={'textarea'} onChange={this.handleCodeChange} value={this.state.code} ></textarea>
            </div>

        )
    }
}


export class TextBlock extends React.Component<BlockContentProps, {}> {
    constructor(props: Readonly<BlockContentProps>) {
        super(props);
        this.contentUpdated = this.contentUpdated.bind(this)
        
    }

    contentUpdated(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let newValue = e.target.value;
        this.props.onContentChange(newValue)
    }
    
    render() {
        return (<textarea className={'textarea'} onChange={this.contentUpdated} value={this.props.content}/>)
    }
}

interface QuoteBlockState {quote: string, person: string}
export class QuoteBlock extends React.Component<BlockContentProps, QuoteBlockState> {
    
    constructor(props: BlockContentProps) {
        super(props);

        if (this.props.content!.length > 0) {
            this.state = convertQuoteBlockStringToObject(this.props.content!)
        } 
        else this.state = {quote: "", person: ""};

        this.quoteChanged = this.quoteChanged.bind(this);
        this.personChanged = this.personChanged.bind(this)
    }



    quoteChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
        let newQuote = e.target.value;
        this.setState((state, props) => ({quote: newQuote}), () => { this.contentChange() })
        
    }
    personChanged(e: React.ChangeEvent<HTMLInputElement>) {
        let newPerson = e.target.value;
        this.setState( (state, props) => ({person: newPerson}), () => { this.contentChange() })
    }

    contentChange() {
        let content = `--${this.state.person}\n${this.state.quote}`;
        this.props.onContentChange(content)
    }
    
    render() {
        return (
            <div>
                <textarea className={'textarea'} placeholder={'Quote Here'} value={this.state.quote} onChange={this.quoteChanged}/>
                <input className={'input'} placeholder={'Quoted Person (Optional)'} value={this.state.person} onChange={this.personChanged}/>
            </div>
        )
    }
}