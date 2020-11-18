import {
  Box,
  Collapse,
  Container,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { Transaction } from '../models';
import { dateStringFormatter } from '../utils';

type CustomerTransactionsTableRowDetailsProps = {
  show: boolean;
  transaction: Transaction;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: { paddingBottom: 0, paddingTop: 0 },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    label: {
      opacity: 0.7,
      marginRight: '1rem',
    },
  })
);

const CustomerTransactionsTableRowDetails: FC<CustomerTransactionsTableRowDetailsProps> = ({
  show,
  transaction,
}) => {
  const classes = useStyles();
  return show ? (
    <TableRow>
      <TableCell className={classes.tableCell} colSpan={8}>
        <Collapse in={show} timeout='auto' unmountOnExit>
          <Box margin={1}>
            <Typography variant='h6' gutterBottom component='div'>
              Details
            </Typography>
            <Container className={classes.content}>
              <Typography component='div'>
                <div className={classes.label}>Transaction Id:</div>
                {transaction.id}
              </Typography>
              {transaction.deleted ? (
                <Typography component='div'>
                  <div className={classes.label}>Deleted at:</div>
                  {dateStringFormatter(transaction.deleted)}
                </Typography>
              ) : null}

              <Typography component='div'>
                <div className={classes.label}>Billing: </div>
                <div>
                  <span className={classes.label}>amount:</span>
                  {transaction.billingAmount.amount}
                </div>
                <div>
                  <span className={classes.label}>currency:</span>
                  {transaction.billingAmount.currency}
                </div>
              </Typography>
              <Typography component='div'>
                <div className={classes.label}>Transfer: </div>
                <div>
                  <span className={classes.label}>amount:</span>
                  {transaction.transactionAmount?.amount}
                </div>
                <div>
                  <span className={classes.label}>currency:</span>
                  {transaction.transactionAmount?.currency}
                </div>
              </Typography>
            </Container>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  ) : null;
};

export default CustomerTransactionsTableRowDetails;
