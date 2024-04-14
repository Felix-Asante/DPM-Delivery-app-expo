export interface MakePaymentDto {
  amount: number;
  currency: string;
  customerName: string;
  provider: string;
  reference: string;
  customerMobile: string;
  transactionId: string;
  requestId: string;
}
