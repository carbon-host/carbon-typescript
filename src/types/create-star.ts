/*
const createStarSchema = z.object({
  name: z.string()
    .min(3)
    .max(24)
    .regex(/^[a-zA-Z0-9-_]+$/),
  type: z.enum(["VANILLA", "PAPER", "PUFFERFISH", "PURPUR", "FOLIA", "VELOCITY", "WATERFALL", "FORGE", "FABRIC", "CUSTOM"]).default("PAPER"),
  customJar: z.string().optional(), // Only for custom type
  version: z.string(),
  javaVersion: z.enum(["8", "11", "17", "21"]).default("21"),
  ports: z.array(z.object({
    name: z.string().optional(),
    targetPort: z.number().int().min(1).max(65535),
    protocols: z.array(z.enum(["tcp", "udp", "sctp"])).default(["tcp"]),
  })).default(DEFAULT_PORTS),

  resources: z.object({
    storage: z.number().int().min(1024).max(102400).default(1024 * 10),
    memory: z.number().int().min(512).max(16384).default(4096),
    vCPU: z.number().min(1).max(4).default(2)
  })
});
 */

import type {PortMapping, RequestedPortInfo} from "@/types/star.ts";

export type CreateStarType = {
  name: string;
  type: "VANILLA" | "PAPER" | "PUFFERFISH" | "PURPUR" | "FOLIA" | "VELOCITY" | "WATERFALL" | "FORGE" | "FABRIC" | "CUSTOM";
  customJar?: string;
  version: string;
  javaVersion: "8" | "11" | "17" | "21";
  ports: RequestedPortInfo[];
  resources: {
    storage: number;
    memory: number;
    vCPU: number;
  };
}