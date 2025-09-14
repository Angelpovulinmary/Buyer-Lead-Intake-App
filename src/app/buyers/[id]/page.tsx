// src/app/buyers/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { bhkLabels, timelineLabels, Buyer } from '@/lib/constants';

export default function BuyerDetail({ params }: { params: { id: string } }) {
  const [buyer, setBuyer] = useState<Buyer | null>(null); // ✅ use proper typing

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const res = await fetch(`/api/buyers/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch buyer');
        }
        const data = await res.json();
        setBuyer(data.buyer); // ✅ data.buyer is expected to be Buyer
      } catch (error) {
        console.error('Error fetching buyer:', error);
      }
    };

    fetchBuyer();
  }, [params.id]);

  if (!buyer) return <div>Loading...</div>;

  return (
    <div>
      <h1>{buyer.fullName}</h1>
      <p>BHK: {bhkLabels[buyer.bhk]}</p> {/* ✅ Now this is type-safe */}
      <p>Timeline: {timelineLabels[buyer.timeline]}</p> {/* ✅ Also type-safe */}
      {/* Add other fields here */}
    </div>
  );
}

