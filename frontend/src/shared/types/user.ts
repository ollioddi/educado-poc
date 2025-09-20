import type { AuthRole } from "../hooks/use-auth";

export interface User {
    email: string;
    role: AuthRole;
    isVerified: boolean;
}