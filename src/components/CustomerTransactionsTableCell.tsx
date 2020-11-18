import React, { FC } from 'react';
import { Transaction } from '../models';
import { useTransactions } from '../state/transactions';
import CustomerTransactionsTable from './CustomerTransactionsTable';

const Loading = () => <div>loading</div>;

const Empty = () => <div>This customer has no transactions...</div>;

const Error: FC<{ error: string }> = ({ error }) => <div>{error}</div>;

const Success: FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  return <CustomerTransactionsTable transactions={transactions} />;
};

const CustomerTransactionsTableCell = () => {
  const { data, error, status } = useTransactions();

  switch (status) {
    case 'loading':
      return <Loading />;
    case 'error':
      return <Error error={error} />;
    case 'empty':
      return <Empty />;
    case 'success':
      return <Success transactions={data} />;
    default:
      return <Empty />;
  }
};

export default CustomerTransactionsTableCell;
