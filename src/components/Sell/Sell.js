import React, {Component} from 'react';
import backgroundPicture from '../../assets/sell-header.jpg';
import './Sell.css';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class Sell extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: 'Top',
            brand: '',
            price: '',
            description:'',
            size: '',
            name: '',
            condition: 1,
            imageURL: ''
        }
    }

    addListing(e) {
        e.preventDefault();
        let {category, brand, price, description, size, name, condition, imageURL} = this.state;
        let user_id = this.props.user.user_id
        axios.post('http://localhost:3005/api/listings', {category: category, brand: brand, price: price, description: description, size: size, name: name, condition: condition, user_id: user_id, imageURL: imageURL });
        this.setState({
            category: 'Top',
            brand: '',
            price: '',
            description:'',
            size: '',
            name: '',
            condition: 1,
            imageURL: ''
        })
    }

    handleCategoryChange(value) {
        this.setState({
            category: value
        })
    }

    handleSizeChange(value) {
        this.setState({
            size: value
        })
    }

    handleNameChange(value) {
        this.setState({
            name: value
        })
    }

    handleBrandChange(value) {
        this.setState({
            brand: value
        })
    }

    handlePriceChange(value) {
        this.setState({
            price: value
        })
    }

    handleDescriptionChange(value) {
        this.setState({
            description: value
        })
    }

    handleConditionChange(value) {
        this.setState({
            condition: value
        })
    }

    handleImageURLChange(value) {
        this.setState({
            imageURL: value
        })
    }

    render() {
        return (
            <div className='sellform-wrapper'>
                <Jumbotron>
                    <h1 >Turn your Closet Into Cash</h1>
                </Jumbotron>

                <form>

                <div className="details-container">
                    <h3></h3>
                    <div className='two-columns'>
                        <div className='left-column'>
                            <div>
                                <select onChange={(e) => this.handleCategoryChange(e.target.value)} value={this.state.category}>
                                    <option value="Top">TOP</option>
                                    <option value="Bottom">BOTTOM</option>
                                    <option value="Footwear">FOOTWEAR</option>
                                    <option value="Outerwear">OUTERWEAR</option>
                                    <option value="Accessories">ACCESSORIES</option>
                                </select>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='right-column'>
                            <div className='size'>
                                <input onChange={(e) => this.handleSizeChange(e.target.value)} value={this.state.size} placeholder="size"/>
                            </div>
                            <div className='name'>
                                <input onChange={(e) => this.handleNameChange(e.target.value)} value={this.state.name} placeholder="name"/>
                            </div>
                        </div>
                    </div>
                </div>
                    
                
                    <input onChange={(e) => this.handleBrandChange(e.target.value)} value={this.state.brand} placeholder="brand"/>
                   
                    
                    <input onChange={(e) => this.handlePriceChange(e.target.value)} value={this.state.price} placeholder="price"/>
                    <textarea onChange={(e) => this.handleDescriptionChange(e.target.value)} value={this.state.description} rows="4" cols="50"placeholder="description"/>
                    <p>condition</p>
                    <select onChange={(e) => this.handleConditionChange(e.target.value)} value={this.state.condition} name='condition'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <input onChange={(e) => this.handleImageURLChange(e.target.value)} value={this.state.imageURL} placeholder="image URL" />
                    <button type='button' onClick={(e) => this.addListing(e)}>PUBLISH</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }  
}

export default connect(mapStateToProps)(Sell);