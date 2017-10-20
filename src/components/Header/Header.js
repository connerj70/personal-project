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
                            <NavDropdown eventKey={3} title="CATEGORIES" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>OUTERWEAR</MenuItem>
                                <MenuItem eventKey={3.2}>TOPS</MenuItem>
                                <MenuItem eventKey={3.2}>BOTTOMS</MenuItem>
                                <MenuItem eventKey={3.2}>FOOTWEAR</MenuItem>
                                <MenuItem eventKey={3.2}>ACCESSORIES</MenuItem>
                            </NavDropdown>                       
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