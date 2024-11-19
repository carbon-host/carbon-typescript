export interface UserInfo {
  clerkId: string;
  stripeId: string | null;

  plan: "pro" | "enterprise" | null;
  credits: number;
  redeemedGifts: string[]; // Gift IDs

  limits: {
    storage: number;
    memory: number;
    cpu: number;
    starCount: number;
    starPortLimit: number;
  };

  createdAt: number; // Unix timestamp
}