import React from 'react';
import { Card } from 'semantic-ui-react';

const SmallListing = (props) => {
    return (
        <Card
        image={props.image}
        header={props.header}
        meta={props.meta}
        description={props.description}
        />
    )
}

export default SmallListing;