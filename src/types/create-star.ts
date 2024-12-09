import type {RequestedPortInfo} from "./star.ts";

export type StarType = "VANILLA" | "PAPER" | "PUFFERFISH" | "PURPUR" | "FOLIA" | "VELOCITY" | "WATERFALL" | "FORGE" | "FABRIC" | "CUSTOM";

export type WorldConfig = {
  url?: string;
  forceOnStart?: boolean;
  allowNether?: boolean;
  spawnAnimals?: boolean;
  spawnMonsters?: boolean;
  spawnNPCs?: boolean;
  spawnProtection?: number;
  generateStructures?: boolean;
  maxWorldSize?: number;
  viewDistance?: number;
  simulationDistance?: number;
}

export type WhitelistConfig = {
  enabled?: boolean;
  players?: string[];
}

export type ResourcePackConfig = {
  url?: string;
  sha1?: string;
  enforce?: boolean;
}

export type AdvancedConfig = {
  billingCycle?: "monthly" | "hourly";
  useAikarFlags?: boolean;
  plugins?: string[];
  mods?: string[];
  world?: WorldConfig;
  whitelist?: WhitelistConfig;
  resourcePack?: ResourcePackConfig;
  commandBlocks?: boolean;
  hardcore?: boolean;
  pvp?: boolean;
  onlineMode?: boolean;
  seed?: string;
  defaultGameMode?: "survival" | "creative" | "adventure" | "spectator";
  motd?: string;
  difficulty?: "peaceful" | "easy" | "normal" | "hard";
  icon?: string;
  maxPlayers?: number;
  timezone?: string;
}

export type CreateStarType = {
  eula?: boolean;
  name: string;
  type: StarType;
  customJar?: string;
  version?: string;
  javaVersion: "8" | "11" | "17" | "21";
  resources: {
    memory: number;
  };
  advanced?: AdvancedConfig;
}

export type UpdateStarType = Partial<CreateStarType>;