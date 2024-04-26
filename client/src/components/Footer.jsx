import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#13274F] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Common Questions</h3>
            <div className="space-y-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Nullam lacinia mi mi, at
                faucibus lorem.
              </p>
              {/* ... (remaining dummy text) */}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">TENDERLY</h3>
            <div className="space-y-2">
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
              {/* ... (remaining navigation links) */}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 TENDERLY. All Rights Reserved.</p>
          <div className="flex justify-center mt-4">
            <a href="https://www.instagram.com/maihooyash/" target="_blank" className="mr-4 hover:text-gray-300"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
            <a href="https://www.facebook.com/profile.php?id=100057981459589" target="_blank" className="mr-4 hover:text-gray-300"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
            <a href="https://twitter.com/Yash_s33244" target="_blank" className="hover:text-gray-300"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
