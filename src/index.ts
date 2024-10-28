import type {AxiosInstance} from "axios";
import axios from "axios";
import type {CarbonStarType} from "@/types/star.ts";
import {CarbonStar} from "@/carbon-star.ts";

export class Carbon {
  private axios: AxiosInstance

  constructor({ apiKey, url }: { apiKey: string, url?: string }) {
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
    return stars.map(star => new CarbonStar(this, star));
  }

  async getStar(id: string): Promise<CarbonStar> {
    const star = await this.fetchStar(id);
    return new CarbonStar(this, star);
  }
}