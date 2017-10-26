import React, {Component} from 'react';
import "./Header.css";
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Grid, Row, Col } from 'react-bootstrap'
import { Search } from 'semantic-ui-react';
import {getUserInfo} from '../../ducks/users';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import shirt1 from '../../assets/shirt1.jpg';
import shirt2 from '../../assets/shirt2.jpg';
import shirt3 from '../../assets/shirt3.jpg';
import shirt4 from '../../assets/shirt4.jpg';
import outer1 from '../../assets/outer1.jpg';
import outer2 from '../../assets/outer2.jpg';
import outer3 from '../../assets/outer3.jpg';
import outer4 from '../../assets/outer4.jpg';
import bottoms1 from '../../assets/bottoms1.jpg';
import bottoms2 from '../../assets/bottoms2.jpg';
import bottoms3 from '../../assets/bottoms3.jpg';
import shoes1 from '../../assets/shoes1.jpg';
import shoes2 from '../../assets/shoes2.jpg';
import shoes3 from '../../assets/shoes3.jpg';
import sneaks1 from '../../assets/yeezy.jpg';
import sneaks2 from '../../assets/sneaks2.jpg';
import sneaks3 from '../../assets/sneaks3.jpg';
import acc1 from '../../assets/acc1.jpg';
import acc2 from '../../assets/acc2.jpg';
import acc3 from '../../assets/acc3.jpg';



class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeMenu: null
        }
        this.handleMouseOut = this.handleMouseOut.bind(this);
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

        var divStyleOuter1 = {
            backgroundImage: 'url(' + outer1 + ')',
            height: '367px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-12px 2px',
            width: '80%'
        }
        var divStyleOuter2 = {
            backgroundImage: 'url(' + outer2 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-12px 1px',
            width: '80%' 
        }
        var divStyleOuter3 = {
            backgroundImage: 'url(' + outer3 + ')',
            height: '310px',
            backgroundSize: 'cover',
            backgroundPosition: '-5px 52px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleShirt1 = {
            backgroundImage: 'url(' + shirt1 + ')',
            height: '368px',
            backgroundSize: 'cover',
            backgroundPosition: '-10px 14px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleShirt2 = {
            backgroundImage: 'url(' + shirt2 + ')',
            height: '351px',
            backgroundSize: 'cover',
            backgroundPosition: '-5px 41px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleShirt3 = {
            backgroundImage: 'url(' + shirt3 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundPosition: '0 1px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleBottoms1 = {
            backgroundImage: 'url(' + bottoms1 + ')',
            height: '400px',
            backgroundSize: 'contain',
            backgroundPosition: '0 20px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }
        var divStyleBottoms2 = {
            backgroundImage: 'url(' + bottoms2 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundPosition: '-12px 1px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }
        var divStyleBottoms3 = {
            backgroundImage: 'url(' + bottoms3 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundPosition: '-12px 1px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleShoes1 = {
            backgroundImage: 'url(' + shoes1 + ')',
            height: '368px',
            backgroundSize: 'cover',
            backgroundPosition: '-21px -2px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleShoes2 = {
            backgroundImage: 'url(' + shoes2 + ')',
            height: '368px',
            backgroundSize: 'cover',
            backgroundPosition: '-10px -2px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleShoes3 = {
            backgroundImage: 'url(' + shoes3 + ')',
            height: '368px',
            backgroundSize: 'cover',
            backgroundPosition: '-10px -2px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleSneaks1 = {
            backgroundImage: 'url(' + sneaks1 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundPosition: '-4px 0px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleSneaks2 = {
            backgroundImage: 'url(' + sneaks2 + ')',
            height: '400px',
            backgroundSize: 'contain',
            backgroundPosition: '0 20px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleSneaks3 = {
            backgroundImage: 'url(' + sneaks3 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundPosition: '-9px 0px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleAcc1 = {
            backgroundImage: 'url(' + acc1 + ')',
            height: '400px',
            backgroundSize: 'contain',
            backgroundPosition: '0 20px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleAcc2 = {
            backgroundImage: 'url(' + acc2 + ')',
            height: '361px',
            backgroundSize: 'cover',
            backgroundPosition: '-10px -1px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

        var divStyleAcc3 = {
            backgroundImage: 'url(' + acc3 + ')',
            height: '400px',
            backgroundSize: 'contain',
            backgroundPosition: '0 20px',
            backgroundRepeat: 'no-repeat',
            width: '80%' 
        }

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
                <div onMouseLeave={() => this.handleMouseOut()}className='hider-staff'>
                <Grid >
                    <Row className='show-grid'>
                        <Col xs={12}>
                            <div className='sub-header'>
                                <div className='sub-header-links'>
                                    <ul className='sub-header-links'>
                                        <li onMouseEnter={() => this.handleMouseIn(1)} className='h-out'>OUTWEAR</li>
                                        <li onMouseEnter={() => this.handleMouseIn(2)} className='h-top'>TOPS</li>
                                        <li onMouseEnter={() => this.handleMouseIn(3)} className='h-bot'>BOTTOMS</li>
                                        <li onMouseEnter={() => this.handleMouseIn(4)} className='h-foot'>FOOTWEAR</li>
                                        <li onMouseEnter={() => this.handleMouseIn(5)} className='h-snea'>SNEAKERS</li>
                                        <li onMouseEnter={() => this.handleMouseIn(6)} className='h-acce'>ACCESSORIES</li>
                                    </ul>
                                </div>
                            </div>
                            
                                <div className={this.state.activeMenu === 1 ? 'show' : 'testclas7 show'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col className='menu-column' xs={3}>
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
                                                <div style={divStyleOuter1} className='shirt1'>
                                                    <div className='tinter1'>
                                                        <h3 className='menu-header12'>Denim Jackets</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleOuter3} className='shirt2'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Leather</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleOuter2} className='shirt3'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Undercover</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>

                                <div  className={this.state.activeMenu === 2 ? 'show' : 'testclas7 show'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col className='menu-column' xs={3}>
                                                <h3>All Tops</h3>
                                                <ul className='outerwear-list'>
                                                    <li>Long Sleeve T-Shirts</li>
                                                    <li>Polos</li>
                                                    <li>Shirts (Button Up)</li>
                                                    <li>Short Sleeve T-Shirts</li>
                                                    <li>Sweaters</li>
                                                    <li>Sweatshirts</li>
                                                    <li>Tank Tops</li>
                                                    <li>Jerseys</li>
                                                </ul>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleShirt1} className='shirt1'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>T-Shirts</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleShirt3} className='shirt2'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Polos</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleShirt2} className='shirt3'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Hoodies</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                                <div  className={this.state.activeMenu === 3 ? 'show' : 'testclas7 show'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col className='menu-column' xs={3}>
                                                <h3>All Bottoms</h3>
                                                <ul className='outerwear-list'>
                                                    <li>Casual Pants</li>
                                                    <li>Cropped Pants</li>
                                                    <li>Denim</li>
                                                    <li>Leggins</li>
                                                    <li>Overalls</li>
                                                    <li>Shorts</li>
                                                    <li>Sweatpants</li>
                                                    <li>Joggers</li>
                                                </ul>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleBottoms3} className='shirt1'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Shorts</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleBottoms2} className='shirt2'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Sweatpants</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleBottoms1} className='shirt3'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Designer</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                                <div  className={this.state.activeMenu === 4 ? 'show' : 'testclas7 show'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col className='menu-column' xs={3}>
                                                <h3>All Footwear</h3>
                                                <ul className='outerwear-list'>
                                                    <li>Boots</li>
                                                    <li>Casual Leather Shoes</li>
                                                    <li>Formal Shoes</li>
                                                    <li>Hi-Top Sneakers</li>
                                                    <li>Low-Top Sneakers</li>
                                                    <li>Sandals</li>
                                                    <li>Slip Ons</li>
                                                </ul>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleShoes3} className='shirt1'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Rick Owens</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleShoes1} className='shirt2'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Gucci</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleShoes2} className='shirt3'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Minimal</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                                <div  className={this.state.activeMenu === 5 ? 'show' : 'testclas7 show'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col className='menu-column' xs={3}>
                                                <h3>All Sneakers</h3>
                                                <ul className='outerwear-list'>
                                                    <li>Adidas NMD</li>
                                                    <li>Common Projects</li>
                                                    <li>Nike Lab</li>
                                                    <li>Nike Flyknit</li>
                                                    <li>Supreme Collabs</li>
                                                    <li>Vans</li>
                                                </ul>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleSneaks1} className='shirt1'>
                                                   <div className='tinter1'>
                                                        <h3 className='menu-header12'>Yeezy</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleSneaks2} className='shirt2'>
                                                    <div className='tinter1'>
                                                        <h3 className='menu-header12'>Adidas Ultraboost</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleSneaks3} className='shirt3'>
                                                   <div className='tinter1'>
                                                     <h3 className='menu-header12'>Air Jordan</h3>
                                                   </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                                <div  className={this.state.activeMenu === 6 ? 'show' : 'testclas7 show'}>
                                    <Grid>
                                        <Row className='show-grid'>
                                            <Col className='menu-column' xs={3}>
                                                <h3>All Accessories</h3>
                                                <ul className='outerwear-list'>
                                                    <li>Bags</li>
                                                    <li>Belts</li>
                                                    <li>Glasses</li>
                                                    <li>Gloves</li>
                                                    <li>Hats</li>
                                                    <li>Jewlery</li>
                                                    <li>Watches</li>
                                                    <li>Socks</li>
                                                    <li>Sunglasses</li>
                                                    <li>Supreme</li>
                                                </ul>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleAcc1} className='shirt1'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>All Accessories</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleAcc2} className='shirt2'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Backpacks</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div style={divStyleAcc3} className='shirt3'>
                                                    <div className='tinter1'>
                                                    <h3 className='menu-header12'>Chrome Hearts</h3>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </div>
                        </Col>
                    </Row>
                </Grid>
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