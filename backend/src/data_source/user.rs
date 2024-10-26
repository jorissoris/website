use crate::auth::role::MembershipStatus;
use crate::error::{AppResult, Error};
use crate::wire::user::{User, UserContent, UserId};
use sqlx::PgPool;
use std::ops::Deref;
use time::OffsetDateTime;
use uuid::Uuid;

pub(crate) struct UserStore {
    db: PgPool,
}

#[derive(Debug)]
struct PgUser {
    id: Uuid,
    first_name: String,
    last_name: String,
    roles: serde_json::Value,
    status: MembershipStatus,
    email: String,
    created: OffsetDateTime,
    updated: OffsetDateTime,
}

impl TryFrom<PgUser> for User {
    type Error = Error;

    fn try_from(pg: PgUser) -> Result<Self, Self::Error> {
        Ok(Self {
            id: pg.id.into(),
            created: pg.created,
            updated: pg.updated,
            content: UserContent {
                first_name: pg.first_name,
                last_name: pg.last_name,
                roles: serde_json::from_value(pg.roles)?,
                status: pg.status,
                email: pg.email,
            },
        })
    }
}

impl UserStore {
    pub async fn create(&self, new: UserContent) -> AppResult<User> {
        sqlx::query_as!(
            PgUser,
            r#"
            INSERT INTO "user"
            (id,
             first_name,
             last_name,
             roles,
             status,
             email,
             created,
             updated)
            VALUES ($1,
                    $2,
                    $3,
                    $4,
                    $5::membership_status,
                    $6,
                    now(),
                    now())
            RETURNING
                id,
                first_name,
                last_name,
                roles,
                status AS "status: MembershipStatus",
                email,
                created,
                updated
            "#,
            Uuid::now_v7(),
            new.first_name,
            new.last_name,
            serde_json::to_value(&new.roles)?,
            new.status as MembershipStatus,
            new.email,
        )
        .fetch_one(&self.db)
        .await?
        .try_into()
    }

    pub async fn get(&self, id: &UserId) -> AppResult<User> {
        sqlx::query_as!(
            PgUser,
            r#"
            SELECT 
                id,
                first_name,
                last_name,
                roles,
                status AS "status: MembershipStatus",
                email,
                created,
                updated
            FROM "user" WHERE id = $1
            "#,
            id.deref()
        )
        .fetch_one(&self.db)
        .await?
        .try_into()
    }
}
