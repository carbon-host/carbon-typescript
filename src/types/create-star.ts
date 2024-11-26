import type {RequestedPortInfo} from "./star.ts";

type starType = "VANILLA" | "PAPER" | "PUFFERFISH" | "PURPUR" | "FOLIA" | "VELOCITY" | "WATERFALL" | "FORGE" | "FABRIC" | "CUSTOM";

export type CreateStarType = {
  name: string;
  type: starType
  customJar?: string;
  version?: string;
  javaVersion: "8" | "11" | "17" | "21";
  ports: RequestedPortInfo[];
  resources: {
    memory: number;
  };
}

export type UpdateStarType = {
  type: starType
  customJar?: string;
  version?: string;
  javaVersion: "8" | "11" | "17" | "21";
  ports: RequestedPortInfo[];
  resources: {
    memory: number;
  };
}