import {
  createStyles,
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
} from '@material-ui/core';
import React, { FC } from 'react';
import { Transaction } from '../models';

type CustomerTransactionsTableHeaderProps = {
  orderBy: string | undefined;
  order: 'asc' | 'desc' | undefined;
  onSortRequest: (
    event: React.MouseEvent<unknown>,
    property: keyof Transaction
  ) => void;
  headerValues: HeaderValue[];
};

export type HeaderValue = {
  id: keyof Transaction;
  sortable: boolean;
  label: string;
  alignment: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

const CustomerTransactionsTableHeader: FC<CustomerTransactionsTableHeaderProps> = ({
  order,
  orderBy,
  onSortRequest,
  headerValues,
}) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headerValues.map((key) =>
          key.sortable ? (
            <TableCell key={key.id} align={key.alignment}>
              <TableSortLabel
                active={orderBy === key.id}
                direction={orderBy === key.id ? order : 'asc'}
                onClick={(e) => {
                  onSortRequest(e, key.id);
                }}
              >
                {key.label}
                {orderBy === key.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={key.id} align={key.alignment}>
              {key.label}
            </TableCell>
          )
        )}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomerTransactionsTableHeader;
