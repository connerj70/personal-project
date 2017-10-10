CREATE TABLE users(user_id serial primary key, 
username varchar(50) not null, 
email varchar(250) not null, 
country varchar(250), 
venmo_username varchar(250),
auth_id text
); 