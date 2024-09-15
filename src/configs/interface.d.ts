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
export interface IFeedBackRequest {
  fullname: string;
  phone: string;
  email: string;
  message: string;
}
export interface IDataReview {
  star: number;
  content: string;
}
export interface IProduct {
  id: string | number;
  name: string;
  image: string;
  brand: string;
  size: string[] | number[];
  rating: number;
  price: number;
  oldPrice: number;
  discount: number;
}
export interface IRequestFilterPet {
  name?: string;
  page?: string;
  typeName?: string;
  age?: string;
  colors?: string;
  gender?: boolean;
  sort?: string;
}
export interface IBaseResponse<T> {
  message: string;
  status: number;
  errors: boolean | {};
  data: T;
}
export interface PagiantionResponse<T> {
  data: T[];
  pages: number;
}
export interface ISignDataResponse {
  message: string;
  token: string;
  errors: UserFormType | null;
}
export interface IProfile {
  id: string;
  username: string;
  fullname: string;
  birthday: string; // Cứ trả về Date trong java bình thường
  gender: boolean;
  phone: string;
  address: string;
  email: string;
  avatar: string;
  role: string;
  displayName: string;
  provider: string;
  createAt: string;
}
export interface IRequestFilterPet {
  name?: string;
  page?: string;
  typeName?: string;
  age?: string;
  colors?: string;
  gender?: boolean;
  sort?: string;
}
export interface ISearchItem {
  id: number | string;
  title: string;
}
export interface IPetAttribute {
  colors: IFilter[];
  states: IFilter[];
  breeds: IFilter[];
  typies: IFilter[];
}
export interface ISearchItem {
  id: number | string;
  title: string;
}
export interface IParamsApiPostPage {
  page?: number;
  search?: string;
  username?: string;
  type?: string;
}

export interface IPostDetail
  extends Omit<IPost, "thumbnail" | "containVideo" | "thumbnail"> {
  images: IImagePost[];
  owner: boolean;
  edit: boolean;
  createdAt: string;
}
export interface IComment {
  id: number;
  user: IProfile;
  comment: string;
  createAt: string;
  likes: number;
  isLike: boolean;
  children: IComment[];
  owner: boolean;
}
