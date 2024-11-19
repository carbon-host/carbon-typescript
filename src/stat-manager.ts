
import type { AxiosInstance } from "axios";
import type {CarbonStar} from "./carbon-star";
import type {CarbonStarStats} from "./types/stats";

export class StatManager {
  // @ts-ignore
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
