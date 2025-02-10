import type { AxiosInstance } from "axios";
import axios from "axios";
import { BackupManager } from "./backups";
import type { Carbon } from "./carbon";
import { FileManager } from "./file-manager";
import { MinecraftManager } from "./managers/minecraft-manager";
import { StatManager } from "./managers/stat-manager";
import { PortManager } from "./ports";
import { UserManager } from "./stars/users";
import type { JavaVersion, UpdateStarType } from "./types/create-star";
import type { CarbonStarType, StarResources } from "./types/star";

export class CarbonStar {
  // @ts-ignore
  carbonClient: Carbon;
  private axios: AxiosInstance;

  _id: string;
  ownerId: string;
  name: string;

  config: {
    type: string;
    version: string;
    javaVersion: JavaVersion;
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

  serverId: number;
  clientId: string;
  galaxyId: number;

  ip: string;
  subdomain?: string;

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

  createdAt: Date;
  lastBilled?: Date;

  billingCycle: "monthly" | "hourly";

  constructor(
    carbonClient: Carbon,
    carbonStar: CarbonStarType,
  ) {
    this.carbonClient = carbonClient;
    this.axios = axios.create(carbonClient.getAxios().defaults)
    this.axios.defaults.baseURL = `${this.axios.defaults.baseURL}/v1/stars/${carbonStar._id}`

    this._id = carbonStar._id;
    this.ownerId = carbonStar.ownerId;
    this.name = carbonStar.name;

    this.config = {
      type: carbonStar.config.type,
      version: carbonStar.config.version,
      javaVersion: carbonStar.config.javaVersion,
      customJar: carbonStar.config.customJar,
      startupCommand: carbonStar.config.startupCommand,
      maximumRamPercentage: carbonStar.config.maximumRamPercentage,
      additionalFlags: carbonStar.config.additionalFlags,
      minehutSupport: carbonStar.config.minehutSupport,
      overrideStartup: carbonStar.config.overrideStartup,
      automaticUpdating: carbonStar.config.automaticUpdating,
      simdOperations: carbonStar.config.simdOperations,
      removeUpdateWarnings: carbonStar.config.removeUpdateWarnings,
      malwareScan: carbonStar.config.malwareScan,
      acceptEula: carbonStar.config.acceptEula,
    };

    this.serverId = carbonStar.serverId;
    this.clientId = carbonStar.clientId;
    this.galaxyId = carbonStar.galaxyId;

    this.ip = carbonStar.ip;
    this.subdomain = carbonStar.subdomain;

    this.subUsers = carbonStar.subUsers;

    this.resources = {
      storage: carbonStar.resources.storage,
      memory: carbonStar.resources.memory,
      vCPU: carbonStar.resources.vCPU
    };

    this.suspended = carbonStar.suspended;

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

  get ports() {
    return new PortManager(this, this.axios);
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

  // async getWebsocketInfo() {
  //   return this.axios.get
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