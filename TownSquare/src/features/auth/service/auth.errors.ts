export class UsernameTakenError extends Error { message = "Username is already taken"; }
export class EmailTakenError extends Error { message = "Email is already registered"; }