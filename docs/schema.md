# Schema Information

## users
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
username          | string    | not null
email             | string    | not null
password_digest   | string    | not null
session_token     | string    | not null

## networks
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
full_name         | string    | not null
abbreviation      | string    | not null

## shows
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
network_id        | integer   | not null, foreign key (references networks)
title             | string    | not null
description       | text      | not null
image_url         | string    |
maze_id           | integer   | 3rd-Party facing foreign key

## episodes
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
show_id           | integer   | not null, foreign key (references shows)
title             | string    | not null
season            | integer   | not null
position          | integer   | not null
airdate           | date/time | not null
description       | text      | not null
maze_id           | integer   | 3rd-Party facing foreign key

## posts
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users)
episode_id        | integer   | not null, foreign key (references users)
title             | string    | not null
content           | text      | not null

## comments
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users)
commentable_type  | string    | not null (polymorphic)
commentable_id    | integer   | not null, foreign key (references table from commentable type)
content           | text      | not null

## ratings
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users)
episode_id        | integer   | not null, foreign key (references episodes)
score             | integer   | not null

## endorsements
column name         | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users)
endorseable_type  | string    | not null (polymorphic)
endorseable_id    | integer   | not null, foreign key (references table from endorseable type)

## watchlist_items
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users)
show_id           | integer   | not null, foreign key (references shows)
ord               | float     | default value (0)
status            | string    | not null, default value (watching)
