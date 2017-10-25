import React, {Component} from 'react';
import "./Header.css";
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Grid, Row, Col } from 'react-bootstrap'
import { Search } from 'semantic-ui-react';
import {getUserInfo} from '../../ducks/users';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeMenu: null
        }
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    handleMouseIn(num) {
        this.setState({
            activeMenu: num
        })
    }

    handleMouseOut() {
        this.setState({
            activeMenu: null
        })
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
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={12}>
                            <div className='sub-header'>
                                <div className='sub-header-links'>
                                    <ul className='sub-header-links'>
                                        <li onMouseEnter={() => this.handleMouseIn(1)}  className='h-out'>OUTWEAR</li>
                                        <li onMouseEnter={() => this.handleMouseIn(2)} onMouseOut={() => this.handleMouseOut()} className='h-top'>TOPS</li>
                                        <li onMouseEnter={() => this.handleMouseIn(3)} onMouseOut={() => this.handleMouseOut()} className='h-bot'>BOTTOMS</li>
                                        <li onMouseEnter={() => this.handleMouseIn(4)} onMouseOut={() => this.handleMouseOut()} className='h-foot'>FOOTWEAR</li>
                                        <li onMouseEnter={() => this.handleMouseIn(5)} onMouseOut={() => this.handleMouseOut()} className='h-snea'>SNEAKERS</li>
                                        <li onMouseEnter={() => this.handleMouseIn(6)} onMouseOut={() => this.handleMouseOut()} className='h-acce'>ACCESSORIES</li>
                                    </ul>
                                </div>
                            </div>
                                <div  onMouseOut={() => this.handleMouseOut()} className={this.state.activeMenu === 1 ? 'show' : 'hidden'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col xs={3}>
                                                <h3>All Outerwear</h3>
                                                <ul className='outerwear-list'>
                                                    <li>Bombers</li>
                                                    <li>Cloaks</li>
                                                    <li>Denim Jackets</li>
                                                    <li>Heavy Jackets</li>
                                                    <li>Leather Jackets</li>
                                                    <li>Light Jackets</li>
                                                    <li>Parkas</li>
                                                    <li>Raincoats</li>
                                                    <li>Vests</li>
                                                </ul>
                                            </Col>
                                            <Col xs={3}>
                                            
                                            </Col>
                                            <Col xs={3}>
                                            
                                            </Col>
                                            <Col xs={3}>
                                            
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                                <div  className={this.state.activeMenu === 2 ? 'show' : 'hidden'}>
                                        TOPS
                                </div>
                                <div  className={this.state.activeMenu === 3 ? 'show' : 'hidden'}>
                                        BOTTOMS
                                </div>
                                <div  className={this.state.activeMenu === 4 ? 'show' : 'hidden'}>
                                        FOOTWEAR
                                </div>
                                <div  className={this.state.activeMenu === 5 ? 'show' : 'hidden'}>
                                        SNEAKERS
                                </div>
                                <div  className={this.state.activeMenu === 6 ? 'show' : 'hidden'}>
                                        ACCESSORIES
                            </div>
                        </Col>
                    </Row>
                </Grid>
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