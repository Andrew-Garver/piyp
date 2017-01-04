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
  {id: 2, name: "Cell Phone Repair", category: "Cellphone", description: "Fix it please.", location: "Nevada", customer: CUSTOMERS[0], pro: PROS[1]},
  {id: 3, name: "Internet Down", category: "Tech", description: "Make it work.", location: "Provo", customer: CUSTOMERS[0], pro: null},
  {id: 4, name: "Gardening Mayhem", category: "Garden", description: "Gnomes are everywhere!", location: "Provo", customer: CUSTOMERS[0], pro: null},
  {id: 5, name: "Fuel Explosion", category: "Fuel", description: "I lit a match. Everything went boom.", location: "Provo", customer: CUSTOMERS[0], pro: null},
  {id: 6, name: "Out of Gas", category: "Transportation", description: "What do I do if my car won't start?", location: "Provo", customer: CUSTOMERS[0], pro: null},
  {id: 7, name: "Indigestion", category: "Food", description: "Jack in the Box...", location: "Rexburg", customer: CUSTOMERS[0], pro: null}
];

export const USERS: User[] = [
  {id: 1, username: "andrew", password: "password", hiredJobs: JOBS},
  {id: 2, username: "justin", password: "password", hiredJobs: null},
  {id: 3, username: "dylan", password: "password", hiredJobs: null}
];
