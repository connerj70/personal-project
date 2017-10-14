select * from messages
where reciever_id = $1
order by message_id desc