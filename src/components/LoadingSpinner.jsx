export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-800 rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading restaurants...</p>
      </div>
    </div>
  )
}
