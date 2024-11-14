import { IUser } from "./interfaces/user"

export enum DataStatus {
  LOADING = "LOADING",
  SUCCSES = "SUCCSES",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface userState {
  error: String | null
  status: DataStatus
  user: null | IUser
}
