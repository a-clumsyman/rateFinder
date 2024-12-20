import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { Navbar, Footer } from "../../components";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const termMap = {
  '1_year': '1-year',
  '2_year': '2-year',
  '3_year': '3-year',
  '4_year': '4-year',
  '5_year': '5-year'
};

export default function GICRates() {
  const [ratesData, setRatesData] = useState({
    comparison: { rows: [], headers: [] },
    brokers: { rows: [], headers: [] }
  });
  const [selectedHighlightTerm, setSelectedHighlightTerm] = useState('1_year');
  const [sortConfig, setSortConfig] = useState({
    term: '1_year',
    direction: 'desc'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const [comparisonRes, brokersRes] = await Promise.all([
          fetch('/data/tables/gic_comparison_raw.json'),
          fetch('/data/tables/gic_brokers_raw.json')
        ]);
        
        if (!comparisonRes.ok) {
          throw new Error(`Failed to fetch comparison data: ${comparisonRes.status} ${comparisonRes.statusText}`);
        }
        if (!brokersRes.ok) {
          throw new Error(`Failed to fetch brokers data: ${brokersRes.status} ${brokersRes.statusText}`);
        }

        const comparisonText = await comparisonRes.text();
        const brokersText = await brokersRes.text();

        let comparison, brokers;
        try {
          comparison = JSON.parse(comparisonText);
          brokers = JSON.parse(brokersText);
        } catch (e) {
          console.error('Comparison response:', comparisonText);
          console.error('Brokers response:', brokersText);
          throw new Error('Invalid JSON in response');
        }
        
        setRatesData({ comparison, brokers });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rates:', err);
        setError(err.message || 'Failed to load rates data. Please try again later.');
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const terms = [
    { id: '1_year', label: '1 Year' },
    { id: '2_year', label: '2 Years' },
    { id: '3_year', label: '3 Years' },
    { id: '4_year', label: '4 Years' },
    { id: '5_year', label: '5 Years' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get column indices for institution/broker name and selected term rate
  const getColumnIndices = (headers) => {
    const nameIndex = 0; // First column is always name
    const rateIndex = headers.findIndex(h => h === termMap[sortConfig.term]);
    return { nameIndex, rateIndex };
  };

  // Sort rows by rate for the selected term
  const sortRows = (rows, headers) => {
    const { nameIndex, rateIndex } = getColumnIndices(headers);
    return [...rows].sort((a, b) => {
      const rateA = parseFloat(a[rateIndex]) || 0;
      const rateB = parseFloat(b[rateIndex]) || 0;
      return sortConfig.direction === 'desc' ? rateB - rateA : rateA - rateB;
    });
  };

  const handleSort = (term) => {
    setSortConfig(prev => ({
      term,
      direction: prev.term === term && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const sortedInstitutions = sortRows(ratesData.comparison.rows, ratesData.comparison.headers);
  const sortedBrokers = sortRows(ratesData.brokers.rows, ratesData.brokers.headers);

  // Get highest rates for each term
  const getHighestRates = () => {
    const highestRates = {};
    terms.forEach(term => {
      const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[term.id]);
      const allRates = [...sortedInstitutions, ...sortedBrokers].map((row, idx) => ({
        rate: parseFloat(row[rateIndex]) || 0,
        institution: row[0],
        isBank: idx < sortedInstitutions.length
      }));
      
      // Sort by rate and get top 4
      const sortedRates = allRates.sort((a, b) => b.rate - a.rate).slice(0, 4);
      highestRates[term.id] = sortedRates;
    });
    return highestRates;
  };

  const highestRates = getHighestRates();

  return (
    <main className="relative bg-primary">
      <Navbar />
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-theme-purple font-merriweather mb-4">
              Best GIC Rates in Canada
            </h1>
            <p className="text-lg text-gray-8 font-lato max-w-3xl mx-auto">
              Compare Guaranteed Investment Certificate (GIC) rates from major Canadian banks, credit unions, and brokers.
            </p>
          </div>

          {/* Highest Rates Summary */}
          <div className="bg-white rounded-lg shadow-3xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-theme-purple font-merriweather">Current Highest GIC Rates</h2>
              <div className="flex gap-2">
                {terms.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => setSelectedHighlightTerm(term.id)}
                    className={classNames(
                      'px-3 py-1 rounded text-sm font-medium transition-colors font-lato',
                      selectedHighlightTerm === term.id
                        ? 'bg-theme-purple text-white'
                        : 'bg-gray-100 text-gray-8 hover:bg-gray-200'
                    )}
                  >
                    {term.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highestRates[selectedHighlightTerm]?.map((rate, index) => (
                <div 
                  key={rate.institution} 
                  className={classNames(
                    "p-4 border rounded-lg",
                    index === 0 ? "bg-[#F6F0FF] border-theme-purple" : "bg-white"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-8 font-lato">
                      {index === 0 ? "Best Rate" : `#${index + 1} Rate`}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-8 font-lato">
                      {rate.isBank ? 'Bank' : 'Broker'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-theme-purple">{rate.rate}%</p>
                  <p className="text-sm text-gray-8 mt-1 font-lato">{rate.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Tables */}
          <Tab.Group>
            <Tab.List className="flex space-x-4 rounded-xl bg-white p-1 mb-6 max-w-md mx-auto shadow-3xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 font-lato',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-theme-purple focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-theme-purple text-white shadow'
                      : 'text-gray-8 hover:bg-gray-100 hover:text-gray-900'
                  )
                }
              >
                Banks & Credit Unions
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 font-lato',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-theme-purple focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-theme-purple text-white shadow'
                      : 'text-gray-8 hover:bg-gray-100 hover:text-gray-900'
                  )
                }
              >
                Brokers
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Institution
                        </th>
                        {terms.map(term => (
                          <th 
                            key={term.id}
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort(term.id)}
                          >
                            {term.label}
                            {sortConfig.term === term.id && (
                              <span className="ml-1">
                                {sortConfig.direction === 'desc' ? '↓' : '↑'}
                              </span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedInstitutions.map((row, idx) => (
                        <tr key={row[0]} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {row[0]}
                          </td>
                          {terms.map(term => {
                            const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[term.id]);
                            return (
                              <td key={term.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                {row[rateIndex]}%
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Broker
                        </th>
                        {terms.map(term => (
                          <th 
                            key={term.id}
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort(term.id)}
                          >
                            {term.label}
                            {sortConfig.term === term.id && (
                              <span className="ml-1">
                                {sortConfig.direction === 'desc' ? '↓' : '↑'}
                              </span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedBrokers.map((row, idx) => (
                        <tr key={row[0]} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {row[0]}
                          </td>
                          {terms.map(term => {
                            const rateIndex = ratesData.brokers.headers.findIndex(h => h === termMap[term.id]);
                            return (
                              <td key={term.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                {row[rateIndex]}%
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Market Insights Section */}
          <div className="mt-12 space-y-8">
            {/* Rate Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Average Rates Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Average Rates by Term</h3>
                <div className="space-y-3">
                  {terms.map(term => {
                    const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[term.id]);
                    const allRates = [
                      ...ratesData.comparison.rows.map(row => parseFloat(row[rateIndex]) || 0),
                      ...ratesData.brokers.rows.map(row => parseFloat(row[rateIndex]) || 0)
                    ];
                    const avgRate = (allRates.reduce((a, b) => a + b, 0) / allRates.length).toFixed(2);
                    
                    return (
                      <div key={term.id} className="flex justify-between items-center">
                        <span className="text-gray-600">{term.label}</span>
                        <span className="font-semibold text-blue-600">{avgRate}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rate Spread Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rate Spread Analysis</h3>
                <div className="space-y-3">
                  {terms.map(term => {
                    const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[term.id]);
                    const allRates = [
                      ...ratesData.comparison.rows.map(row => parseFloat(row[rateIndex]) || 0),
                      ...ratesData.brokers.rows.map(row => parseFloat(row[rateIndex]) || 0)
                    ];
                    const maxRate = Math.max(...allRates);
                    const minRate = Math.min(...allRates);
                    const spread = (maxRate - minRate).toFixed(2);
                    
                    return (
                      <div key={term.id} className="flex justify-between items-center">
                        <span className="text-gray-600">{term.label} Spread</span>
                        <div className="text-right">
                          <span className="font-semibold text-blue-600">{spread}%</span>
                          <div className="text-xs text-gray-500">
                            ({minRate}% - {maxRate}%)
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Market Leaders Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Market Leaders</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Top Bank/Credit Union</h4>
                    {(() => {
                      const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[selectedHighlightTerm]);
                      const topBank = sortedInstitutions[0];
                      return (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{topBank[0]}</span>
                          <span className="font-semibold text-blue-600">{topBank[rateIndex]}%</span>
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Top Broker</h4>
                    {(() => {
                      const rateIndex = ratesData.brokers.headers.findIndex(h => h === termMap[selectedHighlightTerm]);
                      const topBroker = sortedBrokers[0];
                      return (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{topBroker[0]}</span>
                          <span className="font-semibold text-blue-600">{topBroker[rateIndex]}%</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Findings Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Market Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Rate Trends</h4>
                  <ul className="space-y-2 text-gray-600">
                    {(() => {
                      const insights = [];
                      const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[selectedHighlightTerm]);
                      const avgRate = (
                        [...sortedInstitutions, ...sortedBrokers]
                          .map(row => parseFloat(row[rateIndex]) || 0)
                          .reduce((a, b) => a + b, 0) / 
                        (sortedInstitutions.length + sortedBrokers.length)
                      ).toFixed(2);

                      const brokerAvg = (
                        sortedBrokers
                          .map(row => parseFloat(row[rateIndex]) || 0)
                          .reduce((a, b) => a + b, 0) / 
                        sortedBrokers.length
                      ).toFixed(2);

                      const bankAvg = (
                        sortedInstitutions
                          .map(row => parseFloat(row[rateIndex]) || 0)
                          .reduce((a, b) => a + b, 0) / 
                        sortedInstitutions.length
                      ).toFixed(2);

                      insights.push(
                        <li key="avg">• Average {terms.find(t => t.id === selectedHighlightTerm)?.label} GIC rate is {avgRate}%</li>
                      );

                      if (parseFloat(brokerAvg) > parseFloat(bankAvg)) {
                        insights.push(
                          <li key="comparison">• Brokers are offering higher rates on average ({brokerAvg}% vs {bankAvg}%)</li>
                        );
                      } else {
                        insights.push(
                          <li key="comparison">• Banks are offering higher rates on average ({bankAvg}% vs {brokerAvg}%)</li>
                        );
                      }

                      return insights;
                    })()}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Market Analysis</h4>
                  <ul className="space-y-2 text-gray-600">
                    {(() => {
                      const insights = [];
                      const rateIndex = ratesData.comparison.headers.findIndex(h => h === termMap[selectedHighlightTerm]);
                      
                      // Calculate rate distribution
                      const allRates = [...sortedInstitutions, ...sortedBrokers]
                        .map(row => parseFloat(row[rateIndex]) || 0);
                      const maxRate = Math.max(...allRates);
                      const competitiveThreshold = maxRate - 0.2; // Within 0.2% of the highest rate
                      const competitiveCount = allRates.filter(rate => rate >= competitiveThreshold).length;
                      const competitivePercentage = ((competitiveCount / allRates.length) * 100).toFixed(0);

                      insights.push(
                        <li key="competitive">• {competitivePercentage}% of institutions offer rates within 0.2% of the highest rate</li>
                      );

                      // Add insight about rate spread
                      const minRate = Math.min(...allRates);
                      const spread = (maxRate - minRate).toFixed(2);
                      insights.push(
                        <li key="spread">• Rate spread of {spread}% indicates {spread > 0.5 ? 'high' : 'low'} market competition</li>
                      );

                      return insights;
                    })()}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Highest GIC Rates with Historical Changes */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 -mt-10 shadow-lg">
              <h2 className="text-3xl font-bold mb-2">
                What are the Highest GIC Rates available in the market?
              </h2>
              <p className="text-blue-100">As of December 19, 2024</p>
            </div>
            
            <div className="space-y-6 mt-8">
              {[
                {
                  term: '3-month',
                  rate: '3.1',
                  provider: 'EQ Bank',
                  change30: -45,
                  change7: -45
                },
                {
                  term: '6-month',
                  rate: '4.0',
                  provider: 'Saven Financial',
                  change30: -20,
                  change7: -10
                },
                {
                  term: '1-year',
                  rate: '4.2',
                  provider: 'WealthONE',
                  change30: 0,
                  change7: 0
                },
                {
                  term: '2-year',
                  rate: '4.05',
                  provider: 'WealthONE',
                  change30: 0,
                  change7: 0
                },
                {
                  term: '3-year',
                  rate: '4.05',
                  provider: 'WealthONE',
                  change30: 0,
                  change7: 0
                },
                {
                  term: '4-year',
                  rate: '3.95',
                  provider: 'WealthONE',
                  change30: 0,
                  change7: 0
                },
                {
                  term: '5-year',
                  rate: '4.05',
                  provider: 'WealthONE',
                  change30: 0,
                  change7: 0
                }
              ].map((item, index) => (
                <div key={item.term} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        The Highest {item.term} GIC Rate is {item.rate}%, offered by{' '}
                        <span className="text-blue-600">{item.provider}</span>
                      </h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className={`${item.change30 > 0 ? 'text-green-600' : item.change30 < 0 ? 'text-red-600' : 'text-gray-600'} font-medium`}>
                          {item.change30 > 0 ? '+' : ''}{item.change30} bps
                        </span>
                        {' '}lower than 30 days ago and{' '}
                        <span className={`${item.change7 > 0 ? 'text-green-600' : item.change7 < 0 ? 'text-red-600' : 'text-gray-600'} font-medium`}>
                          {item.change7 > 0 ? '+' : ''}{item.change7} bps
                        </span>
                        {' '}lower than 7 days ago
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
                        <span className="text-xl font-bold">{item.rate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Bank Rate Cards */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compare Canada's Best GIC Rates</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Wealth One Bank of Canada",
                  rate: "4.20",
                  minInvestment: "$1000",
                  description: "Wealth One Bank of Canada offers competitive GIC rates with CDIC insurance protection."
                },
                {
                  name: "ICICI Bank",
                  rate: "4.15",
                  minInvestment: "$1000",
                  description: "ICICI Bank provides secure GIC investments with competitive rates and flexible terms."
                },
                {
                  name: "MCAN Financial",
                  rate: "4.05",
                  minInvestment: "$1000",
                  description: "MCAN Financial offers reliable GIC investments with competitive rates and CDIC insurance coverage."
                },
                {
                  name: "Oaken Financial",
                  rate: "4.05",
                  minInvestment: "$1000",
                  description: "Oaken Financial offers GIC rates that are consistently higher than the average rates offered by other financial institutions in Canada. Their GICs are eligible for CDIC insurance."
                },
                {
                  name: "Peoples Trust*",
                  rate: "4.05",
                  minInvestment: "$1000",
                  description: "Peoples Trust offers secure GIC investments with competitive rates and CDIC protection."
                },
                {
                  name: "Achieva Financial",
                  rate: "4.05",
                  minInvestment: "$1000",
                  description: "Achieva Financial provides competitive GIC rates with flexible investment options."
                },
                {
                  name: "Saven Financial",
                  rate: "4.00",
                  minInvestment: "$1000",
                  description: "Saven Financial offers reliable GIC investments with competitive rates and flexible terms."
                }
              ].map((bank) => (
                <div key={bank.name} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{bank.name}'s Best GIC Rate</h3>
                          <p className="text-sm text-gray-600 mt-2">{bank.description}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-3xl font-bold text-blue-600">{bank.rate}%</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Minimum: {bank.minInvestment}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated Section */}
          <div className="mt-8 text-sm text-gray-500 text-center">
            Last updated: {ratesData.comparison.last_updated ? new Date(ratesData.comparison.last_updated).toLocaleDateString() : 'N/A'}
          </div>

          {/* About GICs Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About GICs</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                A GIC (Guaranteed Investment Certificate) is a secure investment that guarantees a specific rate of return over a fixed period. 
                GICs are considered low-risk investments as they offer a secure and predictable return on your money. At banks, they're protected 
                by the CDIC for up to $100,000.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">What Determines GIC Interest Rates</h3>
              <p className="mb-4">
                GIC interest rates are directly related to your bank's prime rate, which is influenced by the Bank of Canada Rate. When the Bank 
                of Canada Rate increases, bank prime rates and GIC rates typically follow.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Factors That Increase Rates:</h4>
                  <ul className="list-disc list-inside">
                    <li>A strong economy</li>
                    <li>Inflation</li>
                    <li>Higher interest rates in other countries</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Factors That Decrease Rates:</h4>
                  <ul className="list-disc list-inside">
                    <li>A weak economy</li>
                    <li>Deflation</li>
                    <li>Lower interest rates in other countries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* GIC Interest Calculator Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How GIC Interest is Calculated</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                For fixed rate GICs with a term longer than one year, the interest is usually compounded annually. This means that 
                the interest earned in the first year is added to the initial GIC investment, and subsequent interest is calculated 
                based on this new total.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Compound Interest Formula</h3>
                <p className="text-blue-800 mb-2">A = P(1 + r)ᵗ</p>
                <div className="text-sm text-blue-700">
                  <p>Where:</p>
                  <ul className="list-disc list-inside">
                    <li>A = Final amount you will receive</li>
                    <li>P = Initial GIC investment</li>
                    <li>r = Interest rate (as a decimal)</li>
                    <li>t = Number of years</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Example: 5-Year GIC with Annual Compounding</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="mb-4">Let's say you invest $1,000 in a 5-year GIC at {sortedInstitutions[0]?.[0]} with a rate of {sortedInstitutions[0]?.[ratesData.comparison.headers.findIndex(h => h === termMap['5_year'])]}%</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Year</th>
                        <th className="px-4 py-2 text-right">Starting Balance</th>
                        <th className="px-4 py-2 text-right">Interest Earned</th>
                        <th className="px-4 py-2 text-right">Ending Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(() => {
                        const rate = parseFloat(sortedInstitutions[0]?.[ratesData.comparison.headers.findIndex(h => h === termMap['5_year'])]) / 100;
                        let balance = 1000;
                        return Array.from({ length: 5 }, (_, i) => {
                          const interest = balance * rate;
                          const endBalance = balance + interest;
                          const row = (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-2">Year {i + 1}</td>
                              <td className="px-4 py-2 text-right">${balance.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">${interest.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">${endBalance.toFixed(2)}</td>
                            </tr>
                          );
                          balance = endBalance;
                          return row;
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Interest Payment Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Compound Interest</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Interest is reinvested with principal</li>
                    <li>Earn interest on your interest</li>
                    <li>Higher total return</li>
                    <li>Best for long-term growth</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Simple Interest (Paid Out)</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Interest paid to your account</li>
                    <li>Regular income stream</li>
                    <li>Lower total return</li>
                    <li>Good for income needs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Pro Tip</h4>
                <p className="text-yellow-800">
                  For the highest returns, choose annual compounding over monthly or quarterly compounding options, 
                  as annual compounding GICs typically offer higher base rates that more than make up for the less 
                  frequent compounding.
                </p>
              </div>
            </div>
          </div>

          {/* History of GICs Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">History of GICs in Canada</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                Guaranteed Investment Certificates have been a cornerstone of Canadian banking since the early 1900s. They were introduced 
                to provide Canadians with a secure way to save money while earning guaranteed returns. Over the decades, GICs have evolved 
                to include various terms and options, but their fundamental promise of guaranteed returns remains unchanged.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 my-4">
                <h4 className="font-semibold mb-2">Key Historical Milestones:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>1967: Introduction of the Canada Deposit Insurance Corporation (CDIC)</li>
                  <li>1980s: Introduction of market-linked GICs</li>
                  <li>1990s: Development of online GIC purchasing options</li>
                  <li>2000s: Expansion of GIC options in registered accounts (TFSA, RRSP)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* International Student GIC Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">GIC Amount For International Students (SDS)</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                International students applying through the Student Direct Stream (SDS) are required to purchase a GIC as part of their 
                study permit application. This requirement helps demonstrate that students have the financial means to support themselves 
                during their studies in Canada.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-2">Key Requirements:</h4>
                <ul className="list-disc list-inside space-y-2 text-blue-800">
                  <li>Minimum investment of $10,000 CAD</li>
                  <li>Funds released in installments after arrival in Canada</li>
                  <li>First installment available upon arrival</li>
                  <li>Remaining amount distributed over 10-12 months</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                Note: Requirements may vary by financial institution and specific program details.
              </p>
            </div>
          </div>

          {/* Investment Comparison Section */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Differences Between Investment Options
            </h2>
            
            {/* Historical Rates Graph */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Historical GIC Interest Rates (2008-2024)</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="relative aspect-[16/9] w-full">
                  <img 
                    src="/graph.png" 
                    alt="GIC Interest Rates Historical Chart" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Investment Types Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* HISA Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <h3 className="text-xl font-bold text-white mb-2">High Interest Savings Account (HISA)</h3>
                  <p className="text-blue-100 text-sm">Best for short-term savings and emergency funds</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Instant access to funds</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Variable interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">No lock-in period</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">CDIC insured up to $100,000</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Risk Level: <span className="font-medium text-blue-600">Very Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GIC Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
                  <h3 className="text-xl font-bold text-white mb-2">Guaranteed Investment Certificate (GIC)</h3>
                  <p className="text-indigo-100 text-sm">Best for guaranteed returns and medium-term goals</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Guaranteed fixed returns</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Terms from 30 days to 10 years</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Higher rates than HISA</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">CDIC insured up to $100,000</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Risk Level: <span className="font-medium text-indigo-600">Low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mutual Fund Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
                  <h3 className="text-xl font-bold text-white mb-2">Mutual Fund</h3>
                  <p className="text-purple-100 text-sm">Best for long-term growth and diversification</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Higher potential returns</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Professional management</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Market-based returns</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Not CDIC insured</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Risk Level: <span className="font-medium text-purple-600">Moderate to High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Bottom Line</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                GICs are a low-risk investment choice that has been around in Canada for over 100 years. They offer stability and fixed returns, 
                so they are one of the most popular investment options in the country. Depending on your investment goals, GICs may be the right 
                option for you.
              </p>
              <p className="mb-4">
                Research and compare rates from various financial institutions to find one that aligns with your investment goals and risk profile. 
                Keep in mind that GIC rates are subject to change and may vary depending on the type of GIC chosen, the term length, and the minimum 
                investment amount.
              </p>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Important Notes:</h3>
            <ul className="space-y-2">
              <li>* Rates shown are subject to change without notice. Please contact the financial
                institution directly to confirm current rates.</li>
              <li>* Minimum investment amounts and other conditions may apply.</li>
              <li>* Interest rates are for non-registered GICs. Registered (TFSA, RRSP, etc.) rates may differ.</li>
              <li>* Data source: highinterestsavings.ca</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 