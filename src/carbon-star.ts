import type { AxiosInstance } from "axios";
import axios from "axios";
import type {Carbon} from "./carbon";
import type {CarbonStarType, PortMapping, Protocol, StarStatus} from "./types/star";
import {StatManager} from "./managers/stat-manager";
import {MinecraftManager} from "./managers/minecraft-manager";
import {FileManager} from "./file-manager";
import type {UpdateStarType} from "./types/create-star";
import {BackupManager} from "./backups";
import {UserManager} from "./stars/users";
import type {AdvancedConfig} from "./types/create-star";

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

  containerId: string;
  galaxyId: string;
  storageId: string;

  ip: string;
  galaxyURL: string;

  subUsers: {
    userId: string;
    email: string;
    minecraftUUID?: string;
    createdAt: Date;
  }[];

  resources: {
    storage: number;
    memory: number;
    vCPU: number;
  };

  ports: PortMapping[];
  createdAt: Date;
  lastBilled?: Date;

  billingCycle: "monthly" | "hourly";
  advanced: AdvancedConfig;

  constructor(
    carbonClient: Carbon,
    apiKey: string,
    carbonStar: CarbonStarType,
  ) {
    this.carbonClient = carbonClient;
    this.axios = axios.create({
      baseURL: `https://${carbonStar?.galaxyURL}/v1/stars/${carbonStar._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    this._id = carbonStar._id;
    this.ownerId = carbonStar.ownerId;
    this.name = carbonStar.name;
    this.type = carbonStar.type;
    this.customJar = carbonStar.customJar;
    this.version = carbonStar.version;
    this.javaVersion = carbonStar.javaVersion;

    this.containerId = carbonStar.containerId;
    this.galaxyId = carbonStar.galaxyId;
    this.storageId = carbonStar.storageId;

    this.ip = carbonStar.ip;
    this.galaxyURL = carbonStar.galaxyURL;

    this.subUsers = carbonStar.subUsers;

    this.resources = {
      storage: carbonStar.resources.storage,
      memory: carbonStar.resources.memory,
      vCPU: carbonStar.resources.vCPU
    };

    this.ports = carbonStar.ports;
    this.createdAt = carbonStar.createdAt;
    this.lastBilled = carbonStar.lastBilled;

    this.billingCycle = carbonStar.billingCycle;
    this.advanced = carbonStar.advanced;
  }

  getPublishedPort(targetPort: number, protocol: Protocol = 'tcp'): number | undefined {
    const portMapping = this.ports.find(
      port => port.targetPort === targetPort && port.protocols.includes(protocol)
    );
    return portMapping?.publishedPort;
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

  async getStatus(): Promise<StarStatus> {
    return this.axios.get<StarStatus>("/status").then((res) => res.data);
  }

  async getUptime() {
    return this.axios.get<{ uptime: string }>("/uptime").then((res) => res.data)
      .then((res) => res.uptime);
  }

  async setPower(action: "start" | "stop" | "restart" | "kill") {
    return this.axios.put("/v1/power", { action }).then((res) => res.data);
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