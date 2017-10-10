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
import { Card } from 'semantic-ui-react';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {

        const listing1 = <SmallListing 
                            image={smallImage2}
                            header="Sweet"
                            meta="Shoe"
                            description="LOREM IPSUM DESCIRPTIONA"
                            />
        const listing2 = <SmallListing 
                            image={smallImage2}
                            header="Sweet"
                            meta="Shoe"
                            description="LOREM IPSUM DESCIRPTIONA"
                            />
        const listing3 = <SmallListing 
                            image={smallImage2}
                            header="Sweet"
                            meta="Shoe"
                            description="LOREM IPSUM DESCIRPTIONA"
                            />
        const listing4 = <SmallListing 
                            image={smallImage2}
                            header="Sweet"
                            meta="Shoe"
                            description="LOREM IPSUM DESCIRPTIONA"
                            />

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
                    <span className='messer'>{listing1}</span>
                    {listing2}
                    {listing3}
                    {listing4}
                </div>
                
            </div>
        )
    }

}

export default Home;