import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './SmallListing.css';

const SmallListing = (props) => {
 
        const toDisplay = props.listings[props.listings.length - 1].map( (listing, i) => {
            const linkURL = `/biglisting/${listing.listing_id}`
            const price = (
                <div>
                    {"$" + listing.price}
                </div>
            )
            return (
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
            )
        });

        let filteredToDisplay = toDisplay.filter( obj => {
            if(obj.props.children.props.header.toLowerCase().indexOf(props.searchTerm.toLowerCase()) !== -1 || obj.props.children.props.meta.toLowerCase().indexOf(props.searchTerm.toLowerCase()) !== -1) {
                return obj;
            }
        })

    console.log(toDisplay);
    return (
       <div className='small-listing-container1'>
           {filteredToDisplay}
       </div>
    )
}

export default SmallListing;