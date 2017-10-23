
select * from listings
where UPPER(listing_name) like UPPER('%' || $1 || '%') or listing_brand like UPPER('%' || $1 || '%')
order by listing_id desc
limit 40
offset $2