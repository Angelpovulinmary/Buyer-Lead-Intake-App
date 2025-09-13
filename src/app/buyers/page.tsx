// src/app/buyers/page.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Buyer {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  propertyType: string;
  budgetMin?: number;
  budgetMax?: number;
  timeline: string;
  status: string;
  updatedAt: string;
}

export default function BuyersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    fetch(`/api/buyers?${params.toString()}`)
      .then(res => res.json())
      .then(data => setBuyers(data.buyers))
      .catch(err => console.error('Failed to load buyers', err));
  }, [searchParams, page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buyer Leads</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">City</th>
            <th className="border border-gray-300 p-2">Property Type</th>
            <th className="border border-gray-300 p-2">Budget</th>
            <th className="border border-gray-300 p-2">Timeline</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map(buyer => (
            <tr key={buyer.id}>
              <td className="border border-gray-300 p-2">{buyer.fullName}</td>
              <td className="border border-gray-300 p-2">{buyer.phone}</td>
              <td className="border border-gray-300 p-2">{buyer.city}</td>
              <td className="border border-gray-300 p-2">{buyer.propertyType}</td>
              <td className="border border-gray-300 p-2">
                {buyer.budgetMin ?? 'N/A'} - {buyer.budgetMax ?? 'N/A'}
              </td>
              <td className="border border-gray-300 p-2">{buyer.timeline}</td>
              <td className="border border-gray-300 p-2">{buyer.status}</td>
              <td className="border border-gray-300 p-2">{new Date(buyer.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-x-2">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="px-4 py-2 bg-gray-200 rounded">Previous</button>
        <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200 rounded">Next</button>
      </div>
    </div>
  );
}
