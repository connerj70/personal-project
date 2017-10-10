import React from 'react';
import "./Header.css";
import {Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap'
const Header = () => {
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
                        <NavItem eventKey={1} href="#">ABOUT</NavItem>
                        <NavDropdown eventKey={3} title="CATEGORIES" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>OUTERWEAR</MenuItem>
                            <MenuItem eventKey={3.2}>TOPS</MenuItem>
                            <MenuItem eventKey={3.2}>BOTTOMS</MenuItem>
                            <MenuItem eventKey={3.2}>FOOTWEAR</MenuItem>
                            <MenuItem eventKey={3.2}>ACCESSORIES</MenuItem>
                        </NavDropdown>                       
                        <NavItem eventKey={1} href="#">SELL</NavItem>
                        <NavItem eventKey={2} href="#">MY GRAILS</NavItem>
                        <NavDropdown eventKey={3} title="ACCOUNT" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>MESSAGES</MenuItem>
                            <MenuItem eventKey={3.2}>MY ITEMS</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;