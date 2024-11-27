import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../carbon-star";
import type {Backup} from "./types";

export class BackupManager {
    private star: CarbonStar;
    private axios: AxiosInstance;

    constructor(star: CarbonStar, axios: AxiosInstance) {
        this.star = star;
        this.axios = axios;
    }

    // create-backup
    // get-backup
    // restore-backup
    // get-backups

    async getBackups() {
        return this.axios.get<Backup[]>("/backups", {
            params: {
                starId: this.star._id
            }
        }).then(res => res.data)
    }

    async getBackup(backupId: string) {
        return this.axios.get<Backup>(`/backups/${backupId}`).then(res => res.data)
    }

    async createBackup(paths?: string[]) {
        return this.axios.post<{ status: string, message: string }>("/backups", {
            paths,
        }).then(res => res.data);
    }

    async restoreBackup(backupId: string) {
        return this.axios.put<{ status: string, message: string }>(`/backups/${backupId}/restore`).then(res => res.data);
    }

}