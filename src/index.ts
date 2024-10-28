import type {AxiosInstance} from "axios";
import axios from "axios";
import type {CarbonStarType} from "@/types/star.ts";
import {CarbonStar} from "@/carbon-star.ts";

export class CarbonClient {
  private axios: AxiosInstance

  constructor(apiKey: string) {
    this.axios = axios.create({
      baseURL: "https://api.carbon.host",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
    });
  }

  private async fetchStars() {
    return this.axios.get<CarbonStarType[]>("/v1/stars").then(res => res.data)
  }

  async getStars(): Promise<CarbonStar[]> {
    const stars = await this.fetchStars();
    return stars.map(star => new CarbonStar(this, star));
  }
}