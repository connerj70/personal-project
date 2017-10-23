import React, {Component} from 'react';
import backgroundPicture from '../../assets/sell-header.jpg';
import './Sell.css';
import { Jumbotron, Grid, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import ReactS3Uploader from 'react-s3-uploader';
import { cloudinarySecret, apiKey, uploadPreset } from './sellSecret';
import sha1 from 'sha1';
import superagent from 'superagent';

class Sell extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: '',
            brand: '',
            price: '',
            description:'',
            size: '',
            name: '',
            condition: null,
            imageURL: '',
            images: []
        }
    }

    addListing(e) {
        e.preventDefault();
        let {category, brand, price, description, size, name, condition, imageURL} = this.state;
        let user_id = this.props.user.user_id
        axios.post('http://localhost:3005/api/listings', {category: category, brand: brand, price: price, description: description, size: size, name: name, condition: condition, user_id: user_id, imageURL: imageURL });
        this.setState({
            category: '',
            brand: '',
            price: '',
            description:'',
            size: '',
            name: '',
            condition: null,
            imageURL: ''
        })
        axios.post('http://localhost:3005/api/listings/images', {})
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

    uploadFile(files) {
        console.log('uploadFile: ')
        const image = files[0];

        const cloudName = 'daqydernc';
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload';
        const timestamp = Date.now()/1000;
        const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + cloudinarySecret;
        const signature = sha1(paramsStr);

        const params = {
            'api_key': apiKey,
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image);

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err, resp) => {
            if (err) {
                alert(err)
                return
            }
            console.log('UPLOAD COMPLETE: ' + JSON.stringify(resp.body))
            const uploaded = resp.body;
            let updatedImages = Object.assign([], this.state.images)
            updatedImages.push(uploaded);
            this.setState({
                images: updatedImages
            })
        })
    }
  
    render() {
        return (
            <div className='sellform-wrapper'>
                <Grid>
                    <Jumbotron>
                        <h1 >Turn your Closet Into Cash</h1>
                    </Jumbotron>

                    <form>
                    <Row className='show-grid'>
                    <div className="details-container">
                            <Col xs={12}>
                                <h3 className='sell-details'>DETAILS</h3>
                            </Col>
                            <Col xs={12} md={6}>
                                    
                                    <div className="sell-input">
                                        <div className='header-div'>Category</div>
                                        <select tabindex='1' className='select1' onChange={(e) => this.handleCategoryChange(e.target.value)} value={this.state.category}>
                                            <option value="" disabled selected></option>
                                            <option value="Top">TOP</option>
                                            <option value="Bottom">BOTTOM</option>
                                            <option value="Footwear">FOOTWEAR</option>
                                            <option value="Outerwear">OUTERWEAR</option>
                                            <option value="Accessories">ACCESSORIES</option>
                                        </select>
                                    </div>
                                    <div className="sell-input">
                                        <div  className='header-div'>Brand</div>
                                        <input tabindex='3' onChange={(e) => this.handleBrandChange(e.target.value)} value={this.state.brand} />
                                    </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className='sell-input'>
                                    <div className='header-div'>Size</div>
                                    <input tabindex='2' onChange={(e) => this.handleSizeChange(e.target.value)} value={this.state.size} />
                                </div>
                                <div className='sell-input'>
                                    <div className='header-div'>Name</div>
                                    <input  tabindex='4'onChange={(e) => this.handleNameChange(e.target.value)} value={this.state.name} />
                                </div>
                            </Col>
                           
                    </div>
                    </Row>
                        
                    <Row className='show-grid'>
                        <Col xs={12} md={6}>
                            <div className="sell-input">
                                <div className='header-div'>Price</div>
                                <input tabindex='5' onChange={(e) => this.handlePriceChange(e.target.value)} value={this.state.price} />
                            </div>
                            <div className='sell-input'>
                                <div className='header-div'>Image Url</div>
                                <input tabindex='7' onChange={(e) => this.handleImageURLChange(e.target.value)} value={this.state.imageURL} />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className='sell-input'>
                            <div className='header-div'>Description</div>
                            <textarea placeholder='Retail Price, Measurements, Link to Retail Page etc.' tabindex='6' onChange={(e) => this.handleDescriptionChange(e.target.value)} value={this.state.description} rows="4" cols="50" />
                            </div>
                            <div className='header-div'>Condition</div>
                            <select tabindex='8' className='select2'onChange={(e) => this.handleConditionChange(e.target.value)} value={this.state.condition} name='condition'>
                                <option value="" disabled selected></option>
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

                          <Dropzone 
                          onDrop={this.uploadFile.bind(this)}
                          />

                        </Col>
                        </Row>
                        <Row className='show-grid'>
                            <Col xs={12} md={6}>
                                <Button className='publish-btn' type='button' onClick={(e) => this.addListing(e)}>PUBLISH</Button>
                            </Col>
                        </Row>
                    </form>
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

export default connect(mapStateToProps)(Sell);