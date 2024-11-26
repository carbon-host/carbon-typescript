
import type { AxiosInstance } from "axios";
import axios from "axios";
import type {Carbon} from "./carbon";
import type {CarbonStarType, PortMapping, Protocol, StarStatus} from "./types/star";
import {StatManager} from "./managers/stat-manager";
import {MinecraftManager} from "./managers/minecraft-manager";
import {FileManager} from "./file-manager";

export class CarbonStar {
  // @ts-ignore
  private carbonClient: Carbon;
  private axios: AxiosInstance;

  _id: string;
  serviceName: string;
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
    this.serviceName = carbonStar.serviceName;
    this.ownerId = carbonStar.ownerId;
    this.name = carbonStar.name;
    this.type = carbonStar.type;
    this.version = carbonStar.version;
    this.javaVersion = carbonStar.javaVersion;
    this.storageId = carbonStar.storageId;
    this.ip = carbonStar.ip;
    this.galaxyURL = carbonStar.galaxyURL;

    this.resources = {
      storage: carbonStar.resources.storage,
      memory: carbonStar.resources.memory,
      vCPU: carbonStar.resources.vCPU
    };

    this.ports = carbonStar.ports;
    this.createdAt = carbonStar.createdAt;
    this.lastBilled = carbonStar.lastBilled;
  }

  getPublishedPort(targetPort: number, protocol: Protocol = 'tcp'): number | undefined {
    const portMapping = this.ports.find(
      port => port.targetPort === targetPort && port.protocols.includes(protocol)
    );
    return portMapping?.publishedPort;
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

  async getStatus(): Promise<StarStatus> {
    return this.axios.get<StarStatus>("/status").then((res) => res.data);
  }

  async getUptime() {
    // EX:
    // {
    //   "uptime": "65852.76s"
    // }
    return this.axios.get<{ uptime: string }>("/uptime").then((res) => res.data)
      .then((res) => res.uptime);
  }

  async setPower(action: "start" | "stop" | "restart" | "kill") {
    return this.carbonClient.getAxios().put(`/v1/stars/${this._id}/power`, { action }).then((res) => res.data);
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