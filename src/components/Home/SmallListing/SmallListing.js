import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './SmallListing.css';

const SmallListing = (props) => {
 
        const toDisplay = props.listings[0].map( (listing, i) => {
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
    
    return (
       <div className='small-listing-container1'>
           {toDisplay}
       </div>
    )
}

export default SmallListing;