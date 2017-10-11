CREATE TABLE messages (message_id serial primary key, 
sender_id int not null references users(user_id), 
reciever_id int not null references users(user_id),
message_content text not null, 
message_category varchar(50)
)