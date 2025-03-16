export default function Preload() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-black z-50">
      <div className="text-center">
        <div className="relative flex items-center justify-center">
          
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-codeline-100 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            
          </div>
        </div>

      
        <p className="mt-6 text-lg font-medium text-codeline-100 dark:text-gray-300">
          Please wait, loading...
        </p>
      </div>
    </div>
  );
}
