[![npm](https://img.shields.io/npm/v/node-sms-activate-api.svg?style=flat-square)](https://www.npmjs.com/package/node-sms-activate-api)
[![license](https://img.shields.io/github/license/Bannerets/node-sms-activate-api.svg?style=flat-square)](https://github.com/Bannerets/node-sms-activate-api)
[![Build Status](https://travis-ci.org/Bannerets/node-sms-activate-api.svg?branch=master)](https://travis-ci.org/Bannerets/node-sms-activate-api)

# sms-activate.ru API

API Documentation: <http://sms-activate.ru/index.php?act=api>

## Installation

`npm install --save node-sms-activate-api`

## Usage

```javascript
const SmsActivate = require('node-sms-activate-api');

// Debug mode
//SmsActivate.DEBUG = true;

const smsactivate = new SmsActivate('API_KEY');

// With async/await:
(async () => {
  const balance = await smsactivate.getBalance();
  console.log('Balance:', balance);

  if (balance < 1) return;

  const { id, number } = await smsactivate.getNumber('wa');
  console.log('Phone number:', number);

  const code = await smsactivate.getCode(id);
  console.log('Code:', code);

  // Complete
  await smsactivate.setStatus(id, 6);
})();

// With promises:
smsactivate.getBalance()
  .then((balance) => {
    console.log('Balance:', balance);
    if (balance < 1) throw new Error();
    return smsactivate.getNumber('wa');
  })
  .then(({ id, number }) => {
    console.log('Phone number:', number);

    smsactivate.getCode(id)
    .then((code) => {
      console.log('Code:', code);

      // Complete
      smsactivate.setStatus(id, 6);
    });
  });
```
