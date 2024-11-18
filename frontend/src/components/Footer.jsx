import { Link } from "react-router-dom";
import { FOOTER_LINKS, FOOTER_CONTACT_INFO, SOCIALS } from "../assets/data";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center pt-20 pb-10 bg-gray-700 text-gray-200">
      <div className="max-w-7xl w-full px-6 flex flex-col gap-14">
        
        {/* Main Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-white hover:text-gray-300">
            Shoppee
          </Link>
          
          {/* Footer Links */}
          <div className="flex flex-wrap gap-10 flex-1 justify-between">
            {FOOTER_LINKS.map((col) => (
              <FooterColumn title={col.title} key={col.title}>
                <ul className="space-y-2 text-gray-400">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to="/" className="hover:text-gray-200 transition-colors duration-300">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            {/* Contact Information */}
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              <ul className="space-y-3 text-gray-400">
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <li key={link.label}>
                    <span className="font-semibold text-gray-300">{link.label}:</span> {link.value}
                  </li>
                ))}
              </ul>
            </FooterColumn>

            {/* Social Media Icons */}
            <FooterColumn title={SOCIALS.title}>
              <div className="flex space-x-4">
                {SOCIALS.links.map((link, index) => (
                  <Link to="/" key={index} className="hover:opacity-80 transition-opacity duration-300">
                    <img src={link} alt="social icon" className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </FooterColumn>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full border-t border-gray-700 mt-10 pt-4">
        <p className="text-center text-gray-500 text-sm py-6">
          © 2024 StackSquard | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// FooterColumn Component for rendering each column in the footer
const FooterColumn = ({ title, children }) => {
  return (
    <div className="space-y-3">
      {title && <h4 className="text-xl font-semibold text-gray-300">{title}</h4>}
      {children}
    </div>
  );
};

export default Footer;
