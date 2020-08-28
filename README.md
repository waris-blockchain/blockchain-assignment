# blockchain-assignment

This Project contains Api to fetch transaction details from Etheruem mainnet. I am using Infura node provider here.

## Installation

Use the npm package manager to install project.

```bash
npm install
```

## Usage

Make Get request with transaction hash

localhost:3000/eth/api/v1/transaction/0xbeae83e379e9a4c986cfc453fe90e1fa2ca50eaa692ad99abe2aee2214208132

Sample Response

```json
{
  "block": {
    "blockHeight": 6179710
  },
  "outs": [
    {
      "address": "0xA13FE656ee292Dc972589ea842151d9ED617f618",
      "value": "130000000000000"
    }
  ],
  "ins": [
    {
      "address": "0x9a8B2a41d6311f035594397Bb76142F1d5aeB078",
      "value": "-130000000000000"
    }
  ],
  "hash": "0xbeae83e379e9a4c986cfc453fe90e1fa2ca50eaa692ad99abe2aee2214208132",
  "currency": "ETH",
  "chain": "ETH.main",
  "state": "confirmed",
  "depositType": "account"
}

```

## Test Case

Run mocha test cases

```bash
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)