import { useEffect, useState } from 'react';
import { fetchTransactions } from '../mocks/api-mocks';
import { Transaction } from '../models';

export type TransactionsState = {
  error: string;
  status: 'loading' | 'error' | 'success' | 'empty' | 'idle';
  data: Transaction[];
};

export const useTransactions = () => {
  const [state, setState] = useState<TransactionsState>({
    error: '',
    data: [],
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'idle') {
      setState({
        data: [],
        error: '',
        status: 'loading',
      });
      fetchTransactions().then(({ data }) => {
        setState({
          data: data.transactions,
          error: '',
          status: 'success',
        });
      });
    }
  }, [state.status]);

  return state;
};
