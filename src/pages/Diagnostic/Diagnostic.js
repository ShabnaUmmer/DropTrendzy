// src/pages/Diagnostic/Diagnostic.js
import React, { useState } from 'react';
import { shopifyClient } from '../../shopify/shopifyClient';

const Diagnostic = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [curlCommand, setCurlCommand] = useState('');

  const runDiagnostic = async () => {
    setTesting(true);
    setResults(null);
    
    const diagnostics = [];
    
    try {
      // Test 1: Basic fetch
      diagnostics.push({ test: 'Network Connection', status: 'running' });
      const canFetch = await fetch('https://droptrendzy.myshopify.com').then(() => true).catch(() => false);
      diagnostics[0] = { test: 'Network Connection', status: canFetch ? 'passed' : 'failed' };
      
      // Test 2: API endpoint
      diagnostics.push({ test: 'API Endpoint Reachable', status: 'running' });
      const endpointTest = await fetch(shopifyClient.endpoint, { method: 'HEAD' }).then(r => r.ok).catch(() => false);
      diagnostics[1] = { test: 'API Endpoint Reachable', status: endpointTest ? 'passed' : 'failed' };
      
      // Test 3: Token test with curl command
      diagnostics.push({ test: 'Storefront Token', status: 'running' });
      
      // Generate curl command for user to test
      const curl = `curl -X POST "${shopifyClient.endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "X-Shopify-Storefront-Access-Token: ${shopifyClient.storefrontAccessToken}" \\
  -d '{"query": "{ shop { name } }"}'`;
      
      setCurlCommand(curl);
      
      // Try API call
      const tokenTest = await shopifyClient.testConnection();
      diagnostics[2] = { 
        test: 'Storefront Token', 
        status: tokenTest.success ? 'passed' : 'failed',
        details: tokenTest.message
      };
      
    } catch (error) {
      console.error('Diagnostic error:', error);
    } finally {
      setTesting(false);
      setResults(diagnostics);
    }
  };

  return (
    <div className="diagnostic-page">
      <h2>🔧 Shopify Connection Diagnostic</h2>
      
      <button 
        onClick={runDiagnostic}
        disabled={testing}
        className="btn-modern"
      >
        {testing ? 'Running Tests...' : 'Run Diagnostic'}
      </button>
      
      {results && (
        <div className="diagnostic-results">
          <h3>Test Results:</h3>
          {results.map((result, index) => (
            <div key={index} className={`test-result ${result.status}`}>
              <span className="test-name">{result.test}</span>
              <span className={`test-status ${result.status}`}>
                {result.status === 'passed' ? '✅' : 
                 result.status === 'failed' ? '❌' : '🔄'}
                {result.status}
              </span>
              {result.details && <p className="test-details">{result.details}</p>}
            </div>
          ))}
        </div>
      )}
      
      {curlCommand && (
        <div className="curl-command">
          <h4>Test with curl:</h4>
          <pre>{curlCommand}</pre>
          <p>Run this in terminal to test your token directly</p>
        </div>
      )}
      
      <div className="troubleshooting">
        <h4>🔧 Common Solutions:</h4>
        <ol>
          <li><strong>Check store URL:</strong> Make sure store exists at the domain</li>
          <li><strong>Verify token scopes:</strong> Need read_products, read_collections</li>
          <li><strong>Check API version:</strong> Try 2023-10 or 2023-07</li>
          <li><strong>Store status:</strong> Ensure store is not in development mode</li>
        </ol>
      </div>
    </div>
  );
};

export default Diagnostic;