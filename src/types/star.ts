export type CarbonStarType = {
  _id: string;
  serviceName: string;
  ownerId: string;
  name: string;
  type: string;
  customJar?: string;
  version: string;
  javaVersion: "21" | "17" | "11" | "8";
  nodeId: string;
  storageId: string;
  ip: string;
  galaxyURL: string;
  
  subUsers: {
    userId: string;
    minecraftUUID?: string;
    email: string;
    createdAt: Date;
  }[];

  resources: {
    storage: number;
    memory: number;
    vCPU: number;
  };

  ports: PortMapping[];

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

/** Valid protocol types for Docker port mappings */
export type Protocol = "tcp" | "udp" | "sctp";

/**
 * Represents requested port configuration for a service
 * @interface RequestedPortInfo
 */
export interface RequestedPortInfo {
  protocols: Protocol[];
  targetPort: number;
  name?: string;
}

/**
 * Extends RequestedPortInfo to include the published (external) port and internal type
 * @interface PortMapping
 * @extends {RequestedPortInfo}
 */
export interface PortMapping extends RequestedPortInfo {
  publishedPort: number;
  internalType?: "minecraft" | "carbon-plugin";
}

/**
 * Defines resource limits for Docker services
 * @interface ResourceLimits
 */
export interface ResourceLimits {
  MemoryBytes: number;  // Memory limit in bytes
  NanoCPUs: number;     // CPU limit in nano CPUs (1 CPU = 1e9)
}

export type StarStatus = {
  status: string;
}