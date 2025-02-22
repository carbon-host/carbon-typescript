import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../carbon-star";
import type { Port, SFTPAccountDetails, SFTPDetails } from "./types";

export class NetworkManager {
    private star: CarbonStar;
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

    async getPorts() {
        return this.axios.get<Port[]>("/network/ports").then(res => res.data)
    }

    async deletePort(portId: string) {
        return this.axios.delete(`/network/ports/${portId}`).then(res => res.data)
    }

    async createPort(notes: string) {
        return this.axios.post<Port>("/network/ports", { notes }).then(res => res.data)
    }

    async getSFTPDetails() {
        return this.axios.get<SFTPDetails>("/network/sftp").then(res => res.data)
    }

    async resetSFTPPassword() {
        return this.axios.post<SFTPAccountDetails>("/network/sftp/reset-password").then(res => res.data)
    }

}