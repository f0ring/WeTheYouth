// server/middleware/carbonTracker.js
import { co2 } from '@tgwf/co2';

// Initialize the co2 calculator
const carbonCalculator = new co2();

const carbonTracker = (req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;
  let responseData = '';

  // Capture response data
  res.send = function(data) {
    if (data) {
      responseData = data;
    }
    originalSend.call(this, data);
  };

  // After response is sent, calculate carbon
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    
    // Calculate response size
    let dataSize = 0;
    if (responseData) {
      try {
        dataSize = Buffer.byteLength(JSON.stringify(responseData), 'utf8');
      } catch (error) {
        dataSize = Buffer.byteLength(String(responseData), 'utf8');
      }
    }

    // Calculate CO2 emissions (in grams)
    const emissions = carbonCalculator.perVisit(dataSize / 1024); // Convert to KB
    
    // Log carbon data (only for non-static assets)
    if (!req.path.includes('.') && req.path !== '/') {
      console.log(`🌍 Carbon Footprint - ${new Date().toISOString()}`);
      console.log(`   Endpoint: ${req.method} ${req.path}`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Response Size: ${(dataSize / 1024).toFixed(2)} KB`);
      console.log(`   Response Time: ${responseTime}ms`);
      console.log(`   CO2 Emissions: ${emissions.toFixed(6)} grams`);
      console.log(`   Equivalent: ${(emissions * 1000).toFixed(3)} mg CO2`);
      console.log('   ---');
    }

    // Store carbon data for reporting
    req.app.locals.carbonData = req.app.locals.carbonData || [];
    req.app.locals.carbonData.push({
      timestamp: new Date(),
      endpoint: `${req.method} ${req.path}`,
      dataSizeKB: dataSize / 1024,
      responseTime,
      co2Emissions: emissions
    });
  });

  next();
};

// Helper function to get carbon report
export const getCarbonReport = (app) => {
  const data = app.locals.carbonData || [];
  const totalCO2 = data.reduce((sum, entry) => sum + entry.co2Emissions, 0);
  const totalData = data.reduce((sum, entry) => sum + entry.dataSizeKB, 0);
  
  return {
    totalRequests: data.length,
    totalDataTransferred: totalData,
    totalCO2Emissions: totalCO2,
    averageCO2PerRequest: totalCO2 / data.length || 0,
    reportGenerated: new Date()
  };
};

export default carbonTracker;