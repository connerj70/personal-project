CREATE TABLE listing_images(listing_image_id serial primary key, listing_id int not null references listings(listing_id), 
image_url text not null)