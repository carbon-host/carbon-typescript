import type {AxiosInstance} from "axios";
import type {CarbonStarType} from "@/types/star.ts";
import {CarbonStar} from "@/carbon-star.ts";
import axios from "axios";
import type {CreateStarType} from "@/types/create-star.ts";

export default class Carbon {
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
}