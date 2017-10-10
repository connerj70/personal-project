import React, { Component } from 'react';
import './Home.css';
import largeImage from '../../assets/home-header.jpg';
import smallImage1 from '../../assets/header.jpg';
import smallImage2 from '../../assets/palace.jpg';
import carouselImage1 from '../../assets/kanye-west-bapesta.jpg';
import carouselImage2 from '../../assets/redwings.jpg';
import carouselImage3 from '../../assets/leatherba.jpg';
import { Carousel } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';
import SmallListing from './SmallListing/SmallListing';
import axios from 'axios';
import { getListings, getListingImages } from '../../ducks/users';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        this.props.getListings();
        this.props.getListingImages();
        console.log("Listings From Home",this.props.listings);
        console.log("ListingImages From Home", this.props.listingImages)
    }

    


    render() {
        
        return (
            <div>
            <div className='home-container-1'>
                <div className='large-image'>
                    <img src={largeImage} />
                </div>
                
                <div className='small-holder'>
                    <div className='small-image'>
                        <img src={smallImage1} />
                    </div>
                    
                    <div className='small-image'>
                        <img src={smallImage2} />
                    </div>
                </div>
               
                <div className='carousel-container'>
                    <Carousel>
                        <Carousel.Item>
                            <img width={300} height={300} alt="900x500" src={carouselImage1}/>
                            <img width={300} height={300} alt="900x500" src={carouselImage2}/>
                            <img width={300} height={300} alt="900x500" src={carouselImage3}/>
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={300} height={300} alt="900x500" src={carouselImage2}/>
                            <img width={300} height={300} alt="900x500" src={carouselImage1}/>
                            <img width={300} height={300} alt="900x500" src={carouselImage3}/>
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={300} height={300} alt="900x500" src={carouselImage3}/>
                            <img width={300} height={300} alt="900x500" src={carouselImage2}/>
                            <img width={300} height={300} alt="900x500" src={carouselImage1}/>
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
  
            </div>
                <div className='flex-container'>
                    <div className='input-container'>
                        <p>BROWSE THE FEED</p>
                        <Input 
                        icon='search'
                        placeholder='Search...'
                        />
                    </div>
                </div>
                <div className='listing-container'> 
                   {
                       this.props.listings.length ? <SmallListing listings={this.props.listings}/> : <div>Loading...</div>
                   }
                </div>
                <div>
                    {this.props.listingImages}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        listings: state.listings,
        listingImages: state.listingImages
    }
}

export default connect(mapStateToProps, {getListings, getListingImages})(Home);