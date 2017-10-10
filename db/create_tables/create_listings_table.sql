CREATE TABLE listings(listing_id serial primary key, listing_brand varchar(250) not null, listing_name varchar(100) not null,
size varchar(6) not null, price varchar(100) not null, description text, condition int, user_id int not null references users(user_id)
)