import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("balance");
  const [income, setIncome] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [expense, setExpense] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (type) => {
    const amount = parseFloat(type === "income" ? income : expense);
    const name = type === "income" ? incomeName : expenseName;

    if (!name || !amount || !date) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setTransactions([
      ...transactions,
      { type, amount, name, date, key: Math.random().toString() },
    ]);

    if (type === "income") {
      setIncome("");
      setIncomeName("");
    } else {
      setExpense("");
      setExpenseName("");
    }
    setDate("");
  };

  const calculateBalance = () => {
    return transactions
      .reduce((acc, transaction) => {
        return transaction.type === "income"
          ? acc + transaction.amount
          : acc - transaction.amount;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 rounded-lg shadow-md text-gray-300">
      <h2 className="text-lg font-bold mb-4 text-center">
        Registro de Finanzas
      </h2>

      {/* Pestañas */}
      <div className="flex justify-around mb-4 text-gray-200">
        <button
          className={`px-3 py-2 rounded-lg ${
            activeTab === "balance" ? "bg-sky-900" : ""
          }`}
          onClick={() => setActiveTab("balance")}
        >
          Saldo en Cartera
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${
            activeTab === "income" ? "bg-sky-900" : ""
          }`}
          onClick={() => setActiveTab("income")}
        >
          Ingresos
        </button>
        <button
          className={`px-3 py-2 rounded-lg ${
            activeTab === "expense" ? "bg-sky-900" : ""
          }`}
          onClick={() => setActiveTab("expense")}
        >
          Gastos
        </button>
      </div>

      {/* Contenido de cada pestaña */}
      {activeTab === "balance" && (
        <div className="text-center mb-4">
          <h3 className="text-md font-bold mb-2">Saldo en Cartera:</h3>
          <p className="text-2xl font-semibold text-gray-100">
            ${calculateBalance()}
          </p>
        </div>
      )}

      {activeTab === "income" && (
        <div className="mb-4">
          <h3 className="text-md font-bold mb-2">Ingresos:</h3>
          <input
            type="text"
            placeholder="Nombre del Ingreso"
            value={incomeName}
            onChange={(e) => setIncomeName(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-2 bg-gray-900 text-gray-200"
          />
          <input
            type="number"
            placeholder="Monto"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-2 bg-gray-900 text-gray-200"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-2 bg-gray-900 text-gray-200"
          />
          <button
            onClick={() => addTransaction("income")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-2 flex items-center justify-center"
          >
            <Plus className="mr-2" />
            Agregar Ingreso
          </button>
        </div>
      )}

      {activeTab === "expense" && (
        <div className="mb-4">
          <h3 className="text-md font-bold mb-2">Gastos:</h3>
          <input
            type="text"
            placeholder="Nombre del Gasto"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-2 bg-gray-900 text-gray-200"
          />
          <input
            type="number"
            placeholder="Monto"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-2 bg-gray-900 text-gray-200"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded-lg mb-2 bg-gray-900 text-gray-200"
          />
          <button
            onClick={() => addTransaction("expense")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2 flex items-center justify-center"
          >
            <Minus className="mr-2" />
            Agregar Gasto
          </button>
        </div>
      )}

      <h3 className="text-md font-bold mb-2">Historial:</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.key} className="mb-2">
            <span
              className={
                transaction.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {transaction.type === "income" ? "Ingreso: " : "Gasto: "}
            </span>
            <span>{transaction.name}</span> - ${transaction.amount} el{" "}
            {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
