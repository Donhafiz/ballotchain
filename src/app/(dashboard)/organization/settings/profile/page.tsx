"use client";

export default function OrgProfilePage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Profile Settings</h1></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label><input className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" defaultValue="Admin" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label><input className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" defaultValue="User" /></div>
        </div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label><input className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" defaultValue="admin@ballotchain.com" /></div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">Update Profile</button>
      </div>
    </div>
  );
}