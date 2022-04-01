import axios from "axios";

export const authClient = axios.create({
  baseURL: "http://qkapi-1130225346.ap-southeast-1.elb.amazonaws.com",
  withCredentials: true,
});
