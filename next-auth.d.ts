// nextauth user interface modification
import { JWT } from "next-auth/jwt"

declare module "next-auth" { 
    interface User {
        id: string;
        email: string;
        name: string;
        bio: string;
        isAdmin: boolean;
        emailVerified: boolean;
    }

    interface Session {
        user: User;
    }

    interface Profile {
        id: string;
        email: string;
        name: string;
        bio: string;
        isAdmin: boolean;
        emailVerified: boolean;
    }

    interface JWT {
        id: string;
        email: string;
        name: string;
        bio: string;
        isAdmin: boolean;
        emailVerified: boolean;
    }




}