import React, { Component } from 'react';
import './Home.css';
import largeImage from '../../assets/home-header.jpg';
import smallImage1 from '../../assets/header.jpg';
import smallImage2 from '../../assets/palace.jpg';
import carouselImage1 from '../../assets/kanye-west-bapesta.jpg';
import carouselImage2 from '../../assets/redwings.jpg';
import carouselImage3 from '../../assets/leatherba.jpg';
import { Carousel, Grid, Row, Col, Pagination } from 'react-bootstrap';
import { Input, Icon } from 'semantic-ui-react';
import SmallListing from './SmallListing/SmallListing';
import axios from 'axios';
import { getListings, getListingImages, getUsers } from '../../ducks/users';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // searchTerm: '',
            searchTerm1: '',
            activePage: 0
        }
    }


    componentDidMount() {
        this.props.getListings(this.state.activePage, this.state.searchTerm1);
        this.props.getListingImages();
        this.props.getUsers();
    }

    handleSearchChange(searchTerm1) {
        this.setState({searchTerm1: searchTerm1})
        getListings(this.state.activePage, this.state.searchTerm1)
    }

    handleNext() {
        this.setState({
            activePage: this.state.activePage + 40
        })
        this.props.getListings(this.state.activePage, this.state.searchTerm1);
    }

    handlePrev() {
        this.setState({
            activePage: this.state.activePage - 40
        }, function() {
            this.props.getListings(this.state.activePage, this.state.searchTerm1);
        })
       
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
                                                <img  className='carousel_image' alt="900x500" src={carouselImage1}/>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage3}/>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage2}/>
                                               
                                                <Carousel.Caption>
                                                </Carousel.Caption>
                                            </Carousel.Item>
                                     
                                     
                                            <Carousel.Item>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage2}/>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage1}/>
                                                <img  className='carousel_image' alt="900x500" src={carouselImage3}/>
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
                                    <p>BROWSE THE FEED</p>
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
                    <div>
                        <button onClick={() => this.handlePrev()}>prev</button>
                        <button onClick={() => this.handleNext()}>next</button>
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