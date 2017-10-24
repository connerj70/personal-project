insert into listings(category, listing_brand, price, description, size, listing_name, condition, user_id, image_url)
values($1, $2, $3, $4, $5, $6, $7, $8, $9);
select * from listings order by listing_id desc
limit 1;