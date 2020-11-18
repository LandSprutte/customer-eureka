import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { Amount, Transaction } from '../models';

type TransactionAmountRowItemProps = {
  transaction: Transaction;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    negative: {
      color: '#ff4938',
    },
    currency: {
      marginLeft: '1em',
    },
  })
);

const TransactionAmountRowItem: FC<TransactionAmountRowItemProps> = ({
  transaction,
}) => {
  const classes = useStyles();

  const amount: Amount =
    transaction.transactionAmount || transaction.billingAmount;

  const isNegative = (amount: number) => {
    return Math.sign(Number(amount)) === -1;
  };

  return (
    <div className={isNegative(amount.amount) ? classes.negative : ''}>
      <span>{amount.amount}</span>
      <span className={classes.currency}>{amount.currency}</span>
    </div>
  );
};

export default TransactionAmountRowItem;
