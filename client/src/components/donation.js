// src/components/donation.js

export function makeGift(donationData = null) {
  // Store donation data temporarily if provided
  if (donationData) {
    localStorage.setItem('pendingBkashDonation', JSON.stringify(donationData));
  }
  
  // Show Bkash payment instructions
  alert(`Please send your donation via bKash to our agent number: 01759132586\n\nAmount: ৳${donationData?.amount || ''}\n\nAfter completing the payment, please enter the transaction ID on the next screen.`);
}

// Function to handle successful Bkash payment
export function handleBkashSuccess(transactionId) {
  const pendingDonation = JSON.parse(localStorage.getItem('pendingBkashDonation') || '{}');
  
  if (pendingDonation.amount) {
    console.log('Bkash donation completed:', pendingDonation, transactionId);
    alert(`Thank you for your donation of ৳${pendingDonation.amount}! Transaction ID: ${transactionId}`);
  }
  
  // Clear the stored data
  localStorage.removeItem('pendingBkashDonation');
  return pendingDonation;
}