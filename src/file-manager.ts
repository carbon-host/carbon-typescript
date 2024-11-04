import type { CarbonStar } from "@/carbon-star";
import type { AxiosInstance } from "axios";

export class FileManager {
    private star: CarbonStar;
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

}