import React, { FC, useState } from 'react';
import { Transaction } from '../models';
import CustomerTransactionsTableRowDetails from './CustomerTransactionsTableRowDetails';
import CustomerTransactionsTableRowItem from './CustomerTransactionsTableRowItem';

type CustomerTransactionsTableRowProps = {
  transaction: Transaction;
  onDeleteRequest: (id: string) => void;
};

const CustomerTransactionsTableRow: FC<CustomerTransactionsTableRowProps> = ({
  transaction,
  onDeleteRequest,
}) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const handleDetailsRequest = (id: string) => {
    setSelected(selected === id ? undefined : transaction.id);
  };

  return (
    <>
      <CustomerTransactionsTableRowItem
        transaction={transaction}
        onDetailsRequest={handleDetailsRequest}
        onDeleteRequest={onDeleteRequest}
      />
      <CustomerTransactionsTableRowDetails
        show={!!selected && selected === transaction.id}
        transaction={transaction}
      />
    </>
  );
};

export default CustomerTransactionsTableRow;
