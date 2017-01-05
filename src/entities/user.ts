import {Job} from "./job";

export class User {
  id: number;
  username: string;
  password: string;
  hiredJobs: Job[];
  isCustomer: boolean;
  isPro: boolean;
}
