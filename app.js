const form = document.querySelector('#loan-form')
form.addEventListener('submit', function(event) {
  // Hide results
  document.querySelector('#results').style.display = 'none'
  // Show loader
  document.querySelector('#loader').style.display = 'block'
 
  setTimeout(calculateResults, 3000)

  event.preventDefault()
})

function calculateResults() {
  // UI variables
  const amountInput = document.querySelector('#amount')
  const interestInput = document.querySelector('#interest')
  const yearsInput = document.querySelector('#years')
  const monthlyPayment = document.querySelector('#monthly-payment')
  const totalPayment = document.querySelector('#total-payment')
  const totalInterest = document.querySelector('#total-interest')

  const principle = parseFloat(amountInput.value)
  const calculatedInterest = parseFloat(interestInput.value) / 100 / 12
  const calculatedPayments = parseFloat(yearsInput.value) * 12

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principle * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2)
    // Show results
    document.querySelector('#results').style.display = 'block'
    // Hide loader
    document.querySelector('#loader').style.display = 'none'
  } else {
    showError('Please Check Your Numbers')
  }
}

// Show error function
function showError(errorMessage) {
  // Hide results
  document.querySelector('#results').style.display = 'none'
  // Hide loader
  document.querySelector('#loader').style.display = 'none'
  // Create div
  const errorDiv = document.createElement('div')
  // Get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')
  // Add class
  errorDiv.className = 'alert alert-danger'
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(errorMessage))
  // Insert error above heading
  card.insertBefore(errorDiv, heading)
  // Clear error after 3 seconds
  setTimeout(clearError, 3000)
}

// Clear error message
function clearError() {
  document.querySelector('.alert').remove()
}