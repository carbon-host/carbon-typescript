import type {RequestedPortInfo} from "./star.ts";

export type CreateStarType = {
  name: string;
  type: "VANILLA" | "PAPER" | "PUFFERFISH" | "PURPUR" | "FOLIA" | "VELOCITY" | "WATERFALL" | "FORGE" | "FABRIC" | "CUSTOM";
  customJar?: string;
  version?: string;
  javaVersion: "8" | "11" | "17" | "21";
  ports: RequestedPortInfo[];
  resources: {
    // storage: number;
    // memory: number;
    vCPU: number;
  };
}