import { Document, ObjectId, Types } from "mongoose"
import { RegionsEnum } from "../enums/regions"

export interface IUser extends Document {
  username: string
  password: string
  role: "defense" | "attack"
  organization: Types.ObjectId
  region?: RegionsEnum
  interceptedMissiles: Types.ObjectId[]
  resources: { name: string; amount: number }[]
}
