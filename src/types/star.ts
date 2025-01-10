export type CarbonStarType = {
  _id: string;
  ownerId: string;

  name: string;
  type: string;
  customJar?: string;
  version: string;
  javaVersion: "21" | "17" | "11" | "8";
  
  clientId: string;
  serverId: number;
  galaxyId: string;

  ip: string;
  subdomain?: string;

  resources: {
      storage: number;
      memory: number;
      vCPU: number;
  };


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
