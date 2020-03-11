import React from 'react'
import Icon from '@mdi/react'
import {mdiChevronDown} from "@mdi/js"


interface DropDownProps {
    choices: Array<string>, 
    active?: string,
    onTypeChange: (value: string) => void
}
interface DropDownState  {
    choices: string[],
    isShowing: boolean,
}

class DropDown extends React.Component<DropDownProps, DropDownState> {
    constructor(props: Readonly<DropDownProps>) {
        super(props);

        this.state =  {
            choices: props.choices,
            isShowing: false,
        };
        this.buttonClicked = this.buttonClicked.bind(this)
    }


    typeChanged(choice: string) {
        this.setState({isShowing: false});
        this.props.onTypeChange(choice)
    }

    buttonClicked() {
        this.setState({isShowing: !this.state.isShowing})
    }

    render() {
        let dropdownAttributes = {className: "dropdown is-right"};
        if (this.state.isShowing) {
            dropdownAttributes.className = dropdownAttributes.className.concat(" is-active")
        }

        let choices = this.state.choices.map( (choice) => {
            let attributes = (choice === this.props.active ) ? "dropdown-item is-active" : "dropdown-item";
        return <a className={attributes} key={choice} onClick={this.typeChanged.bind(this, choice)}>{choice}</a>
        });
        
        return (
            <div {...dropdownAttributes}>
                <div className={'dropdown-trigger'}>
                    <button className={"button"} onClick={this.buttonClicked}>
                        <span className={"icon"}>
                            <Icon path={mdiChevronDown} title={'Change Block Type'}/>
                        </span>
                    </button>
                </div>
                <div className={'dropdown-menu'} id={'dropdown-menu'} role={'menu'}>
                    <div className={'dropdown-content'}>
                        {choices}
                    </div>
                </div>
            </div>
        );

    }
}
export default DropDown