use crate::error::Error;
use axum::extract::rejection::JsonRejection;
use axum::extract::{FromRequest, Request};
use axum::{async_trait, Json};
use serde::de::DeserializeOwned;
use validator::Validate;

pub mod user;

#[derive(Debug, Clone)]
pub(crate) struct ValidatedJson<T>(pub T);

#[async_trait]
impl<T, S> FromRequest<S> for ValidatedJson<T>
where
    T: DeserializeOwned + Validate,
    S: Send + Sync,
    Json<T>: FromRequest<S, Rejection = JsonRejection>,
{
    type Rejection = Error;

    async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection> {
        let Json(value) = Json::<T>::from_request(req, state).await?;
        value.validate()?;
        Ok(ValidatedJson(value))
    }
}
