import {
  Avatar,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { FC } from 'react';
import { Transaction } from '../models';
import { capitalizeFirstLetter, dateStringFormatter } from '../utils';
import TransactionAmountRowItem from './TransactionAmountRowItem';

type CustomerTransactionsTableRowItemProps = {
  transaction: Transaction;
  onDeleteRequest: (id: string) => void;
  onDetailsRequest: (id: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tr: {
      transition: 'transform 0.4',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      },
    },
    deleteButton: {
      padding: 'unset',
    },
    deletedChip: {
      marginLeft: '1em',
    },
  })
);

const CustomerTransactionsTableRowItem: FC<CustomerTransactionsTableRowItemProps> = ({
  onDeleteRequest,
  onDetailsRequest,
  transaction,
}) => {
  const classes = useStyles();

  const statusColorByTransactionStatus = (status: string) => {
    switch (status) {
      case 'authorization':
        return '#bd8d3a';
      case 'future':
        return '#2f4beb';
      case 'financial':
        return '#36d640';
    }
  };

  return (
    <TableRow
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDetailsRequest(transaction.id);
      }}
      key={transaction.id}
      className={classes.tr}
    >
      <TableCell component='th' scope='row'>
        <Avatar alt='transaction icon' src={transaction.iconURL} />
      </TableCell>
      <TableCell align='left'>
        <Chip
          size='small'
          color='primary'
          label={capitalizeFirstLetter(transaction.type)}
        />
      </TableCell>
      <TableCell align='left'>{transaction.localizableTitle}</TableCell>
      <TableCell align='center'>
        <TransactionAmountRowItem transaction={transaction} />
      </TableCell>
      <TableCell align='center'>
        {dateStringFormatter(transaction.time)}
      </TableCell>
      <TableCell align='left'>
        <Chip
          label={capitalizeFirstLetter(transaction.status)}
          style={{
            color: 'white',
            backgroundColor: statusColorByTransactionStatus(transaction.status),
          }}
        />
        {transaction.deleted ? (
          <Chip
            className={classes.deletedChip}
            label='Deleted'
            color='secondary'
          />
        ) : null}
      </TableCell>
      <TableCell align='left'>
        <Avatar alt='transaction icon' src={transaction.categoryIconUrl} />
      </TableCell>

      <TableCell align='left'>
        {!transaction.deleted ? (
          <IconButton
            className={classes.deleteButton}
            onClick={() => {
              onDeleteRequest(transaction.id);
            }}
          >
            <DeleteIcon fontSize='large' />
          </IconButton>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default CustomerTransactionsTableRowItem;
