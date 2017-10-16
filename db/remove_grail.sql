delete from user_grails
where listing_id = $1;
select * from user_grails
where user_id = $2;