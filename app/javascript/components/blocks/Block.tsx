import React from 'react'
import DropDown from '../DropDown'
import BlockType from './BlockTypes'


interface BlockState {
    type: string
    closed: boolean
}

interface BlockProps {
    description?: string
    onTypeChange: (type:string) => void
    onDelete: () => void
}

class Block extends React.Component<BlockProps, BlockState> {
    
    constructor(props: Readonly<BlockProps>) {
        super(props);
        this.state = {type: BlockType.text, closed: true};
        this.changeType = this.changeType.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this)
    }

    changeType(newType: string) {
        this.props.onTypeChange(newType);
        this.setState({type: newType})
    }

    toggleOpen() {
        this.setState({closed: !this.state.closed})
    }

    render() {

        let allTypes = Object.values(BlockType);

        let closeToggleFn = this.toggleOpen;

        if (this.state.closed) {
            return (
                <div className={'card closed block-card'}>
                    <div className={'card-header'} onClick={closeToggleFn}>
                        <p className={'card-header-title ellipsis-text'}>
                            {this.state.type}:  
                            <span className={'has-text-grey'}> {this.props.description}</span>
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'card block-card'}>
                    <header className={'card-header'}>
                        <p className={'card-header-title'}>{this.state.type}</p>
                        <div className={"card-header-icon"} aria-label={"more options"}>
                            <DropDown choices={allTypes} onTypeChange={this.changeType} active={this.state.type} />
                        </div>

                    </header>
                    <div className={'card-content'}>
                        <div className={'content'}>
                            {this.props.children}
                        </div>
                    </div>
                    <footer className={'card-footer'}>
                        <a href={'#'} className={"card-footer-item"} onClick={closeToggleFn}>Collaspe</a>
                        <a href={'#'} className={"card-footer-item"} onClick={this.props.onDelete} >Delete</a>
                    </footer>
                </div>
            );
        } // else
    }
}

export default Block