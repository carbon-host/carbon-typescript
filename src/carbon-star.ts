import type { AxiosInstance } from "axios";
import axios from "axios";
import { BackupManager } from "./backups";
import type { Carbon } from "./carbon";
import { FileManager } from "./file-manager";
import { MinecraftManager } from "./managers/minecraft-manager";
import { StatManager } from "./managers/stat-manager";
import { UserManager } from "./stars/users";
import type { UpdateStarType } from "./types/create-star";
import type { CarbonStarType, StarResources, StarStatus } from "./types/star";

export class CarbonStar {
  // @ts-ignore
  carbonClient: Carbon;
  private axios: AxiosInstance;

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

  createdAt: Date;
  lastBilled?: Date;

  billingCycle: "monthly" | "hourly";

  constructor(
    carbonClient: Carbon,
    // apiKey: string,
    carbonStar: CarbonStarType,
  ) {
    this.carbonClient = carbonClient;
    this.axios = carbonClient.getAxios()
    this.axios.defaults.baseURL = `${this.axios.defaults.baseURL}/v1/stars/${carbonStar._id}`

    this._id = carbonStar._id;
    this.ownerId = carbonStar.ownerId;

    this.name = carbonStar.name;
    this.type = carbonStar.type;
    this.customJar = carbonStar.customJar;
    this.version = carbonStar.version;
    this.javaVersion = carbonStar.javaVersion;

    this.serverId = carbonStar.serverId;
    this.galaxyId = carbonStar.galaxyId;

    this.ip = carbonStar.ip;
    this.galaxyId = carbonStar.galaxyId;

    this.resources = {
      storage: carbonStar.resources.storage,
      memory: carbonStar.resources.memory,
      vCPU: carbonStar.resources.vCPU
    };

    this.createdAt = carbonStar.createdAt;
    this.lastBilled = carbonStar.lastBilled;

    this.billingCycle = carbonStar.billingCycle;
  }

  get users() {
    return new UserManager(this, this.axios)
  }

  get minecraft() {
    return new MinecraftManager(this, this.axios);
  }

  get files() {
    return new FileManager(this, this.axios);
  }

  get stats() {
    return new StatManager(this, this.axios);
  }

  get backups() {
    return new BackupManager(this, this.axios, this.carbonClient.getAxios());
  }

  async delete() {
    return this.carbonClient.getAxios().delete(`/v1/stars/${this._id}`).then((res) => res.data);
  }

  async update(request: UpdateStarType) {
    return this.carbonClient.getAxios().patch(`/v1/stars/${this._id}`, request).then((res) => res.data);
  }

  async rename(name: string) {
    return this.carbonClient.getAxios().put(`/v1/stars/${this._id}/name`, {
      name,
    }).then((res) => res.data);
  }

  async getLogs() {
    return this.axios.get<{ logs: string }>("/logs").then((res) => res.data);
  }

  // async getStatus(): Promise<StarStatus> {
  //   return this.axios.get<StarStatus>("/status").then((res) => res.data);
  // }

  // async getUptime() {
  //   return this.axios.get<{ uptime: string }>("/uptime").then((res) => res.data)
  //     .then((res) => res.uptime);
  // }


  async getResources() {
    return this.axios.get<StarResources>("/resources").then((res) => res.data); 
  }

  async setPower(action: "start" | "stop" | "restart" | "kill") {
    return this.axios.put("/power", { action }).then((res) => res.data);
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