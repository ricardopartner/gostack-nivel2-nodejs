import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income: number = 0;
    let outcome: number = 0;
    let total: number = 0;

    this.transactions.forEach(o => {
      income += o.type === 'income' ? o.value : 0;
      outcome += o.type === "outcome" ? o.value : 0;
    });

    total = income - outcome;

    return {
      income, outcome, total
    };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const _transaction = new Transaction({ title, type, value });

    this.transactions.push(_transaction);

    return _transaction;
  }
}

export default TransactionsRepository;
