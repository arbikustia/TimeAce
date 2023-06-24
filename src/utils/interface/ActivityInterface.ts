import { activityType } from "../type/ActyvityType";

export interface activityInterface {
  userId: string;
  _id: string;
  roomName: string;
  activity?: activityType[];
}
