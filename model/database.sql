create table users(
        "id" serial primary key,
    "password" varchar(255) not null,
    "username" varchar(255) not null,
    "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null 
);

create table new(
   "id" serial primary key,
   "category_id" integer not null,
   "title" varchar(255) not null,
   "look" integer default 0 not null,
   "telegram" text,
   "facebook" text,
   "okrug" text,
   "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null 
);
create table category(
   "id" serial primary key,
   "title" varchar(255) not null,
   "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null 
);


create table new_action(
   "id" serial primary key,
   "image" text,
   "desc" text not null, 
   "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null 
);
create table company(
   "id" serial primary key,
   "image" text,
   "phone1" text,
   "phone2" text,
   "instagram" text,
   "facebook" text,
   "telegram" text,
   "youtobe" text,
   "app_store" text,
   "play_market" text,
   "twitter" text,
   "ok" text,
   "email" text,
   "time_create" timestamp default current_timestamp not null,
    "time_update" timestamp default current_timestamp not null 
)

-- node js da CRUD qilib ber req res hammasini postgre sql ulaganman u db.jsda

