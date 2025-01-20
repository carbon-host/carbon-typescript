import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../carbon-star";
import type { Port } from "./types";

export class PortManager {
    private star: CarbonStar;
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

    async getPorts() {
        return this.axios.get<Port[]>("/ports").then(res => res.data)
    }

    async deletePort(portId: string) {
        return this.axios.delete(`/ports/${portId}`).then(res => res.data)
    }

    async createPort(notes: string) {
        return this.axios.post<Port>("/ports", { notes }).then(res => res.data)
    }

}