import React, { Component } from 'react';
import './Home.css';
import largeImage from '../../assets/home-header.jpg';
import smallImage1 from '../../assets/header.jpg';
import smallImage2 from '../../assets/palace.jpg';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <div className='home-container-1'>
                <div className='large-image'>
                    <img src={largeImage} />
                </div>
                <h1 className='typewriter'>Find Your Sangraal.</h1>
                <div className='small-holder'>
                <div className='small-image'>
                    <img src={smallImage1} />
                </div>
                <div className='small-image'>
                    <img src={smallImage2} />
                </div>
                </div>
            </div>
        )
    }

}

export default Home;