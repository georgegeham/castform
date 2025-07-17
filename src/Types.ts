export type PlayInputs = {
  Director: string;
  Decor: string;
  Lightning: string;
  Costumes: string;
  Music: string;
  Date: string;
};
export interface ActorInputs {
  name: string;
  mobile: string;
  email: string;
  bdate: string;
  dateOfEntrance: string;
  noPlays: string;
  ImageURL: FileList;
}
export interface ACTOR {
  name: string;
  mobile: string;
  email: string;
  bdate: string;
  DateOfEntrance: string;
  NoPlays: string;
  ImgURL: string;
  Rewards: Reward[];
  Plays: { pname: string; ID: number }[];
}
export interface Tournament {
  ID: number;
  tname: string;
}
export interface Selected {
  value: number;
  label: string;
}
export interface Reward {
  ID: number;
  rname: string;
}

export interface Play {
  ID: number;
  pname: string;
  pdate: Date;
  decor?: string;
  director_name?: string;
  lightning?: string;
  costumes?: string;
  music?: string;
  Tournaments: Tournament[];
  Rewards?: Reward[];
}
