import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../Services/api';

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createAt: string,
}

interface TransactionsProviderProps {
    children: ReactNode;
}

//interface TransactionInput {
//    title: string,
//    amount: number,
//    type: string,
//    category: string
//}

type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
     {} as TransactionContextData
    );

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const reponse = await api.post('./transactions', {
            ...transactionInput,
            createAt: new Date(),
        })
        const { transaction } = reponse.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            { children }
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}