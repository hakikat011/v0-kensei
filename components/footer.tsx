export function Footer() {
  return (
    <footer className="py-10 bg-black/90 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold mb-2 text-white font-japanese">「七転び八起き」</p>
              <p className="text-gray-300 mb-4">"Fall seven times, stand up eight."</p>
              <p className="text-gray-500 text-sm">- Nanakorobi yaoki</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-800 w-full">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} HAKIKAT SINGH. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
