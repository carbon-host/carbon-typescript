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

    // set base url to /v1/stars/{starId}/users
    this.controllerAxios.defaults.baseURL = `${this.controllerAxios.defaults.baseURL}/v1/stars/${star._id}/users`
  }

  async inviteUser(email: string) {
    return this.controllerAxios
      .post<{ success: boolean }>("/invites", {
        email,
      })
      .then((res) => res.data);
  }

  async getInvites() {
    return this.controllerAxios
      .get<{ invites: Invite[] }>("/invites")
      .then((res) => res.data.invites);
  }

  async cancelInvite(inviteId: string) {
    return this.controllerAxios
      .delete(`/invites/${inviteId}`)
      .then((res) => res.data);
  }
}
