import { FileManager } from "@/file-manager";
import type { Carbon } from "@/index.ts";
import { StatManager } from "@/stat-manager";
import type { CarbonStarType, StarStatus } from "@/types/star.ts";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class CarbonStar {
  private carbonClient: Carbon;
  private axios: AxiosInstance;

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
  };

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

  constructor(
    carbonClient: Carbon,
    apiKey: string,
    carbonStar: CarbonStarType,
  ) {
    this.carbonClient = carbonClient;
    this.axios = axios.create({
      baseURL: `https://${carbonStar.domain.galaxyDomain}/v1/stars/${carbonStar._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

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

  get files() {
    return new FileManager(this, axios)
  }

  get stats(): StatManager {
    return new StatManager(this, axios)
  }

  async getStatus(): Promise<StarStatus> {
    return this.axios.get<StarStatus>("/status").then((res) => res.data);
  }

  async getUptime() {
    return this.axios.get<{ uptime: number }>("/uptime").then((res) => res.data);
  }

  async setPower(action: "start" | "stop" | "restart" | "kill") {
    return this.axios.post("/power", { action }).then((res) => res.data);
  }

  async executeCommand(command: string) {
    return this.axios
      .post("/command", {
        command,
      })
      .then((res) => res.data);
  }

  async uploadFile(file: File, path: string) {
    const formData = new FormData();
    formData.append("file", file);

    return this.axios
      .post<{ status: string; filePath: string }>("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        params: {
          path,
        },
      })
      .then((res) => res.data);
  }
}
