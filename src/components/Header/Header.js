import React, {Component} from 'react';
import "./Header.css";
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'
import { Search } from 'semantic-ui-react';
import {getUserInfo} from '../../ducks/users';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Header extends Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        return (
            <div className="header-container">
                 <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a className='header-title' href="#">Sangraal</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#"><Link to='/about'>ABOUT</Link></NavItem>                 
                            <NavItem eventKey={1} href="#"><Link to='/sell'>SELL</Link></NavItem>
                            <NavItem eventKey={2} href="#"><Link to={`/mygrails/${this.props.user.user_id}`}>MY GRAILS</Link></NavItem>
                            
                            {this.props.user.user_id ? <NavDropdown eventKey={3} title="ACCOUNT" id="basic-nav-dropdown">
                                                            <MenuItem eventKey={3.1}><Link to='/messages'>MESSAGES</Link></MenuItem>
                                                            <MenuItem eventKey={3.2}><Link to='/myitems'>MY ITEMS</Link></MenuItem>
                                                            <MenuItem eventKey={3.3}><Link to='/settings'>SETTINGS</Link></MenuItem>
                                                        </NavDropdown> 
                                                : 
                                                <div className='login-signup'><a href={process.env.REACT_APP_LOGIN}>LOGIN / SIGNUP</a></div>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className='sub-header'>
                    <div className='sub-header-links'>
                        <ul className='sub-header-links'>
                            <li className='h-out'>OUTWEAR</li>
                            <li className='h-top'>TOPS</li>
                            <li className='h-bot'>BOTTOMS</li>
                            <li className='h-foot'>FOOTWEAR</li>
                            <li className='h-snea'>SNEAKERS</li>
                            <li className='h-acce'>ACCESSORIES</li>
                        </ul>
                    </div>
                </div>
                <div className='header-link outerwear'>
                            
                    </div>
                    <div className='header-link tops'>

                    </div>
                    <div className='header-link bottoms'>

                    </div>
                    <div className='header-link footwear'>

                    </div>
                    <div className='header-link sneakers'>

                    </div>
                    <div className='header-link accessories'>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserInfo})(Header);