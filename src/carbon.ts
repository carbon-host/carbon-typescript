import type {AxiosInstance} from "axios";
import axios from "axios";
import type {CarbonStarType} from "./types/star";
import {CarbonStar} from "./carbon-star";
import type {CreateStarType} from "./types/create-star";
import type {UserInfo} from "./types/user";
import type {APIKeyType, CreateAPIKeyResponseType, CreateAPIKeyType, VerifyAPIKeyResponseType} from "./types/api-keys";
import {APIKeyManager} from "./managers/api-key-manager";

export class Carbon {
  private axios: AxiosInstance
  private apiKey: string;

  constructor({ apiKey, url }: { apiKey: string, url?: string }) {
    this.apiKey = apiKey;
    this.axios = axios.create({
      baseURL: url || "https://api.carbon.host",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
    });
  }

  async getMe() {
    return this.axios.get<UserInfo>("/v1/me").then(res => res.data)
  }

  async createAPIKey({ name, description, type }: CreateAPIKeyType) {
    return this.axios.post<CreateAPIKeyResponseType>("/v1/api-keys", {
      name,
      description,
      type,
    }).then(res => res.data)
  }

  get apiKeys() {
    return new APIKeyManager(this.axios);
  }

  private async fetchStars() {
    return this.axios.get<CarbonStarType[]>("/v1/stars").then(res => res.data)
  }

  private async fetchStar(id: string) {
    return this.axios.get<CarbonStarType>(`/v1/stars/${id}`).then(res => res.data)
  }

  async getStars(): Promise<CarbonStar[]> {
    const stars = await this.fetchStars();
    return stars.map(star => new CarbonStar(this, this.apiKey, star));
  }

  async getStar(id: string): Promise<CarbonStar> {
    const star = await this.fetchStar(id);
    return new CarbonStar(this, this.apiKey, star);
  }

  async createStar({ name, type, customJar, version, javaVersion, ports, resources }: CreateStarType) {
    return this.axios.post("/v1/stars", {
      name,
      type,
      customJar,
      version,
      javaVersion,
      ports,
      resources,
    }).then(res => res.data)
      .catch(err => {
        console.log("Error creating star", err.data)
        throw err
      })
  }

  getAxios() {
    return this.axios;
  }
}