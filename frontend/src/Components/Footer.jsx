import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 py-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Political Articles Monitor</h2>
          <p className="text-sm text-gray-600">
            Providing insights and analysis on Nepalese political coverage
            across media.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="hover:text-blue-600">
            About
          </a>
          <a href="/contact" className="hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="h-5 w-5 hover:text-blue-600 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="h-5 w-5 hover:text-blue-400 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin className="h-5 w-5 hover:text-blue-700 transition" />
          </a>
          <a href="mailto:info@politicalmonitor.com">
            <Mail className="h-5 w-5 hover:text-green-600 transition" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Political Articles Monitor. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
