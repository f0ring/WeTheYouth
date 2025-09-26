import React, { useState, useEffect } from 'react';

const CarbonMonitor = () => {
  const [carbonData, setCarbonData] = useState({
    pageLoads: 0,
    totalCO2: 0,
    dataTransferred: 0,
    sessionStart: new Date()
  });

  // Simple carbon calculation function (since the package might not work perfectly)
  const calculateCO2 = (dataSizeKB) => {
    // Average: 0.00015 kg CO2 per KB transferred
    return dataSizeKB * 0.00015;
  };

  useEffect(() => {
    const trackPageLoad = () => {
      // Estimate page size (you can make this more accurate)
      const estimatedPageSize = 250; // KB - estimate your average page size
      const co2ForThisLoad = calculateCO2(estimatedPageSize);
      
      setCarbonData(prev => ({
        ...prev,
        pageLoads: prev.pageLoads + 1,
        totalCO2: prev.totalCO2 + co2ForThisLoad,
        dataTransferred: prev.dataTransferred + estimatedPageSize
      }));
    };

    // Track initial load
    trackPageLoad();

    // Track route changes (SPA navigation)
    const handleRouteChange = () => {
      setTimeout(trackPageLoad, 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Calculate savings compared to average website
  const averageWebsiteCO2 = carbonData.pageLoads * 0.00015 * 500; // Average site: 500KB/page
  const co2Saved = averageWebsiteCO2 - carbonData.totalCO2;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      fontSize: '12px',
      maxWidth: '250px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      zIndex: 999
    }}>
      <h5 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>🌱 Carbon Footprint</h5>
      <div style={{ lineHeight: '1.4' }}>
        <div>Page Loads: <strong>{carbonData.pageLoads}</strong></div>
        <div>Data: <strong>{(carbonData.dataTransferred / 1024).toFixed(2)} MB</strong></div>
        <div>CO2: <strong>{(carbonData.totalCO2 * 1000).toFixed(2)} grams</strong></div>
        <div style={{ fontSize: '10px', marginTop: '5px', opacity: '0.8' }}>
          Saved: {co2Saved > 0 ? `${(co2Saved * 1000).toFixed(2)}g CO2` : 'Efficient!'}
        </div>
      </div>
    </div>
  );
};

export default CarbonMonitor;