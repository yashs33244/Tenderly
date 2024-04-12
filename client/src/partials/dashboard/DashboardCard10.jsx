import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardCard10() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tenders/all-tenders');
      setTenders(response.data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  };

  const toggleActiveStatus = async (tenderId) => {
    try {
      await axios.put(`http://localhost:3000/api/tenders/${tenderId}/toggle-active`);
      fetchTenders();
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const deleteTender = async (tenderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tenders/${tenderId}`);
      fetchTenders();
    } catch (error) {
      console.error('Error deleting tender:', error);
    }
  };

  const fetchBidderInfo = async (tenderId, bidId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/bids/${bidId}/user`);
      console.log('Bidder information:', response.data);
    } catch (error) {
      console.error('Error fetching bidder information:', error);
    }
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Tenders</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Actions</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Bidder Info</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {tenders.map((tender) => (
                <tr key={tender._id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-slate-800 dark:text-slate-100">{tender.title}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-light text-slate-800 dark:text-slate-100">{tender.publishedBy}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">{tender.isActive ? 'Active' : 'Inactive'}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-lg text-center">
                      <button
                        onClick={() => fetchBidderInfo(tender._id, '66196137d45cc753fdcebe10')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Bidder Info
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;