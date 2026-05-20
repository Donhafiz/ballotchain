"use client";

export default function OrgSettingsPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Organization Settings</h1></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-4">
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Organization Name</label><input className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm" defaultValue="Tech University" /></div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  );
}