"use client";

import { useParams } from "next/navigation";

export default function UserDetailPage() {
  const { userId } = useParams();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">User Details</h1>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <p className="text-gray-500">User ID: {userId}</p>
        <div className="mt-4 space-y-3">
          <div><label className="text-xs font-bold text-gray-500 uppercase">Name</label><input className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" defaultValue="Alice Johnson" /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase">Email</label><input className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" defaultValue="alice@edu.com" /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase">Role</label><select className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"><option>admin</option><option>org_admin</option><option>voter</option><option>observer</option></select></div>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}