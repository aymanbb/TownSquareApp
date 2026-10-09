import { IUserRepository } from "../repository/auth.repository";
import { User } from "../types";
import { RegisterInput } from "../types/auth.registerschema";
import { EmailTakenError, UsernameTakenError } from "./auth.errors";

export class AuthService {
    constructor(private readonly users: IUserRepository) {}

    async register(input: RegisterInput): Promise<User> {
        if (await this.users.findByUsername(input.username)) throw new UsernameTakenError();
        if (await this.users.findByEmail(input.email)) throw new EmailTakenError();

        const record = await this.users.create({
            username: input.username,
            email: input.email,
            displayName: input.username,
            createdAt: new Date().toISOString(),
            passwordHash: input.password, // no hashing right now
        })

        const { passwordHash: _omit, ...user } = record;
        return user; // return the user excluding the password
    }
}