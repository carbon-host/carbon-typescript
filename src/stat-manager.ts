import type { CarbonStar } from "@/carbon-star";
import type { CarbonStarStats } from "@/types/stats";
import type { AxiosInstance } from "axios";

export class StatManager {
  private star: CarbonStar;
  private axios: AxiosInstance;

  constructor(star: CarbonStar, axios: AxiosInstance) {
    this.star = star;
    this.axios = axios;
  }

  async getRecentStats(): Promise<CarbonStarStats> {
    return this.axios
      .get<CarbonStarStats>("/stats/recent")
      .then((res) => res.data);
  }
}
