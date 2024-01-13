// this could be menu/service etc...
export interface Products {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  description: string;
  photo: string;
  name: string;
  price: number;
  offers: {
    reductionPercent: number;
    price: number;
    start_date: string;
    end_date: string;
  }[];
}
