import {Status} from '.';
import {User} from './auth';
import {Place, PlaceProducts, PlaceService} from './place';

interface BookedServices {
  id: string;
  quantity: number;
  product: PlaceProducts;
}
export interface Booking {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  total_amount: number;
  quantity: number;
  price: number;
  rider_tip: number;
  delivery_fee: number;
  recipient_address: string;
  recipient_phone: string;
  transaction_id: string;
  reference_code: string;
  status: BookingStatus;
  user: User;
  place: Place[];
  services: BookedServices[];
}

interface BookingStatus {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  label: Status;
}

export interface Sales {
  month: string;
  totalamount: string;
}

export interface CartItem extends PlaceProducts {
  deliveryFee: number;
  place: Place;
  price: number;
}

export interface BookingDto {
  // place: string[];
  place: string;
  services: {
    product: string;
    quantity: number;
    price: number;
    place: string;
  }[];
  rider_tip: number;
  delivery_fee: number;
  delivery_address: string;
  recipient_phone: string;
  transaction_id: string;
  quantity?: number;
  deliveryFee?: number;
  amount?: number;
}
