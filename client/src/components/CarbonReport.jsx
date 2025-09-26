import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/api';

const CarbonReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarbonReport = async () => {
      try {
        const carbonReport = await adminApi.getCarbonReport();
        setReport(carbonReport);
      } catch (error) {
        console.error('Error fetching carbon report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarbonReport();
  }, []);

  if (loading) return <div>Loading carbon report...</div>;
  if (!report) return <div>No carbon data available</div>;

  return (
    <div className="carbon-report">
      <h3>🌱 Carbon Emissions Report</h3>
      <div className="carbon-stats">
        <div className="stat-card">
          <h4>Total API Requests</h4>
          <p>{report.totalRequests}</p>
        </div>
        <div className="stat-card">
          <h4>Data Transferred</h4>
          <p>{(report.totalDataTransferred / 1024).toFixed(2)} MB</p>
        </div>
        <div className="stat-card">
          <h4>Total CO2 Emissions</h4>
          <p>{(report.totalCO2Emissions * 1000).toFixed(2)} grams</p>
        </div>
        <div className="stat-card">
          <h4>Avg per Request</h4>
          <p>{(report.averageCO2PerRequest * 1000).toFixed(3)} grams</p>
        </div>
      </div>
      <p><small>Report generated: {new Date(report.reportGenerated).toLocaleString()}</small></p>
    </div>
  );
};

export default CarbonReport;