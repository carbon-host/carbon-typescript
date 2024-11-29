import type { AxiosInstance } from "axios";
import type {APIKeyType} from "../types/api-keys";
import type {Invite} from "./types";

export class InviteManager {
    private axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async getInvite(inviteId: string) {
        return this.axios.get<Invite>(`/v1/invites/${inviteId}`).then(res => res.data)
    }

    async acceptInvite(inviteId: string) {
        return this.axios.post<{success: boolean}>(`/v1/invites/${inviteId}/accept`).then(res => res.data)
    }

}