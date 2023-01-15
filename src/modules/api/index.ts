import axios from "axios";
import { keycloak } from "../../utils/auth";

keycloak.onTokenExpired = async () => {
  await keycloak.updateToken(60)
}

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    Authorization: `Bearer ${keycloak.token}`
  }
});

export default api;