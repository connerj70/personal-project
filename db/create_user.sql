insert into users(username, email, auth_id, image)
values($1, $2, $3, $4)
RETURNING *;