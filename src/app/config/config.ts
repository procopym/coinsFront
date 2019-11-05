const hostName = 'http://localhost:3000';
export let CONFIG = {
  getTransactionData: `${hostName}/getTransactionData`,
  getUserCounts:`${hostName}/getUserData`,
  getUserProfile:`${hostName}/getUserProfile`,
  removeTransaction:`${hostName}/removeTransaction`,
  removeCategory:`${hostName}/removeCategory`,
  modifyTransaction:`${hostName}/modifyTransaction`,
  createTransaction:`${hostName}/createTransaction`,
  createCategory:`${hostName}/createCategory`,
  getStatsByYear:`${hostName}/getStatsByYear`,
  getStatsPerMonth:`${hostName}/getStatsPerMonth`
};

export let userId = 8;
