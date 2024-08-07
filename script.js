document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        const response = await fetch('/add-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, amount, date: new Date() }),
        });

        const transaction = await response.json();
        addTransactionToList(transaction);

        form.reset();
    });

    async function fetchTransactions() {
        const response = await fetch('/transactions');
        const transactions = await response.json();
        transactions.forEach(addTransactionToList);
    }

    function addTransactionToList(transaction) {
        const li = document.createElement('li');
        li.textContent = `${transaction.description}: $${transaction.amount}`;
        transactionList.appendChild(li);
    }

    fetchTransactions();
});
