const hostName = 'http://localhost:3000';
export let CONFIG = {
  getTransactionData: `${hostName}/getTransactionData`,
  getUserCounts:`${hostName}/getUserData`,
  removeTransaction:`${hostName}/removeTransaction`,
  removeCategory:`${hostName}/removeCategory`,
  modifyTransaction:`${hostName}/modifyTransaction`,
  createTransaction:`${hostName}/createTransaction`
};

export let userID = 8;
