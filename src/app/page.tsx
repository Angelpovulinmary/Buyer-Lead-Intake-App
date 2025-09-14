

import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Buyer Lead Intake App</h1>
      <p className="mb-4">Manage your buyer leads efficiently and easily.</p>
      <div className="flex gap-2.5">
       <button className='button-class-secondary'><Link href="/buyers" className="block text-blue-600 hover:underline">
          View Buyers
        </Link></button>
        <button className='button-class-secondary'><Link href="/buyers/new" className="block text-blue-600 hover:underline">
          Create New Buyer
        </Link></button>
      </div>
    </div>
  );
}

