import type { JavaVersion } from "./create-star";

export type CarbonSubdomainType = {
  _id: string;
  url: string
}

export type CarbonStarType = {
  _id: string;
  ownerId: string;
  name: string;

  config: {
    type: string;
    version: string;
    javaVersion: JavaVersion
    customJar?: string;
    startupCommand?: string;
    maximumRamPercentage: number;
    additionalFlags: "None" | "Aikar's Flags" | "Velocity Flags";
    minehutSupport: "None" | "Velocity" | "Waterfall" | "Bukkit";
    overrideStartup: boolean;
    automaticUpdating: boolean;
    simdOperations: boolean;
    removeUpdateWarnings: boolean;
    malwareScan: boolean;
    acceptEula: boolean;
  };
  
  clientId: string;
  serverId: number;
  galaxyId: number;

  ip: string;
  subdomain?: CarbonSubdomainType;

  subUsers: {
    _id: string;
    clerkId: string;
    email: string;
    minecraftUUID?: string;
  }[];

  resources: {
    storage: number;
    memory: number;
    vCPU: number;
  };

  suspended: boolean;

  lastBilled?: Date;
  billingCycle: "monthly" | "hourly";

  createdAt: Date;
}

export type StarStatus = {
  status: string;
}

export type StarResources = {
  currentState: string;
  isSuspended: boolean;
  resources: {
    memoryBytes: number;  
    cpuAbsolute: number;
    diskBytes: number;
    networkRxBytes: number;
    networkTxBytes: number;
    uptime: number;
  };
};
