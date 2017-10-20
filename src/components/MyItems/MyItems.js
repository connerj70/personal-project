import React , { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { getUserListings, deleteUserListing } from '../../ducks/users';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MyItems extends Component {


    componentDidMount() {
       
        this.props.getUserListings(this.props.user.user_id)
    }


    render() {

        
       

        const toDisplay = this.props.userListings.length ? this.props.userListings[this.props.userListings.length - 1].map( (listing, i) => {
            const linkURL = `/biglisting/${listing.listing_id}`
            const price = (
                <div>
                    {"$" + listing.price}
                </div>
            )

            const button1 = (  
                <div className='remove-button'>
                    <Button onClick={() => this.props.deleteUserListing(this.props.user.user_id, listing.listing_id) } bsStyle='danger'>DELETE</Button>
                </div>
                )
            
            return (
                <div className='mygrails-holder'>
                    <Link to={linkURL}>
                    <Card
                    className='small-listing'
                    image={listing.image_url}
                    header={listing.listing_brand}
                    meta={listing.listing_name}
                    description={listing.listing_description}
                    extra={price}
                    />
                    </Link>
                    <div className='button-holder'>
                        {button1}
                    </div>
                </div>
            )
        }) : null;
    

        if(!this.props.userListings) {
            return (
                <div>Loading...</div>
            )
        }
        console.log(this.props.userListings)
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col>
                        MyItems Page
                        {toDisplay ? toDisplay : <div>Loading...</div>}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({ userListings, user }) {
    return {
        userListings,
        user
    }
}

export default connect(mapStateToProps, { getUserListings, deleteUserListing })(MyItems);