import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import Modal from 'react-modal';
import { NewTransactioModal } from "./components/NewTransactioModal";
import { useTransactions, TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }


  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal = {handleOpenNewTransactionModal}/>
      <Dashboard/>

      <NewTransactioModal
        isOpen = {isNewTransactionModalOpen}
        onRequestClose = {handleCloseNewTransactionModal}
      />

      <GlobalStyle/>
    </TransactionsProvider>
  );
}