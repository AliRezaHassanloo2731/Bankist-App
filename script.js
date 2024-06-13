'use strict';
// Data
const account1 = {
  owner: 'Elman Hassanloo',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-06-03T10:17:24.185Z',
    '2024-06-09T14:11:59.604Z',
    '2024-06-10T17:01:17.194Z',
    '2024-06-11T23:36:17.929Z',
    '2024-06-12T10:51:36.790Z',
  ],
  currency: 'KRR',
  locale: 'da-DK', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-06-03T10:17:24.185Z',
    '2024-06-09T14:11:59.604Z',
    '2024-06-10T17:01:17.194Z',
    '2024-06-11T23:36:17.929Z',
    '2024-06-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Ali Reza Hassanloo',
  movements: [1500, -200, 300, -500, -100, 200, 700, -50],
  interestRate: 1.0,
  pin: 8888,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-06-03T10:17:24.185Z',
    '2024-06-09T14:11:59.604Z',
    '2024-06-10T17:01:17.194Z',
    '2024-06-11T23:36:17.929Z',
    '2024-06-12T10:51:36.790Z',
  ],
  currency: 'IRR',
  locale: 'fa-IR',
};

const account4 = {
  owner: 'Maria Garcia',
  movements: [500, -150, 250, -350, 200, 400, -100, 50],
  interestRate: 1.3,
  pin: 5555,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-06-03T10:17:24.185Z',
    '2024-06-09T14:11:59.604Z',
    '2024-06-10T17:01:17.194Z',
    '2024-06-11T23:36:17.929Z',
    '2024-06-12T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};
const account5 = {
  owner: 'Hiroshi Tanaka',
  movements: [3000, -400, -1500, 2000, -100, 250, 900, -50],
  interestRate: 1.4,
  pin: 6666,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-06-03T10:17:24.185Z',
    '2024-06-09T14:11:59.604Z',
    '2024-06-10T17:01:17.194Z',
    '2024-06-11T23:36:17.929Z',
    '2024-06-12T10:51:36.790Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};
const account6 = {
  owner: 'Chen Wei',
  movements: [2500, -300, 500, -700, -150, 1000, 750, -60],
  interestRate: 1.1,
  pin: 7777,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-06-03T10:17:24.185Z',
    '2024-06-09T14:11:59.604Z',
    '2024-06-10T17:01:17.194Z',
    '2024-06-11T23:36:17.929Z',
    '2024-06-12T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurUsd = 1.1;

const options = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  weekday: 'short',
};

/////////////////////////////////////////////////

const formatDate = function (date, locale) {
  const calcDayesPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayesPassed = calcDayesPassed(new Date(), date);

  if (dayesPassed === 0) return 'Today';
  if (dayesPassed === 1) return 'Yesterday';
  if (dayesPassed < 7) return `${dayesPassed} days ago`;
  if (dayesPassed === 7) return `a week ago`;

  return new Intl.DateTimeFormat(locale, options).format(date);
};
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = `Log in to get started`;

      containerApp.style.opacity = 0;
    }

    time--;
  };

  let time = 100;
  const timer = setInterval(tick, 1000);
  return timer;
};

function displayMovments(acc, sort = false) {
  containerMovements.innerHTML = '';

  const movmententsSortedOrNo = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movmententsSortedOrNo.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatDate(date, acc.locale);

    const currFormat = formatCurrency(mov, acc.locale, acc.currency);

    const movementsMarkup = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    }  ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${currFormat}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', movementsMarkup);
  });
}

//--------------------
function calcBalance(acc) {
  return balance;
}

function printBalance(acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.innerText = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
}

//--------------------

function displayDeposit(acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.innerText = formatCurrency(income, acc.locale, acc.currency);
}

function displayWithdrawal(acc) {
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr, i, arr) => acc + curr, 0);

  labelSumOut.innerText = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );
}

function displayInterest(acc) {
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.innerText = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
}

//------------------------
function createUserNames(accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(user => user.charAt(0))
      .join('');
  });
}
createUserNames(accounts);
function updateUI(acc) {
  displayMovments(acc);
  printBalance(acc);
  displayDeposit(acc);
  displayWithdrawal(acc);
  displayInterest(acc);
}
function doingTransfer(acc) {
  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(inputTransferAmount.value);
    const reciverAcc = accounts.find(
      acc => acc.userName === inputTransferTo.value
    );

    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferTo.blur();

    if (
      reciverAcc &&
      acc.balance >= amount &&
      reciverAcc?.userName !== acc.userName &&
      amount > 0
    ) {
      acc.movements.push(-amount);
      reciverAcc.movements.push(amount);
      currAcc.movementsDates.push(new Date().toISOString());
      reciverAcc.movementsDates.push(new Date().toISOString());

      updateUI(acc);

      clearInterval(timer);
      timer = startLogOutTimer();
    }
    //
  });
}

let currAcc, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currAcc = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currAcc?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back ${currAcc.owner.split(' ')[0]}`;

    containerApp.style.opacity = 1;

    const now = new Date();

    labelDate.textContent = new Intl.DateTimeFormat(
      currAcc.locale,
      options
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);

    timer = startLogOutTimer();

    updateUI(currAcc);

    doingTransfer(currAcc);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currAcc.userName &&
    Number(inputClosePin.value) === currAcc.pin
  ) {
    const idx = accounts.findIndex(acc => acc.userName === currAcc.userName);
    accounts.splice(idx, 1);
    containerApp.style.opacity = 0;
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currAcc.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currAcc.movements.push(amount);
      currAcc.movementsDates.push(new Date().toISOString());
      updateUI(currAcc);
    }, 2500);
  }
});

const sortValue = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovments(currAcc, movements, !true);
  sortValue = !sortValue;
});

/* YIMER */
