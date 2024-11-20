import type {UserInfo} from "./user";

export type CreateAPIKeyType = {
  name: string;
  description?: string;
  type: "api-key" | "account-key";
}

export type CreateAPIKeyResponseType = {
  identifier: string;
  token: string;
}

export type APIKeyType = {
  _id: string;
  userId: string;

  name: string;
  description?: string;
  type: "api-key" | "account-key";

  expiresAt: Date;
  createdAt: Date;
}

/*
            user: ZodUser,
            apiKey: z.object({
              _id: z.string(),
              userId: z.string(),
              expiresAt: z.number(),
              createdAt: z.number(),
            }),
 */

export type VerifyAPIKeyResponseType = {
  user: UserInfo,
  clerkId: string
}