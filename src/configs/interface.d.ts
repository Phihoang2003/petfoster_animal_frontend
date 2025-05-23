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
  fullName: string;
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
export interface IImagePost {
  id?: number;
  index: number;
  url: string;
  isVideo: boolean;
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
export interface ICommentRequest {
  uuid: string;
  comment: string;
  replyId: null | number;
}
export interface IMediasPrev {
  id?: number;
  link: string;
  data: File | null;
  isVideo: boolean;
}
export interface IMediadetected extends IMediasPrev {
  result: boolean;
  index: number;
}
export interface IPostRequest {
  title: string;
  medias: IMediasPrev[];
}

export interface IImagePost {
  id?: number;
  index: number;
  url: string;
  isVideo: boolean;
}
export interface IApiTakeAction {
  newArrivals: IProduct[];
}
export interface IDetailProduct {
  id: string;
  brand: string;
  discount: number;
  image: string;
  name: string;
  rating: number;
  images: string[];
  description: string;
  sizeAndPrice: SizeAndPrice[];
  suggestions: IProduct[];
  reviews: number;
  reviewItems: IReviewHasReplay[];
}
export interface IReview {
  id: number;
  avatar: string;
  name: string;
  displayName?: string;
  rating: number | null;
  sizes: number[] | null;
  comment: string;
  createAt: string;
}
export interface IReviewHasReplay extends IReview {
  replayItems: IReviewHasReplay[] | null;
}
export interface IReview {
  id: number;
  avatar: string;
  name: string;
  displayName?: string;
  rating: number | null;
  sizes: number[] | null;
  comment: string;
  createAt: string;
}
export interface INotificationKey {
  name: string;
  color: string;
}
export interface INotification {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp | Date;
  deleted: boolean;
  photourl: string;
  read: string[];
  target: string[];
  type: TypeNotification;
  link: string | null;
  public?: boolean;
  adminCotent?: string;
  options?: {
    start?: number | null;
    end?: number | null;
  };
  meta?: {
    keys?: INotificationKey[];
  };
  linkAdmin?: string;
}
export interface ICart {
  productId: string | number;
  image: string;
  name: string;
  brand: string;
  size: string | number;
  price: number;
  quantity: number;
  repo: number;
  checked?: boolean;
}

export interface IInitAppStoreState {
  numberCart: number;
  user: IUser | null;
  notifycation: INotifycationProps;
}
export interface IUser {
  id?: number;
  username: string;
  password: string;
  email?: string;
}
export interface IFormChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IAddress {
  province: string;
  district: string;
  ward: string;
  address: string;
}

export interface IInfoAddress {
  id: number;
  name: string;
  phone: string;
  address: IAddress;
  isDefault?: boolean;
  default?: boolean;
}

export interface IProvinceOutside {
  ProvinceID: number;
  ProvinceName: string;
  CountryID: number;
  Code: string;
  NameExtension: string[];
  IsEnable: number;
  RegionID: number;
  RegionCPN: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  CanUpdateCOD: boolean;
  Status: number;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}
export interface IDistrictOutside {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  IsEnable: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: any;
  UpdatedDate: string;
}

export interface IWardOutside {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
  IsEnable: number;
  CanUpdateCOD: boolean;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  SupportType: number;
  PickType: number;
  DeliverType: number;
  Status: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: any;
}

export interface ApiDivision<T> {
  code: string;
  message: string;
  data: T;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  size: number;
}
export interface IOrder {
  addressId: number;
  deliveryId: number;
  methodId: number;
  ship: number;
  orderItems: IOrderItem[];
}

export interface IPayment {
  orderId: number;
  amount: number; //2000000
  isPaid: boolean;
  payAt: string; // 20231115224608 <=> yyyyMMddHHmmss,
  transactionNumber: number; // 14182407
  paymentMethod: {
    id: number; // 1 là cash 2 là banking tương ứng trong bảng [payment_method],
    method: string; // ATM cách thức chuyển khoản
  };
}

export interface IOtherHistory {
  id: string | number;
  datePlace: string | number;
  total: number;
  state: "buy" | "cancel" | "Delivered"; // vd buy | cancel
  stateMessage: string; //vd: Delivery on October 1, 2023
  isTotalRate: boolean;
  products: ICart[];
}

export interface IOtherHistories {
  data: IOtherHistory[];
  pages: number; // số lượng trang ( vd: phân được 10 trang )
}

export interface IProductDetailOrders {
  productId: string | number;
  image: string;
  name: string;
  brand: string;
  size: string | number;
  price: number;
  quantity: number;
  repo: number;
  isRate?: boolean;
}

export interface IDetailOrder {
  id: number;
  placedDate: string;
  state: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  paymentMethod: string;
  deliveryMethod: string;
  products: IProductDetailOrders[];
  subTotal: number;
  shippingFee: number;
  total: number;
  expectedTime: string | null;
  username?: string;
  displayName?: string;
  print?: number;
  read?: boolean;
  token?: string;
}

export interface IRequestReview extends IDataReview {
  orderId: number;
  productId: string;
}
