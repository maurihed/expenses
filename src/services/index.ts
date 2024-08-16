/* eslint-disable @typescript-eslint/no-explicit-any */

import { AccountService as FireBaseAccountService, TransactionService as FireBaseTransactionService } from  './firebase';
import { AccountService as GoAccountService, TransactionService as GoTransactionService } from './go';

let AccountService = FireBaseAccountService;
let TransactionService = FireBaseTransactionService;

const {
  VITE_SERVICE_TYPE
} = import.meta.env;

if (VITE_SERVICE_TYPE === 'go') {
  AccountService = GoAccountService as unknown as typeof FireBaseAccountService;
  TransactionService = GoTransactionService;
}

export {
  AccountService,
  TransactionService
}
