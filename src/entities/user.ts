import {Job} from "./job";

export class User {
  id: number;
  email: string;
  password: string;
  hiredJobs: Job[];
  isConsumer: boolean;
  isPro: boolean;
}
