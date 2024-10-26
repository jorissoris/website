create type membership_status as enum ('pending', 'member', 'extraordinary', 'non_member');

create table "user"
(
    id         uuid primary key,
    first_name text              not null,
    last_name  text              not null,
    roles      jsonb             not null,
    status     membership_status not null,
    email      text              not null unique,
    pw_hash    text,
    created    timestamptz       not null,
    updated    timestamptz       not null
);

create table session
(
    cookie_value text primary key,
    user_id      uuid        not null
        constraint session_user_fk
            references "user",
    expiration   timestamptz not null
);

