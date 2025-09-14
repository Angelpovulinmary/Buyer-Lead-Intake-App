

// src/app/buyers/new/page.tsx
// src/app/buyers/new/page.tsx or wherever this file is

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComboBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { bhkLabels, timelineLabels, BHK, Timeline } from '@/lib/constants';

// Create options from labels
const bhkOptions = Object.entries(bhkLabels).map(([key, label]) => ({
  text: label,
  value: key as BHK,
}));

const timelineOptions = Object.entries(timelineLabels).map(([key, label]) => ({
  text: label,
  value: key as Timeline,
}));

export default function NewBuyerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Chandigarh',
    propertyType: 'Apartment',
    bhk: 'ONE' as BHK, // default valid enum key
    purpose: 'Buy',
    budgetMin: '',
    budgetMax: '',
    timeline: 'ZERO_TO_THREE_M' as Timeline, // default valid enum key
    source: 'Website',
    notes: '',
    tags: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleComboChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/buyers/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map((tag) => tag.trim()),
        }),
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
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />

        <select name="city" value={formData.city} onChange={handleChange} className="border p-2 w-full">
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mohali">Mohali</option>
          <option value="Zirakpur">Zirakpur</option>
          <option value="Panchkula">Panchkula</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
        </select>

        {/* BHK ComboBox using enum keys */}
        <ComboBoxComponent
          placeholder="Select BHK"
          dataSource={bhkOptions}
          fields={{ text: 'text', value: 'value' }}
          value={formData.bhk}
          change={(e: ChangeEventArgs) => handleComboChange('bhk', e.value as BHK)}
          className="border p-2 w-full"
        />

        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <input
          name="budgetMin"
          value={formData.budgetMin}
          onChange={handleChange}
          placeholder="Budget Min"
          type="number"
          className="border p-2 w-full"
        />
        <input
          name="budgetMax"
          value={formData.budgetMax}
          onChange={handleChange}
          placeholder="Budget Max"
          type="number"
          className="border p-2 w-full"
        />

        {/* Timeline ComboBox using enum keys */}
        <ComboBoxComponent
          placeholder="Select Timeline"
          dataSource={timelineOptions}
          fields={{ text: 'text', value: 'value' }}
          value={formData.timeline}
          change={(e: ChangeEventArgs) => handleComboChange('timeline', e.value as Timeline)}
          className="border p-2 w-full"
        />

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Call">Call</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="border p-2 w-full"
        />

        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Lead
        </button>
      </form>
    </div>
  );
}
