import React from 'react';
import { Card } from 'semantic-ui-react';

const SmallListing = (props) => {
 
        const toDisplay = props.listings[0].map( (listing, i) => {
            return (
                <div key={i}>
                <Card
                image={props.listingImages[i]}
                header={listing.listing_brand}
                meta={listing.listing_name}
                description={listing.listing_description}
                />
                </div>
            )
        });
    
    return (
       <div>
           {toDisplay}
       </div>
    )
}

export default SmallListing;