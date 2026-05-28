
var billInput   = document.getElementById('bill');
var tipInput    = document.getElementById('tip');
var peopleInput = document.getElementById('people');
peopleInput.addEventListener('wheel', function (e) {
    if (document.activeElement === peopleInput) {
      peopleInput.blur();
    }
  });
var presetBtns  = document.querySelectorAll('.preset-btn');
var resetBtn    = document.getElementById('reset-btn');

var billError  = document.getElementById('bill-error');
var tipError   = document.getElementById('tip-error');
var peopleError  = document.getElementById('people-error');

var totalTipEl     = document.getElementById('total-tip');
var grandTotalEl    = document.getElementById('grand-total');
var perPersonEl   = document.getElementById('per-person');
var billPerPersonEl = document.getElementById('bill-per-person');
var tipPerPersonEl = document.getElementById('tip-per-person');

var activePreset = null;


function roundUp(value) {
  return Math.ceil(value * 100) / 100;
}

function formatRs(value) {
  return 'Rs ' + value.toFixed(2);
}

function showError(el, inputWrapper, msg) {
  el.textContent = msg;
  inputWrapper.classList.add('error-border');
}

function clearError(el, inputWrapper) {
  el.textContent = '';
  inputWrapper.classList.remove('error-border');
}

function resetOutput() {
  totalTipEl.textContent      = 'Rs 0.00';
  grandTotalEl.textContent    = 'Rs 0.00';
  perPersonEl.textContent     = 'Rs 0.00';
  billPerPersonEl.textContent = 'Rs 0.00';
  tipPerPersonEl.textContent  = 'Rs 0.00';
}

function validateBill() {
  var raw  = billInput.value.trim();
  var wrap = billInput.parentElement;

  if (raw === '') {
    clearError(billError, wrap);
    return null;
  }

  var val = parseFloat(raw);

  if (isNaN(val) || val < 0) {
    showError(billError, wrap, 'Bill must be a positive number.');
    return null;
  }

  if (val === 0) {
    showError(billError, wrap, 'Bill amount cannot be zero.');
    return null;
  }

  if (val > 10000000) {
    showError(billError, wrap, 'That looks too large. Please check.');
    return null;
  }

  clearError(billError, wrap);
  return val;
}

function validateTip() {
  var raw  = tipInput.value.trim();
  var wrap = tipInput.parentElement;

  if (raw === '' && activePreset === null) {
    clearError(tipError, wrap);
    return 0;
  }

  if (raw === '' && activePreset !== null) {
    clearError(tipError, wrap);
    return activePreset;
  }

  var val = parseFloat(raw);

  if (isNaN(val)) {
    showError(tipError, wrap, 'Please enter a valid tip percentage.');
    return null;
  }

  if (val < 0) {
    showError(tipError, wrap, 'Tip % cannot be negative.');
    return null;
  }

  if (val > 100) {
    showError(tipError, wrap, 'Tip % cannot exceed 100%.');
    return null;
  }

  clearError(tipError, wrap);
  return val;
}

function validatePeople()
 {
  var raw  = peopleInput.value.trim();
  var wrap = peopleInput.parentElement;

  if (raw === '') {
    clearError(peopleError, wrap);
    return null;
  }

  var val = parseInt(raw, 10);

  if (raw.includes('.')) {
    showError(peopleError, wrap, 'Number of people must be a whole number.');
    return null;
  }

  if (isNaN(val) || val < 1) {
    showError(peopleError, wrap, 'Must be at least 1 person.');
    return null;
  }

  if (val >10000) {
    showError(peopleError, wrap, 'That\'s a very large number. Please check.');
    return null;
  }

  clearError(peopleError, wrap);
  return val;
}

function calculate() {
  var bill  = validateBill();
  var tip   = validateTip();
  var people = validatePeople();

  if (bill === null || tip === null) {
    resetOutput();
    return;
  }

  if (billInput.value.trim() === '' || peopleInput.value.trim() === '' || people === null) {
    resetOutput();
    return;
  }

  var tipAmount = bill * (tip / 100);
  var grandTotal= bill + tipAmount;

  var perPerson       = roundUp(grandTotal / people);
  var tipPerPerson    = roundUp(tipAmount / people);
  var billPerPersonAmt = roundUp(bill / people);

  totalTipEl.textContent    = formatRs(tipAmount);
  grandTotalEl.textContent   = formatRs(grandTotal);
  perPersonEl.textContent    = formatRs(perPerson);
  billPerPersonEl.textContent = formatRs(billPerPersonAmt);
  tipPerPersonEl.textContent  = formatRs(tipPerPerson);
}

presetBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var tipVal = parseInt(btn.getAttribute('data-tip'), 10);

    if (activePreset === tipVal) {
      btn.classList.remove('active');
      activePreset = null;
      tipInput.value = '';
    } else {
      presetBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activePreset = tipVal;
      tipInput.value = tipVal;
    }

    clearError(tipError, tipInput.parentElement);
    calculate();
  });
});

tipInput.addEventListener('input', function() {
  activePreset = null;
  presetBtns.forEach(function(b) { b.classList.remove('active'); });
  calculate();
});

billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

resetBtn.addEventListener('click', function() {
  billInput.value  = '';
  tipInput.value   = '';
  peopleInput.value= '';

  activePreset = null;
  presetBtns.forEach(function(b) { b.classList.remove('active'); });

  clearError(billError, billInput.parentElement);
  clearError(tipError, tipInput.parentElement);
  clearError(peopleError, peopleInput.parentElement);

  resetOutput();

  billInput.focus();
});

calculate();