import type { AxiosInstance } from "axios";
import type { CarbonStar } from "../../carbon-star";
import type {Invite} from "../../invites/types";

export class UserManager {
  private star: CarbonStar;
  private axios: AxiosInstance;

  constructor(star: CarbonStar, axios: AxiosInstance) {
    this.star = star;
    this.axios = axios;
  }

  async inviteUser(email: string) {
    return this.axios
      .post<{ success: boolean }>("/users/invites", {
        email,
      })
      .then((res) => res.data);
  }

  async getInvites() {
    return this.axios
      .get<{ invites: Invite[] }>("/users/invites")
      .then((res) => res.data.invites);
  }

  async cancelInvite(inviteId: string) {
    return this.axios
      .delete(`/users/invites/${inviteId}`)
      .then((res) => res.data);
  }
}
