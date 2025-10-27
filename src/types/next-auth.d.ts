import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName: string;
      firstName: string;
      countryCode: string;
      email: string;
      roleId: number;
      stateId: string;
    };
    accessToken: string;
  }

  interface User {
    id?: string;
    _id?: string;
    fullName?: string;
    firstName?: string;
    countryCode?: string;
    email?: string;
    roleId?: number;
    stateId?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName: string;
    firstName: string;
    countryCode: string;
    email: string;
    roleId: number;
    stateId: string;
    accessToken: string;
  }
}
