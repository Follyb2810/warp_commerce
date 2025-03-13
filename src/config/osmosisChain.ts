export const osmosisChain = {
    "chainId": "osmosis-1",
    "chainName": "Osmosis",
    "chainSymbolImageUrl": "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/osmosis/chain.png",
    "rpc": "https://rpc-osmosis.blockapsis.com",
    "rest": "https://lcd-osmosis.blockapsis.com",
    "nodeProvider": {
      "name": "Blockapsis",
      "email": "infra@blockapsis.com",
      "website": "https://blockapsis.com/"
    },
    "bip44": {
      "coinType": 118
    },
    "bech32Config": {
      "bech32PrefixAccAddr": "osmosis",
      "bech32PrefixAccPub": "osmosispub",
      "bech32PrefixValAddr": "osmosisvaloper",
      "bech32PrefixValPub": "osmosisvaloperpub",
      "bech32PrefixConsAddr": "osmosisvalcons",
      "bech32PrefixConsPub": "osmosisvalconspub"
    },
    "currencies": [
      {
        "coinDenom": "OSMO",
        "coinMinimalDenom": "uosmo",
        "coinDecimals": 6,
        "coinGeckoId": "osmosis"
      }
    ],
    "feeCurrencies": [
      {
        "coinDenom": "OSMO",
        "coinMinimalDenom": "uosmo",
        "coinDecimals": 6,
        "coinGeckoId": "osmosis",
        "gasPriceStep": {
          "low": 0.01,
          "average": 0.025,
          "high": 0.03
        }
      }
    ],
    "stakeCurrency": {
      "coinDenom": "OSMO",
      "coinMinimalDenom": "uosmo",
      "coinDecimals": 6,
      "coinGeckoId": "osmosis"
    },
    "features": ["cosmwasm", "osmosis-txfees"]
  }