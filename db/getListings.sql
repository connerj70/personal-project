select * from listings
where listing_brand like '%' || $1 || '%'
order by listing_id desc
limit 40
offset $2