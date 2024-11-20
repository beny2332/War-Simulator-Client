import { RegionsEnum } from "../enums/regions"

export interface Missile {
  _id: string;
  name: string;
  speed: number;
  price: number;
}

export interface Resource {
  missile: Missile;
  _id: string;
  name: string;
  amount: number;
}

export interface IUser {
  id?: string
  username: string
  password: string
  role: "defense" | "attack"
  organization: string
  region?: RegionsEnum
  interceptedMissiles: string[]
  resources: Resource[]
}
