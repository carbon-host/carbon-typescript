import { FileManager } from "@/file-manager";
import type { Carbon } from "@/index.ts";
import { StatManager } from "@/stat-manager";
import type { CarbonStarType, StarStatus, PortMapping, Protocol } from "@/types/star.ts";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class CarbonStar {
  private carbonClient: Carbon;
  private axios: AxiosInstance;

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

  constructor(
    carbonClient: Carbon,
    apiKey: string,
    carbonStar: CarbonStarType,
  ) {
    this.carbonClient = carbonClient;
    this.axios = axios.create({
      baseURL: `https://${carbonStar?.ip}/v1/stars/${carbonStar._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    this._id = carbonStar._id;
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

  get files() {
    return new FileManager(this, axios);
  }

  get stats() {
    return new StatManager(this, axios);
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