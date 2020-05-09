import React, {useState} from 'react';
import LoginForm from './authforms/LoginForm';
import icon from '../resources/Icon.svg';
import {getIsUserLoggedIn} from '../redux/selectors'
import { connect } from 'react-redux';

interface NavBarProps {
    isLoggedIn: boolean
}
export const NavBar: React.FC<NavBarProps> = (props) => {

    let [menuClass, setMenuClass] = useState("");
    let [burgerClass, setBurgerClass] = useState("");
    let [showModal, setShowModal] = useState(false);

    let hamburgerClicked = () => {
        let newCssClass = menuClass !== "" ? "" : "is-active";
        setBurgerClass(newCssClass);
        setMenuClass(newCssClass)
    };

    let modalClass = showModal ? "is-active" : "";

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
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            { props.isLoggedIn ?
                                <a className="button is-light"> Logout </a>    
                                :
                                <a className="button is-light" onClick={e => setShowModal(true)}>
                                    Log in
                                </a>
                            }   
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal ${modalClass}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Login to DevRamblings</p>
                        <button className="delete" aria-label="close" onClick={e => setShowModal(false)}>
                        </button>
                    </header>  
                    <section className="modal-card-body">
                        <LoginForm onSuccess={ () => setShowModal(false) }/>
                    </section>              
                </div> 
            </div>
        </nav>
    )
};

const MapStateToProps = (state) => (
    {
        isLoggedIn: getIsUserLoggedIn(state)
    })

export default connect(MapStateToProps)(NavBar);