import type {AxiosInstance} from "axios";
import type {APIKeyType, VerifyAPIKeyResponseType} from "../types/api-keys";

export class APIKeyManager {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAPIKey(apiKeyId: string) {
    return this.axios.get<APIKeyType>(`/v1/api-keys/${apiKeyId}`).then(res => res.data)
  }

  async getAPIKeys() {
    return this.axios.get<APIKeyType[]>("/v1/api-keys").then(res => res.data)
  }

  async verifyAPIKey(apiKey: string) {
    return this.axios.post<VerifyAPIKeyResponseType>("/v1/api-keys/verify", {token: apiKey}).then(res => res.data)
  }

  async deleteAPIKey(apiKeyId: string) {
    return this.axios.delete<{ message: string }>(`/v1/api-keys/${apiKeyId}`).then(res => res.data)
  }
}
