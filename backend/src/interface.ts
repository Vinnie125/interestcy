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
  name: string;
  description: string;
  location: string;
  members: number;
}

export interface POST{
  name: string;
  content: string;
  url: string;
}