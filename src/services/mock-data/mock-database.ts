import {Job} from "../../entities/job";
import {Pro} from "../../entities/pro";
import {Customer} from "../../entities/customer";
import {User} from "../../entities/user";

export const CUSTOMERS: Customer[] = [
  {id: 1, name: "Andrew", location: "La Grande"},
  {id: 2, name: "Justin", location: "Washington"},
  {id: 3, name: "Dylan", location: "Las Vegas"}
];

export const PROS: Pro[] = [
  {id: 1, name: "Bob", location: "Eugene"},
  {id: 2, name: "Frank", location: "North Dakota"},
  {id: 3, name: "Thomas", location: "Provo"}
];

export const JOBS: Job[] = [
  {id: 1, name: "Toilet Repair", category: "Bathroom", description: "Clean it please.", location: "La Grande", customer: CUSTOMERS[0], pro: PROS[0]},
  {id: 1, name: "Cell Phone Repair", category: "Cellphone", description: "Fix it please.", location: "Nevada", customer: CUSTOMERS[0], pro: null},
  {id: 1, name: "Internet Down", category: "Tech", description: "Make it work.", location: "Provo", customer: CUSTOMERS[0], pro: null}
];

export const USERS: User[] = [
  {id: 1, username: "andrew", password: "password", hiredJobs: JOBS},
  {id: 2, username: "justin", password: "password", hiredJobs: null},
  {id: 3, username: "dylan", password: "password", hiredJobs: null}
];
