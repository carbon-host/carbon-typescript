export type CarbonStarType = {
  _id: string;
  ownerId: string;

  name: string;
  type: string;
  customJar?: string;
  version: string;
  javaVersion: "21" | "17" | "11" | "8";
  
  serverId: string;
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