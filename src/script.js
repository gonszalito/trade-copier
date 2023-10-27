
const sellCard = document.getElementById("sellCard");
const sellOption = document.getElementById("sellOption");

const buyCard = document.getElementById("buyCard");
const buyOption = document.getElementById("buyOption");

sellCard.addEventListener("click", function () {
    // Set the radio button to be checked
    sellOption.checked = true;
});

buyCard.addEventListener("click", function () {
    // Set the radio button to be checked
    buyOption.checked = true;
});

// For Input
const lotInput = document.getElementById('lotInput');
const incrementLot = document.getElementById('incrementLot');
const decrementLot = document.getElementById('decrementLot');


lotInput.addEventListener('blur', function () {
    const value = parseFloat(lotInput.value)
    if (value === 0 || isNaN(value)) {
        lotInput.value = 0.01
    }

});

lotInput.addEventListener('input', function () {
    // Get the current value of the input
    let inputValue = lotInput.value;

    // Remove any non-digit characters, except for a single dot (.)
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Split the value into integer and decimal parts
    const parts = inputValue.split('.');
    
    // If there are more than 2 parts, truncate the decimal part
    if (parts.length > 2) {
        parts[1] = parts[1].slice(0, 2);
    }

    // If there's a decimal part, ensure it has at most 2 digits
    if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
    }

    // Join the parts back together with a dot (.) and set the input value
    lotInput.value = parts.join('.');
});

incrementLot.addEventListener('click', function () {
    const currentValue = parseFloat(lotInput.value);
    const newValue = currentValue + 0.01;
    lotInput.value = newValue.toFixed(2);
});

decrementLot.addEventListener('click', function () {
    const currentValue = parseFloat(lotInput.value);
    if (currentValue > 0.01) {
        const newValue = currentValue - 0.01;
        lotInput.value = newValue.toFixed(2);
    }
});

//
const pendingToggle = document.getElementById('pendingToggle');
const pendingCheckbox = document.getElementById('pendingCheckbox');
const pendingContainer = document.getElementById('pendingContainer');

const changeCheckbox = (checkbox, container) => {
    if (!checkbox.checked) {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
    }
}

pendingToggle.addEventListener('click', function () {
    pendingCheckbox.checked = !pendingCheckbox.checked
    changeCheckbox(pendingCheckbox,pendingContainer);
});

const pendingInput = document.getElementById('pendingInput');
const incrementPending = document.getElementById('incrementPending');
const decrementPending = document.getElementById('decrementPending');

// pendingInput.addEventListener('blur', function () {
//     const value = parseFloat(pendingInput.value)
//     if (value === 0 || isNaN(value)) {
//         pendingInput.value = 0.000001;
//     }
// });

pendingInput.addEventListener('input', function () {
    let inputValue = pendingInput.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    const parts = inputValue.split('.');
    
    if (parts.length > 5) {
        parts[1] = parts[1].slice(0, 6);
    }

    if (parts[1] && parts[1].length > 6) {
        parts[1] = parts[1].slice(0, 6);
    }

    // Combine the parts and round to 6 decimal places
    const roundedValue = Number(parts.join('.')).toFixed(5);

    pendingInput.value = roundedValue;
});

incrementPending.addEventListener('click', function () {
    const currentValue = parseFloat(pendingInput.value);
    const newValue = currentValue + 0.0001;
    pendingInput.value = newValue.toFixed(5)
    // pendingInput.value = newValue.toFixed(2);
});

decrementPending.addEventListener('click', function () {
    const currentValue = parseFloat(pendingInput.value);
    if (currentValue >  0.000001) {
        const newValue = currentValue -  0.0001;
        // pendingInput.value = newValue
        pendingInput.value = newValue.toFixed(5);
    }
});


const profitCheckbox = document.getElementById('profitCheckbox');
const profitToggle = document.getElementById('profitToggle');
const profitContainer = document.getElementById('profitContainer');
const profitInfo = document.getElementById('profitInfo');

profitToggle.addEventListener('click', function () {
    profitCheckbox.checked = !profitCheckbox.checked
    if (!profitCheckbox.checked) {
        profitContainer.style.display = 'none';
        profitInfo.style.display = 'none';
    } else {
        profitContainer.style.display = 'flex';
        profitInfo.style.display = 'flex';
    }
});

const profitInput = document.getElementById('profitInput');
const incrementProfit = document.getElementById('incrementProfit');
const decrementProfit = document.getElementById('decrementProfit');

const updateProfitInfo = () => {
    const pips = calculatePipDifference(parseFloat(pendingInput.value), parseFloat(profitInput.value));
    const profitValue = lotInput.value * pips * 10 ; 

    const formattedValue = numberWithComma(profitValue)
    const content = `+${Math.abs(pips.toFixed(1))} pips | +${formattedValue} USD`;
    profitInfo.textContent = content;  
}

profitInput.addEventListener('input', updateProfitInfo);
pendingInput.addEventListener('input', updateProfitInfo);
lotInput.addEventListener('input', updateProfitInfo);

// profitInput.addEventListener('blur', function () {
//     const value = parseFloat(profitInput.value)
//     if (value === 0 || isNaN(value)) {
//         profitInput.value = 0.000001;
//     }
// });

profitInput.addEventListener('input', function () {
    let inputValue = profitInput.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    const parts = inputValue.split('.');
    
    if (parts.length > 6) {
        parts[1] = parts[1].slice(0, 6);
    }

    if (parts[1] && parts[1].length > 6) {
        parts[1] = parts[1].slice(0, 6);
    }

    profitInput.value = parts.join('.');
});

incrementProfit.addEventListener('click', function () {
    const currentValue = parseFloat(profitInput.value);
    const newValue = currentValue + 0.0001; 
    // profitInput.value = newValue
    profitInput.value = newValue.toFixed(5);
    updateProfitInfo();
});

decrementProfit.addEventListener('click', function () {
    const currentValue = parseFloat(profitInput.value);
    if (currentValue > 0.000001) {
        const newValue = currentValue - 0.0001;;
        // profitInput.value = newValue
        profitInput.value = newValue.toFixed(5);
    }
    updateProfitInfo();
});

const calculatePipDifference = (entryPrice, exitPrice) => {
    pipSize = 0.0001;
    const pipDifference = (exitPrice - entryPrice) / pipSize;
    return pipDifference;
}

const lossCheckbox = document.getElementById('lossCheckbox');
const lossToggle = document.getElementById('lossToggle');
const lossContainer = document.getElementById('lossContainer');
const lossInfo = document.getElementById('lossInfo');

const updateLossInfo = () => {
    const pips = calculatePipDifference(parseFloat(pendingInput.value), parseFloat(lossInput.value));
    const lossValue = lotInput.value * pips * 10 ; 

    const formattedValue = numberWithComma(lossValue)
    const content = `-${Math.abs(pips.toFixed(1))} pips | -${Math.abs(formattedValue)} USD`;
    lossInfo.textContent = content;  
}

lossToggle.addEventListener('click', function () {
    lossCheckbox.checked = !lossCheckbox.checked
    if (!lossCheckbox.checked) {
        lossContainer.style.display = 'none';
        lossInfo.style.display = 'none';
    } else {
        lossContainer.style.display = 'flex';
        lossInfo.style.display = 'flex';
    }
});

const lossInput = document.getElementById('lossInput');
const incrementLoss = document.getElementById('incrementLoss');
const decrementLoss = document.getElementById('decrementLoss');

lossInput.addEventListener('input', updateLossInfo);
pendingInput.addEventListener('input', updateLossInfo);
lotInput.addEventListener('input', updateLossInfo);

// lossInput.addEventListener('blur', function () {
//     const value = parseFloat(lossInput.value)
//     if (value === 0 || isNaN(value)) {
//         lossInput.value = 0.000001;
//     }
// });

lossInput.addEventListener('input', function () {
    let inputValue = lossInput.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    const parts = inputValue.split('.');
    
    if (parts.length > 6) {
        parts[1] = parts[1].slice(0, 6);
    }

    if (parts[1] && parts[1].length > 6) {
        parts[1] = parts[1].slice(0, 6);
    }

    lossInput.value = parts.join('.');
});

incrementLoss.addEventListener('click', function () {
    
    const currentValue = parseFloat(lossInput.value);
    const newValue = currentValue + 0.0001;;
    // lossInput.value = newValue
    lossInput.value = newValue.toFixed(5);
    updateLossInfo();
});

decrementLoss.addEventListener('click', function () {
    const currentValue = parseFloat(lossInput.value);
    if (currentValue > 0.000001) {
        const newValue = currentValue - 0.0001;;
        // lossInput.value = newValue
        lossInput.value = newValue.toFixed(5);
    }
    updateLossInfo();
});

const lotForm = document.getElementById("lotForm");

var isFormValid = false;

lotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let symbol = document.getElementById("symbolInput").value;
    const transaction = document.querySelector('input[name="transactionOption"]:checked').value;
    let lot = document.getElementById("lotInput").value;
    const pendingLot = document.getElementById("pendingInput").value;
    const profitLot = document.getElementById("profitInput").value;
    const lossLot = document.getElementById("lossInput").value;

    var pendingLotValue = pendingLot;
    var profitLotValue = profitLot;
    var lossLotValue = lossLot;
    
    if(profitCheckbox.checked === false) {
        profitLotValue = null;
    }
    if(lossCheckbox.checked === false) {
        lossLotValue = null;
    }
    if(pendingCheckbox.checked === false) {
        pendingLotValue = null;
    }

    // const formData = new FormData();
    // formData.append('symbol', symbol);
    // formData.append('transaction', transaction);   
    // formData.append('lot', lot);
    // formData.append('pendingLot', pendingLotValue);
    // formData.append('profitLot', profitLotValue);
    // formData.append('lossLot', lossLotValue);

    // console.log(formData.get('symbol'));
    // console.log(formData.get('transaction'));
    // console.log(formData.get('lot'));
    // console.log(formData.get('pendingLot'));
    // console.log(formData.get('profitLot'));
    // console.log(formData.get('lossLot'));


    const formData = {
        symbol,
        transaction,
        lot,
        pendingLot: pendingLotValue,
        profitLot: profitLotValue,
        lossLot: lossLotValue,
    };

    if(isFormValid) {
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.message);
        })
        .catch(error => {
            console.error(error);
        });
    }

    resetForm();
})

const resetForm = () => {
    symbolInput.value = "";

    const transactionOptions = document.querySelectorAll('input[name="transactionOption"]');
    transactionOptions.forEach((radio) => {
        radio.checked = false;
    });

    lotInput.value = 0.01;
    
    pendingCheckbox.checked = false;
    // pendingInput.value = 0.000000.toFixed(6);
    pendingInput.value = ""
    changeCheckbox(pendingCheckbox,pendingContainer);
    profitCheckbox.checked = false;
    // profitInput.value = 0.000000.toFixed(6);
    profitInput.value = ""
    changeCheckbox(profitCheckbox,profitContainer);
    lossCheckbox.checked = false;
    // lossInput.value = 0.000000.toFixed(6);
    lossInput.value = ""
    changeCheckbox(lossCheckbox,lossContainer);

    profitInfo.textContent= '+0 pips | +0 USD';
    lossInfo.textContent= '-0 pips | -0 USD';

    profitInfo.style.display = 'none';
    lossInfo.style.display = 'none';    
    
    const submitButton = document.getElementById("submitButton");
    submitButton.setAttribute("disabled", "disabled");
    submitButton.classList.add("submit__button__disabled");
    checkFields();
}

const submitButton = document.getElementById("submitButton");
const symbolInput = document.getElementById("symbolInput");
const transactionOptions = document.querySelectorAll('input[name="transactionOption"]');

const validateTransactionSelection = () => {
    const selectedRadioButton = Array.from(transactionOption).find(rb => rb.checked);
    if (selectedRadioButton) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}

let isSymbolFilled = symbolInput.value.trim().length > 2;
let isLotFilled = lotInput.value.trim() !== "";
let isTransactionOptionSelected = Array.from(transactionOptions).some(rb => rb.checked);

const checkFields = () => {
    
    isSymbolFilled = symbolInput.value.trim().length > 2;
    isLotFilled = lotInput.value.trim() !== "";
    isTransactionOptionSelected = Array.from(transactionOptions).some(rb => rb.checked);

    if (isSymbolFilled && isLotFilled && isTransactionOptionSelected) {
        isFormValid = true;
        submitButton.removeAttribute("disabled");
        if (submitButton.classList.contains("submit__button__disabled")) {
            submitButton.classList.remove("submit__button__disabled");
        }
    } else {
        isFormValid = false;
        submitButton.setAttribute("disabled", "disabled");
        submitButton.classList.add("submit__button__disabled");
    }
    
}

symbolInput.addEventListener("input", checkFields);
lotInput.addEventListener("input", checkFields);
sellCard.addEventListener("click", checkFields);
buyCard.addEventListener("click", checkFields);


checkFields();

// const testButton = document.getElementById("testButton");

// const testPython = () => {
//     fetch('/submit-form', {
//         method: 'POST',
//         body: new FormData(myForm)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.message); // Handle the response
//     })
//     .catch(error => {
//         console.error(error);
//     });
// }

// testButton.addEventListener("click", testPython);

const numberWithComma = (number) => {
    // Use toLocaleString with options to format the number
    return number.toLocaleString(undefined, { minimumFractionDigits: 1 });
};
