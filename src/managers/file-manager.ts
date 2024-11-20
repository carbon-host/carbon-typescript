
import type { AxiosInstance } from "axios";
import type {CarbonStar} from "../carbon-star";

export class FileManager {
    // @ts-ignore
    private star: CarbonStar;
    // @ts-ignore
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

}