import axios from 'axios';
axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return error.response;
  }
);
export default class AxiosBase {
  getAssociateSubscription(options: { token: string; id: string }) {
    const token = options.token;
    const hash = options.id;
    return axios({
      method: 'get',
      url: `/list-associate-subscriptions?hash=${hash}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
