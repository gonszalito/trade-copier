const { spawn } = require('child_process');

const data = {
  symbol : "USDJPY",
  lot : 0.01,
  // price : mt5.symbol_info_tick(symbol).ask
}

const order = {
    symbol : "USDJPY",
    lot : 0.01,
    // price : mt5.symbol_info_tick(symbol).ask
}

const sendOrder = (formData) => {

    // const symbol = formData.get('symbol');
    // const transaction = formData.get('transaction');
    // const lot = formData.get('lot');
    // const pendingLot = formData.get('pendingLot');
    // const profitLot = formData.get('profitLot');
    // const lossLot = formData.get('lossLot');

  //   const order = {
  //     symbol,
  //     transaction,
  //     lot,
  //     pendingLot,
  //     profitLot,
  //     lossLot,
  // }

    console.log("starting");
    const functionName = "sendOrder";
    const jsonData = JSON.stringify({ formData, order });

    const pythonExecutable = './.venv/Scripts/python.exe';

    const pythonProcess = spawn(pythonExecutable, ['./test.py', functionName, jsonData]);

    pythonProcess.stdout.on('data', (data) => {
        const pythonOutput = data.toString(); // Convert the buffer to a string
        try {
          console.log("output:", pythonOutput)
          // const parsedObject = JSON.parse(pythonOutput); // Parse the JSON object
          // console.log('Parsed Python Object:', parsedObject);

        } catch (error) {
          console.error('Error parsing Python output as JSON:', error);
        }
      });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Script Error: ${data}`);
    });
      
    pythonProcess.on('close', (code) => {
        console.log(`Python Script exited with code ${code}`);
    });
}

exports.sendOrder = sendOrder;
