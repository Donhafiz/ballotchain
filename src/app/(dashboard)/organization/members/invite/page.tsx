"use client";

export default function InviteMembersPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Invite Members</h1><p className="text-gray-500 mt-1">Invite new members to your organization</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-5">
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Addresses</label><textarea className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm h-32" placeholder="john@example.com&#10;sarah@example.com&#10;mike@example.com" /></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Role</label><select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"><option>Member</option><option>Manager</option><option>Observer</option></select></div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">Send Invitations</button>
      </div>
    </div>
  );
}