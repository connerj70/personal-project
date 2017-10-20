select * from listings
where user_id = $1
order by listing_id desc