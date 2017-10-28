select image_url, message_id, listing_id from messages
join listings on messages.listing_id = listings.listing_id