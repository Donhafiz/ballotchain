"use client";

export default function VoterImportPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Import Voters</h1><p className="text-gray-500 mt-1">Bulk import voters via CSV or Excel</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center">
          <span className="text-5xl block mb-4">📥</span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Drop CSV file here</h3>
          <p className="text-sm text-gray-500 mb-4">or click to browse. Format: name,email,department</p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl">Select File</button>
        </div>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-sm text-blue-700 dark:text-blue-300">
          <strong>Template:</strong> Download a sample CSV file to see the required format.
        </div>
      </div>
    </div>
  );
}