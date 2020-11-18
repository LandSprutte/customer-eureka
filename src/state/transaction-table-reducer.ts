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

  switch (action.type) {
    case SortOrderType.Order:
      order = state.order === 'asc' ? 'desc' : 'asc';
      data = order === 'asc' ? data.reverse() : data;
      break;
    case SortOrderType.OrderBy:
      orderBy = action.value;
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
      break;

    case SortOrderType.Delete:
      data = [...data.filter((transaction) => transaction.id !== action.value)];
      break;

    default:
      break;
  }

  return {
    data,
    order,
    orderBy,
  };
};
