use crate::auth::session::Session;
use crate::error::Error;
use crate::wire::user::UserCredentials;
use crate::wire::ValidatedJson;
use axum::response::IntoResponse;
use axum_extra::extract::CookieJar;
use sqlx::PgPool;

pub(crate) mod role;
pub(crate) mod session;

const COOKIE_NAME: &str = "SESSION";

pub async fn login(
    db: PgPool,
    jar: CookieJar,
    ValidatedJson(credentials): ValidatedJson<UserCredentials>,
) -> Result<impl IntoResponse, Error> {
    let session = Session::new(credentials, &db).await?;
    Ok(jar.add(session.into_cookie()))
}
