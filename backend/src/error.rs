use argon2::password_hash;
use axum::extract::rejection::JsonRejection;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::Json;
use serde::{Serialize, Serializer};
use std::env;
use tracing::{error, trace, warn};
use uuid::Uuid;
use validator::ValidationErrors;

pub(crate) type AppResult<T> = Result<T, Error>;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Error reading environment variable {0}")]
    Env(#[from] env::VarError),
    #[error("Database error {0}")]
    Sqlx(sqlx::Error),
    #[error("Not found")]
    NotFound,
    #[error("JSON error {0}")]
    SerdeJson(#[from] serde_json::error::Error),
    #[error("Bad request {0}")]
    BadRequest(&'static str),
    #[error("Unauthorized")]
    Unauthorized,
    #[error("JSON error {0}")]
    AxumJson(#[from] JsonRejection),
    #[error("Validation failure: {0}")]
    Validation(#[from] ValidationErrors),
    #[error("Password hashing error {0}")]
    Argon2(password_hash::Error),
}
impl From<sqlx::Error> for Error {
    fn from(value: sqlx::Error) -> Self {
        match value {
            sqlx::Error::RowNotFound => Error::NotFound,
            _ => Error::Sqlx(value),
        }
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        let reference = Uuid::now_v7();

        match self {
            Error::Env(err) => {
                error!(%reference, "Environment variable error: {err}");
                Problem {
                    message: "internal server error".to_string(),
                    status: StatusCode::INTERNAL_SERVER_ERROR,
                    reference,
                }
            }
            Error::Sqlx(err) => {
                error!(%reference, "Database error: {err}");
                Problem {
                    message: "Database error".to_string(),
                    status: StatusCode::INTERNAL_SERVER_ERROR,
                    reference,
                }
            }
            Error::SerdeJson(err) => {
                error!(%reference, "Json error: {err}");
                Problem {
                    message: "Json error".to_string(),
                    status: StatusCode::INTERNAL_SERVER_ERROR,
                    reference,
                }
            }
            Error::BadRequest(err) => {
                trace!(%reference, "Bad request: {err}");
                Problem {
                    message: format!("Bad request: {err}"),
                    status: StatusCode::BAD_REQUEST,
                    reference,
                }
            }
            Error::Unauthorized => {
                trace!(%reference, "Unauthorized");
                Problem {
                    message: "Unauthorized".to_string(),
                    status: StatusCode::UNAUTHORIZED,
                    reference,
                }
            }
            Error::AxumJson(err) => {
                trace!(%reference, "Json error: {err}");
                Problem {
                    message: format!("Json error: {err}"),
                    status: StatusCode::BAD_REQUEST,
                    reference,
                }
            }
            Error::Validation(err) => {
                trace!(%reference, "Validation error: {err}");
                Problem {
                    message: format!("Validation error: {err}"),
                    status: StatusCode::BAD_REQUEST,
                    reference,
                }
            }
            Error::NotFound => {
                trace!(%reference, "Not found");
                Problem {
                    message: "Not found".to_string(),
                    status: StatusCode::NOT_FOUND,
                    reference,
                }
            }
            Error::Argon2(err) => {
                warn!(%reference, "Password hashing error: {err}");
                Problem {
                    message: "Password hashing error".to_string(),
                    status: StatusCode::INTERNAL_SERVER_ERROR,
                    reference,
                }
            }
        }
        .into_response()
    }
}

#[derive(Debug, Serialize)]
struct Problem {
    message: String,
    #[serde(serialize_with = "serialize_status_code")]
    status: StatusCode,
    reference: Uuid,
}

impl IntoResponse for Problem {
    fn into_response(self) -> Response {
        (self.status, Json(self)).into_response()
    }
}

pub fn serialize_status_code<S>(code: &StatusCode, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.serialize_u16(code.as_u16())
}
