import type {CarbonClient} from "@/index.ts";
import type {CarbonStarType} from "@/types/star.ts";

export class CarbonStar {
  private carbonClient: CarbonClient;

  _id: string;
  containerId: string;
  ownerId: string;

  starName: string;
  starType: string;
  starVersion: string;
  javaVersion: "21" | "17" | "11" | "8";

  storageId: string;
  galaxyId: string;

  domain: {
    galaxyIp: string;
    galaxyDomain: string;
    port: number;

    url?: string;
    zoneId?: string;
    recordId?: string;
  }

  subUsers: {
    userId: string;
    email: string;

    permissions: {
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
    };
    createdAt: number;
  }[];
  apiKeys: string[];

  storageLimit: number;
  memoryLimit: number;
  cpuLimit: number;
  ephemeral: boolean;

  environmentVariables: Map<string, string>;

  lastBilled: Date;
  createdAt: Date;

  constructor(carbonClient: CarbonClient, carbonStar: CarbonStarType) {
    this.carbonClient = carbonClient;

    this._id = carbonStar._id;
    this.containerId = carbonStar.containerId;
    this.ownerId = carbonStar.ownerId;

    this.starName = carbonStar.starName;
    this.starType = carbonStar.starType;
    this.starVersion = carbonStar.starVersion;
    this.javaVersion = carbonStar.javaVersion;

    this.storageId = carbonStar.storageId;
    this.galaxyId = carbonStar.galaxyId;

    this.domain = carbonStar.domain;

    this.subUsers = carbonStar.subUsers;
    this.apiKeys = carbonStar.apiKeys;

    this.storageLimit = carbonStar.storageLimit;
    this.memoryLimit = carbonStar.memoryLimit;
    this.cpuLimit = carbonStar.cpuLimit;
    this.ephemeral = carbonStar.ephemeral;

    this.environmentVariables = carbonStar.environmentVariables;

    this.lastBilled = carbonStar.lastBilled;
    this.createdAt = carbonStar.createdAt;
  }

  getDomain() {
    if (this.domain.url) return this.domain.url;
    return `${this.domain.galaxyIp}:${this.domain.port}`;
  }
}
