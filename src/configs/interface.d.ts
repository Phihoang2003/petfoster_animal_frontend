export interface IImpact {
  image: string;
  quantity: string;
  title: string;
  prefix?: string;
}
export interface IPet {
  id: string | number;
  name: string;
  image: string;
  breed: string;
  type: string;
  size: string;
  sex: string;
  fostered: string | number;
  description: string;
  fosterDate: number;
  like: boolean;
  adoptAt?: string | null;
}
export interface IPost {
  id: number | string;
  title: string;
  thumbnail: string;
  // contents: string;
  containVideo?: boolean;
  isLike: boolean;
  likes: number;
  comments: number;
  user: IProfile;
}
export interface IPet {
  id: string | number;
  name: string;
  image: string;
  breed: string;
  type: string;
  size: string;
  sex: string;
  fostered: string | number;
  description: string;
  fosterDate: number;
  like: boolean;
  adoptAt?: string | null;
}
export interface IFilter {
  id: string | number[];
  name: string;
}
