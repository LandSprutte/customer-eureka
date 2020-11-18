export type Transaction = {
  id: string;
  type: string;
  iconURL: string;
  localizableTitle: string;
  categoryIconUrl: string;
  deleted: string | null;
  status: string;
  time: string;
  categoryID: string;
  transactionAmount: Amount | null;
  billingAmount: Amount;
};

export type Amount = {
  amount: number;
  currency: string;
};
