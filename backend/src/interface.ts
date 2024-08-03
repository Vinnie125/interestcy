/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface Userdata {
  username: string;
  passwd: string;
}

export interface Circle{
  id:number;
  name: string;
  description: string;
  location: string;
  members: number;
}

export interface POST{
  id:number;
  name: string;
  content: string;
  url: string;
}