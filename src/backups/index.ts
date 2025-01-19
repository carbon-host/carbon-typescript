import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../carbon-star";
import type {Backup, CreateBackup} from "./types";

export class BackupManager {
    private star: CarbonStar;
    private axios: AxiosInstance;
    private controllerAxios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance, controllerAxios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
        this.controllerAxios = controllerAxios;
    }

    async getBackups() {
        return this.controllerAxios.get<Backup[]>(`/v1/stars/${this.star._id}/backups`).then(res => res.data)
    }

    async getBackup(backupId: string) {
        return this.controllerAxios.get<Backup>(`/v1/stars/${this.star._id}/backups/${backupId}`).then(res => res.data) 
    }

    async deleteBackup(backupId: string) {
        return this.controllerAxios.delete(`/v1/stars/${this.star._id}/backups/${backupId}`).then(res => res.data)
    }

    async downloadBackup(backupId: string) {
        return this.controllerAxios.get<{ url: string }>(`/v1/stars/${this.star._id}/backups/${backupId}/download`).then(res => res.data)
    }

    async createBackup(backup: CreateBackup) {
        return this.axios.post<Backup>("/backups", backup).then(res => res.data);
    }

    async restoreBackup(backupId: string) {
        return this.axios.post<{ status: string, message: string }>(`/backups/${backupId}/restore`).then(res => res.data);
    }

}