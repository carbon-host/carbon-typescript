import { z } from "zod";

export type Protocol = "tcp" | "udp" | "sctp";

export interface PortMapping {
  name?: string;
  targetPort: number;
  publishedPort: number;
  protocols: Protocol[];
  internalType?: "minecraft" | "carbon-plugin";
}

export type CarbonStarType = {
  _id: string;
  ownerId: string;

  name: string;
  type: string;
  customJar?: string;
  version: string;
  javaVersion: "21" | "17" | "11" | "8";

  containerId: string;
  galaxyId: string;
  storageId: string;

  ip: string;
  galaxyURL: string;

  subUsers: {
    userId: string;
    email: string;
    minecraftUUID?: string;
    createdAt: Date;
  }[];

  ports: PortMapping[];
  resources: {
    storage: number;
    memory: number;
    vCPU: number;
  };

  advanced: {
    useAikarFlags: boolean;
    plugins?: string[];
    mods?: string[];
    
    world: {
      url?: string;
      forceOnStart: boolean;
      allowNether: boolean;
      spawnAnimals: boolean;
      spawnMonsters: boolean;
      spawnNPCs: boolean;
      spawnProtection?: number;
      generateStructures: boolean;
      maxWorldSize?: number;
    };

    whitelist?: {
      enabled: boolean;
      players: string[];
    };

    resourcePack?: {
      url?: string;
      sha1?: string;
      enforce: boolean;
    };

    commandBlocks: boolean;
    hardcore: boolean;
    pvp: boolean;
    onlineMode: boolean;
    seed?: string;
    defaultGameMode: "survival" | "creative" | "adventure" | "spectator";
    motd?: string;
    difficulty?: "peaceful" | "easy" | "normal" | "hard";
    icon?: string;
    maxPlayers?: number;
    timezone: string;
  };

  lastBilled?: Date;
  billingCycle: "monthly" | "hourly";
  createdAt: Date;
}

export type StarStatus = {
  status: string;
}