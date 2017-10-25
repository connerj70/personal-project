delete from messages
where message_id = $1;
select * from messages
where reciever_id = $2
order by message_id desc;