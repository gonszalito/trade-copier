//
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

pendingToggle.addEventListener('click', function () {
    pendingCheckbox.checked = !pendingCheckbox.checked
    if (!pendingCheckbox.checked) {
        pendingContainer.style.display = 'none';
    } else {
        pendingContainer.style.display = 'flex';
    }
});

const pendingInput = document.getElementById('pendingInput');
const incrementPending = document.getElementById('incrementPending');
const decrementPending = document.getElementById('decrementPending');

pendingInput.addEventListener('blur', function () {
    const value = parseFloat(pendingInput.value)
    if (value === 0 || isNaN(value)) {
        pendingInput.value = 0.000001;
    }
});

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
    const roundedValue = Number(parts.join('.')).toFixed(6);

    pendingInput.value = roundedValue;
});

incrementPending.addEventListener('click', function () {
    const currentValue = parseFloat(pendingInput.value);
    const newValue = currentValue + 0.000001;
    pendingInput.value = newValue.toFixed(6)
    // pendingInput.value = newValue.toFixed(2);
});

decrementPending.addEventListener('click', function () {
    const currentValue = parseFloat(pendingInput.value);
    if (currentValue >  0.000001) {
        const newValue = currentValue -  0.000001;
        // pendingInput.value = newValue
        pendingInput.value = newValue.toFixed(6);
    }
});


const profitCheckbox = document.getElementById('profitCheckbox');
const profitToggle = document.getElementById('profitToggle');
const profitContainer = document.getElementById('profitContainer');

profitToggle.addEventListener('click', function () {
    profitCheckbox.checked = !profitCheckbox.checked
    if (!profitCheckbox.checked) {
        profitContainer.style.display = 'none';
    } else {
        profitContainer.style.display = 'flex';
    }
});

const profitInput = document.getElementById('profitInput');
const incrementProfit = document.getElementById('incrementProfit');
const decrementProfit = document.getElementById('decrementProfit');

profitInput.addEventListener('blur', function () {
    const value = parseFloat(profitInput.value)
    if (value === 0 || isNaN(value)) {
        profitInput.value = 0.000001;
    }
});

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
    const newValue = currentValue + 0.000001; 
    // profitInput.value = newValue
    profitInput.value = newValue.toFixed(6);
});

decrementProfit.addEventListener('click', function () {
    const currentValue = parseFloat(profitInput.value);
    if (currentValue > 0.000001) {
        const newValue = currentValue - 0.000001;;
        // profitInput.value = newValue
        profitInput.value = newValue.toFixed(6);
    }
});

const lossCheckbox = document.getElementById('lossCheckbox');
const lossToggle = document.getElementById('lossToggle');
const lossContainer = document.getElementById('lossContainer');

lossToggle.addEventListener('click', function () {
    lossCheckbox.checked = !lossCheckbox.checked
    if (!lossCheckbox.checked) {
        lossContainer.style.display = 'none';
    } else {
        lossContainer.style.display = 'flex';
    }
});

const lossInput = document.getElementById('lossInput');
const incrementLoss = document.getElementById('incrementLoss');
const decrementLoss = document.getElementById('decrementLoss');

lossInput.addEventListener('blur', function () {
    const value = parseFloat(lossInput.value)
    if (value === 0 || isNaN(value)) {
        lossInput.value = 0.000001;
    }
});

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
    const newValue = currentValue + 0.000001;;
    // lossInput.value = newValue
    lossInput.value = newValue.toFixed(6);
});

decrementLoss.addEventListener('click', function () {
    const currentValue = parseFloat(lossInput.value);
    if (currentValue > 0.000001) {
        const newValue = currentValue - 0.000001;;
        // lossInput.value = newValue
        lossInput.value = newValue.toFixed(6);
    }
});

const lotForm = document.getElementById("lotForm");


lotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const symbol = document.querySelector(".form__symbol select").value;
    const transaction = document.querySelector('input[name="transaction"]:checked').value;
    const lot = document.getElementById("lotInput").value;
    const pendingLot = document.getElementById("pendingInput").value;
    const profitLot = document.getElementById("profitInput").value;
    const lossLot = document.getElementById("lossInput").value;

    console.log("Symbol:", symbol);
    console.log("Transaction:", transaction);
    console.log("Lot:", lot);
    console.log("Pending Lot:", pendingLot);
    console.log("Profit Lot:", profitLot);
    console.log("Loss Lot:", lossLot);

})
