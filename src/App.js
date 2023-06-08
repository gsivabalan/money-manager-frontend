import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:9090'; 

const App = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState('');


  useEffect(() => {
    fetchIncomeAndExpenses();
    fetchCategories();
  }, []);

  const fetchIncomeAndExpenses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      setIncome(response.data.income);
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching income and expenses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handleAddTransaction = async (type, description) => {
    try {
      const transaction = {
        type,
        description,
        category: selectedCategory,
        division: selectedDivision,
      };
      await axios.post(`${API_BASE_URL}/transactions`, transaction);
      fetchIncomeAndExpenses();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div>
      <h1>Money Manager</h1>
      <select value={selectedPeriod} onChange={handlePeriodChange}>
        <option value="monthly">Month Wise</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
      </select>

      
      {selectedPeriod === 'monthly' && (
        <div>
          <h2>Monthly Income</h2>
          <ul>
            {income.map((transaction) => (
              <li key={transaction._id}>
                {transaction.description} - ${transaction.amount}
              </li>
            ))}
          </ul>

          <h2>Monthly Expenses</h2>
          <ul>
            {expenses.map((transaction) => (
              <li key={transaction._id}>
                {transaction.description} - ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      )}

      
      <button onClick={() => setOpenModal(true)}>Add Transaction</button>

      
      {openModal && (
        <div>
          <h3>Add Transaction</h3>
          <label>
            Category:
            <select value={selectedCategory} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Division:
            <select value={selectedDivision} onChange={handleDivisionChange}>
              <option value="office">Office</option>
              <option value="personal">Personal</option>
            </select>
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button onClick={() => handleAddTransaction('income', description)}>
            Add Income
          </button>
          <button onClick={() => handleAddTransaction('expense', description)}>
            Add Expense
          </button>
        </div>
      )}
    </div>
  );
};

export default App;



