import {Job} from "../../entities/job";
import {Pro} from "../../entities/pro";
import {Customer} from "../../entities/customer";
import {User} from "../../entities/user";
import {Bid} from "../../entities/bid";

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
  {id: 1, name: "Toilet Repair", category: "Bathroom", description: "Clean it please.", location: "La Grande", customer: CUSTOMERS[0], pro: PROS[0], acceptedBidId: 9},
  {id: 2, name: "Cell Phone Repair", category: "Cellphone", description: "Fix it please.", location: "Nevada", customer: CUSTOMERS[0], pro: PROS[1], acceptedBidId: 10},
  {id: 3, name: "Internet Down", category: "Tech", description: "Make it work.", location: "Provo", customer: CUSTOMERS[0], pro: null, acceptedBidId: null},
  {id: 4, name: "Gardening Mayhem", category: "Garden", description: "Gnomes are everywhere!", location: "Provo", customer: CUSTOMERS[0], pro: null, acceptedBidId: null},
  {id: 5, name: "Fuel Explosion", category: "Fuel", description: "I lit a match. Everything went boom.", location: "Provo", customer: CUSTOMERS[0], pro: null, acceptedBidId: null},
  {id: 6, name: "Out of Gas", category: "Transportation", description: "What do I do if my car won't start?", location: "Provo", customer: CUSTOMERS[0], pro: null, acceptedBidId: null},
  {id: 7, name: "Indigestion", category: "Food", description: "Jack in the Box...", location: "Rexburg", customer: CUSTOMERS[0], pro: null, acceptedBidId: null}
];

export const BIDS: Bid[] = [
  {id: 1, pro: PROS[0], job: JOBS[2], amount: 19.99, open: true, won: false},
  {id: 2, pro: PROS[1], job: JOBS[2], amount: 14.99, open: true, won: false},
  {id: 3, pro: PROS[2], job: JOBS[2], amount: 20, open: true, won: false},
  {id: 4, pro: PROS[0], job: JOBS[3], amount: 4.99, open: true, won: false},
  {id: 5, pro: PROS[1], job: JOBS[3], amount: 49.50, open: true, won: false},
  {id: 6, pro: PROS[2], job: JOBS[3], amount: 10, open: true, won: false},
  {id: 7, pro: PROS[0], job: JOBS[4], amount: 30, open: true, won: false},
  {id: 8, pro: PROS[2], job: JOBS[4], amount: 30, open: true, won: false},
  {id: 9, pro: PROS[1], job: JOBS[0], amount: .99, open: false, won: true},
  {id: 10, pro: PROS[2], job: JOBS[1], amount: 0, open: false, won: true}
]

export const USERS: User[] = [
  {id: 1, username: "andrew", password: "password", isCustomer: true, isPro: false, hiredJobs: JOBS},
  {id: 2, username: "justin", password: "password", isCustomer: false, isPro: true, hiredJobs: null},
  {id: 3, username: "dylan", password: "password", isCustomer: true, isPro: true, hiredJobs: null}
];
