export type CarbonStarType = {
  _id: string;
  ownerId: string;
  name: string;
  type: string;
  version: string;
  javaVersion: "21" | "17" | "11" | "8";
  storageId: string;
  ip: string;
  galaxyURL: string;
  resources: {
    storage: number;
    memory: number;
    vCPU: number;
  };
  ports: PortMapping[];
  createdAt: Date;
  lastBilled?: Date;
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
  internalType?: "minecraft" | "carbon-plugin";
  name?: string;
}

/**
 * Extends RequestedPortInfo to include the published (external) port
 * @interface PortMapping
 * @extends {RequestedPortInfo}
 */
export interface PortMapping extends RequestedPortInfo {
  publishedPort: number;
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