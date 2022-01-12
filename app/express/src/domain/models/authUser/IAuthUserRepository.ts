import { AuthUser } from "./AuthUser";

export interface IAuthUserRepository {
  saveNew: (authUser: AuthUser) => Promise<void>;
}