const express = require('express')
const app = express()
const Web3 = require("web3")
var config = require('./config/config.json');

//Get Ethereum node provider
const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereumNodeProvider))

//Api to get transaction details
app.get('/eth/api/v1/transaction/:txid', (req, res) => {

	web3.eth.getTransaction(req.params.txid , function(err, result) {
	  if (err) {
	    var errorObj = {
		     message: 'Error while getting transaction details',
		     details: 'Transaction detail is not available , Causes : TX hash not correct/ETH Provider connection Problem'
		}
		res.status(404);
		res.send(errorObj)
	  } else {
	  	//account transfer
	  	if(result.input == '0x'){ 
	  		var response = {
			   "block":{
			      "blockHeight":result.blockNumber
			   },
			   "outs":[{
			         "address":result.to,
			         "value":result.value
			      }
			   ],
			   "ins":[{
			         "address":result.from,
			         "value":"-"+result.value
			      }
			   ],
			   "hash": result.hash,
			   "currency":"ETH",
			   "chain":"ETH.main",
			   "state":"confirmed",
			   "depositType":"account"
			};
			res.send(response)
	  	}else{ 
	  		//token transfer
	  		if(result.input.length == 138){
		  		var toAddress = "0x"+result.input.slice(34, 74); // 64 bits are to address 
		  		var tokenAmount = web3.utils.hexToNumberString("0x"+result.input.slice(74,138));
		  		res.send({
				   "block":{
				      "blockHeight": result.blockNumber
				   },
				   "outs":[{
				         "address": toAddress,
				         "value": tokenAmount,
				         "type":"token",
				         "coinspecific":{
				            "tokenAddress":result.to
				         }
				      }
				   ],
				   "ins":[{
				         "address": result.from,
				         "value":"-"+tokenAmount,
				         "type":"token",
				         "coinspecific":{
				            "tokenAddress":result.to
				        }
				      }
				   ],
				   "hash":result.hash,
				   "currency":"ETH",
				   "state":"confirmed",
				   "depositType":"Contract",
				   "chain":"ETH.main"
				});
	  		}else{
	  			//contract execution
	  			var toAddress = "0x"+result.input.slice(34, 74); // 64 bits are to address 
		  		var value = web3.utils.hexToNumberString("0x"+result.input.slice(74,138));
	  			res.send({
				   "block":{
				      "blockHeight": result.blockNumber
				   },
				   "outs":[{
				         "address": toAddress,
				         "value": value,
				         "type":"transfer",
				         "coinspecific":{
				            "tracehash": result.hash
				         }
				      }
				   ],
				   "ins":[{
				         "address": result.to,
				         "value":"-"+value,
				         "type":"transfer",
				         "coinspecific":{
				            "tracehash": result.hash
				        }
				      }
				   ],
				   "hash":result.hash,
				   "currency":"ETH",
				   "state":"confirmed",
				   "depositType":"Contract",
				   "chain":"ETH.main"
				});
	  		}
	  	}
	  }
	})		
})

// init node server
app.listen(config.port, () => {
  console.log(`Blockchain App listening at http://localhost:${config.port}`)
})

module.exports = app;