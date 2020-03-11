import React, {useState} from 'react';
import icon from '../resources/Icon.svg'

export const NavBar: React.FC = (props) => {

    let [menuClass, setMenuClass] = useState("");
    let [burgerClass, setBurgerClass] = useState("");

    let hamburgerClicked = () => {
        let newCssClass = menuClass !== "" ? "" : "is-active";
        setBurgerClass(newCssClass);
        setMenuClass(newCssClass)
    };

    return (
        <nav className={'navbar'} role={'navigation'}>
            <div className={'navbar-brand'}>
                <a className={'navbar-item '} href={"/"}>
                    <img src={icon} alt={"DevRamblings Logo"}/>
                    DevRamblings
                </a>
                <a role="button" className={"navbar-burger burger " + burgerClass} aria-label="menu" aria-expanded="false"
                   data-target="navbarMenu" onClick={hamburgerClicked}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            
            <div className={'navbar-menu ' + menuClass} id={'navbarMenu'}>
                <div className="navbar-start">
                    {props.children}
                </div>
            </div>
        </nav>
    )
};
