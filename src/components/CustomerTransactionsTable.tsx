import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import React, { FC, useReducer } from 'react';
import { Transaction } from '../models';
import { reducer, SortOrderType } from '../state/transaction-table-reducer';
import CustomerTransactionsTableHeader, {
  HeaderValue,
} from './CustomerTransactionsTableHeader';
import CustomerTransactionsTableRow from './CustomerTransactionsTableRow';

type CustomerTransactionsTableProps = {
  transactions: Transaction[];
};

const CustomerTransactionsTable: FC<CustomerTransactionsTableProps> = ({
  transactions,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    data: transactions,
    order: 'asc',
    orderBy: undefined,
  });

  const headerValues: HeaderValue[] = [
    {
      id: 'type',
      sortable: true,
      label: 'type',
      alignment: 'left',
    },
    {
      id: 'localizableTitle',
      sortable: true,
      label: 'title',
      alignment: 'left',
    },
    {
      id: 'billingAmount',
      sortable: false,
      label: 'amount',
      alignment: 'center',
    },
    {
      id: 'time',
      sortable: true,
      label: 'time',
      alignment: 'center',
    },
    {
      id: 'status',
      sortable: true,
      label: 'status',
      alignment: 'left',
    },
    {
      id: 'categoryIconUrl',
      sortable: true,
      label: 'category',
      alignment: 'left',
    },
  ];

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Transaction
  ) => {
    dispatch({ type: SortOrderType.OrderBy, value: property });
    dispatch({ type: SortOrderType.Order });
  };

  const handleDeleteTransaction = (id: string) => {
    dispatch({ type: SortOrderType.Delete, value: id });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <CustomerTransactionsTableHeader
          order={state.order}
          orderBy={state.orderBy}
          onSortRequest={handleRequestSort}
          headerValues={headerValues}
        />
        <TableBody>
          {state.data.map((transaction) => (
            <CustomerTransactionsTableRow
              key={transaction.id}
              transaction={transaction}
              onDeleteRequest={handleDeleteTransaction}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTransactionsTable;
