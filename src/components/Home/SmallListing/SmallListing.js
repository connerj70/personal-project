import React from 'react';
import { Card } from 'semantic-ui-react';
import './SmallListing.css';

const SmallListing = (props) => {
 
        const toDisplay = props.listings[0].map( (listing, i) => {
            return (
                <a href="#">
                <Card
                className='small-listing'
                image={listing.image_url}
                header={listing.listing_brand}
                meta={listing.listing_name}
                description={listing.listing_description}
                />
                </a>
            )
        });
    
    return (
       <div className='small-listing-container1'>
           {toDisplay}
       </div>
    )
}

export default SmallListing;