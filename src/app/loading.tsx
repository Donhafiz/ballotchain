export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading BallotChain...</p>
      </div>
    </div>
  );
}