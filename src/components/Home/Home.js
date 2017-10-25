import React, { Component } from 'react';
import './Home.css';
import largeImage from '../../assets/home-header.jpg';
import smallImage1 from '../../assets/header.jpg';
import smallImage2 from '../../assets/palace.jpg';
import raft from '../../assets/raft.jpg';
import carouselImage1 from '../../assets/kanye-west-bapesta.jpg';
import carouselImage2 from '../../assets/redwings.jpg';
import carouselImage3 from '../../assets/leatherba.jpg';
import hoodie from '../../assets/hoodie.jpg';
import shirt from '../../assets/shirt.jpg';
import leather from '../../assets/leather.jpg';
import homme from '../../assets/homme.jpg';
import cargo from '../../assets/cargo.jpg';
import scarf from '../../assets/scarf.jpg';
import denim from '../../assets/denim.jpg';
import hat from '../../assets/hat.jpg';
import nikes from '../../assets/nikes.jpg';
import preme from '../../assets/preme.jpg';
import boots from '../../assets/boots.jpg';
import { Carousel, Grid, Row, Col } from 'react-bootstrap';
import { Input, Icon } from 'semantic-ui-react';
import SmallListing from './SmallListing/SmallListing';
import axios from 'axios';
import { getListings, getListingImages, getUsers } from '../../ducks/users';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }
    }


    componentDidMount() {
        this.props.getListings();
        this.props.getListingImages();
        this.props.getUsers();
    }

    handleSearchChange(searchTerm) {
        this.setState({searchTerm: searchTerm})
    }

    
    render() {
        return (
            <div>
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={12} lg={8}>
                            <div className='large-image'>
                                <img src={largeImage} />
                            </div>
                        </Col>
                        <Col xs={12} lg={4}>
                             <div className='small-image'>
                            <img src={smallImage1} />
                        </div>
                        
                        <div className='small-image'>
                            <img src={smallImage2} />
                        </div>
                        </Col>
                    </Row>
                    <div className='home-container-1'>
                
                    <Row className='show-grid'>
                        <Col xs={12}>
                        <div classNam='shop-our-div'>
                            <h5 className='shop-our-lists'>SHOP OUR CURATED LISTS</h5>
                        </div>
                        </Col>
                    </Row>

                    <Row className='show-grid'>
                        <Col xs={12}>
                            <div className='carousel-container'>
                                <Carousel>
                                            <Carousel.Item>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage3}/>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage2}/>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage1}/>
                                                <Carousel.Caption>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                       
                                       
                                            <Carousel.Item>
                                                <img  className='carousel_image' alt="900x500" src={boots}/>
                                                <img  className='carousel_image' alt="900x500" src={shirt}/>
                                                <img  className='carousel_image' alt="900x500" src={hoodie}/>
                                               
                                                <Carousel.Caption>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                     
                                     
                                            <Carousel.Item>
                                                <img  className='carousel_image' alt="900x500" src={hat}/>
                                                <img  className='carousel_image' alt="900x500" src={preme}/>
                                                <img  className='carousel_image' alt="900x500" src={scarf}/>
                                                <Carousel.Caption>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
    
                   
                    </div>
                        <div className='flex-container'>
                        <Row align='center' className='show-grid search'>
                                <Col  className='search' xs={12}>
                                    <h5 className='browse'>BROWSE THE FEED</h5>
                                    <Input
                                    onChange={(e) => this.handleSearchChange(e.target.value)}
                                    className='search-input' 
                                    icon='search'
                                    placeholder='Search...'
                                    />
                                </Col>
                        </Row>
                        </div>
                    <Row className='show-grid' align="center">
                        <Col xs={12}>
                    <div className='listing-container'> 
                    {
                        this.props.listings.length ? <SmallListing searchTerm={this.state.searchTerm} className='small-listing' listingImages={this.props.listingImages[0]} listings={this.props.listings}/> : <div>Loading...</div>
                    }
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
        user: state.user,
        listings: state.listings,
        listingImages: state.listingImages
    }
}

export default connect(mapStateToProps, {getListings, getListingImages, getUsers})(Home);