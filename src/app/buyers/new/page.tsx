// src/app/buyers/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBuyerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Chandigarh',
    propertyType: 'Apartment',
    bhk: '',
    purpose: 'Buy',
    budgetMin: '',
    budgetMax: '',
    timeline: '0-3m',
    source: 'Website',
    notes: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/buyers/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags: formData.tags.split(',') }),
      });
      if (res.ok) {
        alert('Lead created!');
        router.push('/buyers');
      } else {
        const data = await res.json();
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Lead</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full" />
        
        <select name="city" value={formData.city} onChange={handleChange} className="border p-2 w-full">
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mohali">Mohali</option>
          <option value="Zirakpur">Zirakpur</option>
          <option value="Panchkula">Panchkula</option>
          <option value="Other">Other</option>
        </select>

        <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="border p-2 w-full">
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
        </select>

        <input name="bhk" value={formData.bhk} onChange={handleChange} placeholder="BHK" className="border p-2 w-full" />

        <select name="purpose" value={formData.purpose} onChange={handleChange} className="border p-2 w-full">
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <input name="budgetMin" value={formData.budgetMin} onChange={handleChange} placeholder="Budget Min" type="number" className="border p-2 w-full" />
        <input name="budgetMax" value={formData.budgetMax} onChange={handleChange} placeholder="Budget Max" type="number" className="border p-2 w-full" />

        <select name="timeline" value={formData.timeline} onChange={handleChange} className="border p-2 w-full">
          <option value="0-3m">0-3 months</option>
          <option value="3-6m">3-6 months</option>
          <option value=">6m">More than 6 months</option>
          <option value="Exploring">Exploring</option>
        </select>

        <select name="source" value={formData.source} onChange={handleChange} className="border p-2 w-full">
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Call">Call</option>
          <option value="Other">Other</option>
        </select>

        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="border p-2 w-full" />

        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="border p-2 w-full" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Lead</button>
      </form>
    </div>
  );
}
