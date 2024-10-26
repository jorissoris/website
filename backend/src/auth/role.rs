use serde::{Deserialize, Serialize};

pub(crate) type Roles = Vec<Role>;

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
#[non_exhaustive]
pub(crate) enum Role {
    Admin,

    Treasurer,
    Secretary,
    Chair,
    ViceChair,
    ClimbingCommissar,

    ActivityCommissionMember,
    // TODO extend
}

#[derive(sqlx::Type, Serialize, Deserialize, Debug)]
#[sqlx(type_name = "membership_status", rename_all = "snake_case")]
#[serde(rename_all = "camelCase")]
pub(crate) enum MembershipStatus {
    Pending,
    Member,
    Extraordinary,
    NonMember,
}
