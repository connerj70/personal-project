import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGrails } from '../../ducks/users';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

class MyGrails extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getGrails(this.props.user.user_id)
    }

    render() {
        
        const listingsIds = _.map(this.props.userGrails[0], 'listing_id');
        console.log(listingsIds);
        console.log(this.props.listings[0]);

        var listingsToRender = listingsIds.map( id => {
           return this.props.listings[0].map( listing => {
                if(listing.listing_id == id) {
                    return listing
                }
                
            })
        });


        listingsToRender = listingsToRender.map( listing => {
            return (
                _.remove(listing, function(value) {
                    return value != undefined;
                })
            )
        })

        listingsToRender = _.flattenDeep(listingsToRender);
        

        console.log(listingsToRender);

        return (
            <div>
                 MyGrails page
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={12}>
                        {listingsIds}
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
    userGrails: state.userGrails,
    listings: state.listings
   } 
}

export default connect(mapStateToProps, {getGrails})(MyGrails);