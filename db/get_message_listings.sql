select image_url, message_id from messages
join listings on messages.listing_id = listings.listing_id