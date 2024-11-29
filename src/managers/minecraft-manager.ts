
import type { AxiosInstance } from "axios";
import type {CarbonPluginInfo, CarbonPluginPlayersResponse, CarbonStarStats} from "../carbon-plugin/types";
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
    return this.axios.get<CarbonPluginCommandResponse>("/carbon-plugin/commands", {
      params: {
        query,
      },
    }).then((res) => res.data);
  }

  async getInfo() {
    return this.axios.get<CarbonPluginInfo>("/carbon-plugin").then((res) => res.data);
  }

  async getPlayers(limit?: number, offset?: number) {
    return this.axios.get<CarbonPluginPlayersResponse>("/carbon-plugin/players", {
      params: {
        limit,
        offset,
      },
    }).then((res) => res.data);
  }

  async installCarbonPlugin() {
    return this.axios.post("/carbon-plugin/install").then((res) => res.data);
  }
}
