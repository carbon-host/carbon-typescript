export type CarbonStarType = {
  _id: string;
  containerId: string;
  ownerId: string;

  starName: string;
  starType: string;
  starVersion: string;
  javaVersion: "21" | "17" | "11" | "8";

  storageId: string;
  galaxyId: string;

  domain: Domain;

  subUsers: SubUser[];
  apiKeys: string[];

  storageLimit: number;
  memoryLimit: number;
  cpuLimit: number;
  ephemeral: boolean;

  environmentVariables: Map<string, string>;

  lastBilled: Date;
  createdAt: Date;
}

type Domain = {
  galaxyIp: string;
  galaxyDomain: string;
  port: number;

  url?: string;
  zoneId?: string;
  recordId?: string;
}

type SubUser = {
  userId: string;
  email: string;

  permissions: Permissions;
  createdAt: number;
}

type Permissions = {
  power: {
    read: boolean;
    start: boolean;
    stop: boolean;
    restart: boolean;
    kill: boolean;
  };

  console: {
    read: boolean;
    write: boolean;
    executeCommand: boolean;
  };

  files: {
    read: boolean;
    write: boolean;
    delete: boolean;
    archive: boolean;
    paths?: string[];
  };
}

export type StarStatus = {
  status: string;
}