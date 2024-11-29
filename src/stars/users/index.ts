import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../../carbon-star";
import type {Invite} from "../../invites/types";

export class UserManager {
  private star: CarbonStar;
  private axios: AxiosInstance;
  private controllerAxios: AxiosInstance;

  constructor(star: CarbonStar, axios: AxiosInstance) {
    this.star = star;
    this.axios = axios;
    this.controllerAxios = star.carbonClient.getAxios()
  }

  async inviteUser(email: string) {
    return this.controllerAxios
      .post<{ success: boolean }>(`/v1/stars/${this.star._id}/users/invites`, {
        email,
      })
      .then((res) => res.data);
  }

  async getInvites() {
    return this.controllerAxios
      .get<Invite[]>(`/v1/stars/${this.star._id}/users/invites`)
      .then((res) => res.data);
  }

  async cancelInvite(inviteId: string) {
    return this.controllerAxios
      .delete(`/v1/stars/${this.star._id}/users/invites/${inviteId}`)
      .then((res) => res.data);
  }

  async removeUser(userId: string) {
    return this.controllerAxios
      .delete(`/v1/stars/${this.star._id}/users/${userId}`)
      .then((res) => res.data);
  }
}
