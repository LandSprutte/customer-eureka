import { Transaction } from '../models';

export enum SortOrderType {
  Order,
  OrderBy,
  Delete,
}

export type SortActionType = {
  type: SortOrderType;
  value?: any;
};

type State = {
  order: 'asc' | 'desc' | undefined;
  orderBy: keyof Transaction | undefined;
  data: Transaction[];
};

export const reducer = (state: State, action: SortActionType): State => {
  let order = state.order;
  let orderBy = state.orderBy;
  let data = [...state.data];

  if (action.type === SortOrderType.OrderBy) {
    orderBy = action.value;
  }

  if (orderBy && action.type === SortOrderType.OrderBy) {
    data = data.sort((a, b) => {
      const property = orderBy as keyof Pick<
        Transaction,
        'type' | 'time' | 'status' | 'localizableTitle'
      >;

      if (b[property] > a[property]) {
        return 1;
      }
      if (b[property] < a[property]) {
        return -1;
      }
      return 0;
    });
  }

  if (action.type === SortOrderType.Delete) {
    data = [...data.filter((transaction) => transaction.id !== action.value)];
  }

  if (action.type === SortOrderType.Order) {
    order = state.order === 'asc' ? 'desc' : 'asc';
    data = order === 'asc' ? data.reverse() : data;
  }

  return {
    data,
    order,
    orderBy,
  };
};
