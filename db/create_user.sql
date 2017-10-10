insert into users(username, email, auth_id)
values($1, $2, $3)
RETURNING *;