
export const calculateDBCarbon = (operations, dataSizeKB) => {
  // Estimate: 0.00002 kg CO2 per database operation + data transfer
  const operationCO2 = operations * 0.00002;
  const transferCO2 = dataSizeKB * 0.00001;
  return operationCO2 + transferCO2;
};

// Usage example in your routes
app.get('/api/donations', async (req, res) => {
  const startTime = Date.now();
  
  const donations = await Donation.find().lean();
  const dataSize = JSON.stringify(donations).length / 1024; // KB
  
  const dbCarbon = calculateDBCarbon(1, dataSize); // 1 operation + data size
  
  console.log(`Database Carbon: ${(dbCarbon * 1000).toFixed(3)} grams`);
  
  res.json(donations);
});