
import type { AxiosInstance } from "axios";
import type {CarbonStarStats} from "../types/stats";
import type {CarbonStar} from "../carbon-star";
import type {CarbonPluginCommandResponse} from "../carbon-plugin/types";

export class MinecraftManager {
  private star: CarbonStar;
  private axios: AxiosInstance;

  constructor(star: CarbonStar, axios: AxiosInstance) {
    this.star = star;
    this.axios = axios;
  }

  getJoinableDomain() {
    const port = this.star.ports.find(port => port.internalType === "minecraft")?.publishedPort ?? this.star.getPublishedPort(25565);
    return `${this.star.ip}:${port}`
  }

  async getCommands(query: string) {
    return this.axios.get<CarbonPluginCommandResponse>("/commands", {
      params: {
        query,
      },
    }).then((res) => res.data);
  }

  // TODO: Make this ping the `/` endpoint
  async isCarbonPluginInstalled() {
    try {
      await this.axios.get("/commands?query=carbon");
      return true;
    } catch (e) {
      return false;
    }
  }
}
