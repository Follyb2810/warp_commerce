export interface CategoryCardProps {
    image: string;
    title: string;
    count: number;
  }
  
  export interface PromoBannerProps {
    discountText: string;
    title: string;
    subTitle: string;
    buttonText: string;
    imageUrl: string;
    bgColor?: string;
  }
  
  export enum Roles {
    BUYER = 'buyer',
    SELLER = 'seller',
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin',
  }
  
 export interface IUserResponse {
  accessToken: string;
  result: IUserDetails;
}

export interface IApiResponse {
  status: number,
  message: string,
  data?: any
}

export interface IUserDetails {
  email: string | null;
  role: Roles[];
  profile: Profile;
  walletAddress: string;
  _id: string;
}

interface Profile {
  name: string | null;
  bio: string | null;
  avatar: string | null;
}
export interface IProduct  {
    _id: string;
    title: string;
    description?: string;
    price: number;
    category?:string;
    seller?:string;
    stock: number;
    address:string;
    mapping_location:string;
    image_of_land:string;
    size_of_land:string;
    document_of_land:string;
    
  }