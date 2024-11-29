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
      .post<{ success: boolean }>(`/v1/stars/${this.star._id}/invites`, {
        email,
      })
      .then((res) => res.data);
  }

  async getInvites() {
    return this.controllerAxios
      .get<{ invites: Invite[] }>(`/v1/stars/${this.star._id}/invites`)
      .then((res) => res.data.invites);
  }

  async cancelInvite(inviteId: string) {
    return this.controllerAxios
      .delete(`/v1/stars/${this.star._id}/invites/${inviteId}`)
      .then((res) => res.data);
  }
}
