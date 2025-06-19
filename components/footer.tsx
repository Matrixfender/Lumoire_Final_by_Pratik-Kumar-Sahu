export default function Footer() {
  return (
    <footer className="bg-teal text-white py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-mint mb-4">Lumoire</div>
            <p className="text-gray-300">The subscription platform for creators to get paid by their fans.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Mobile app
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">For Creators</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Start a page
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Creator handbook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  University
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sky transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Lumoire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
