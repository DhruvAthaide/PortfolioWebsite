import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Monitor, Briefcase, Languages, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import ContactForm from '../components/ui/ContactForm';

import SEO from '../components/utils/SEO';
import { useState } from 'react';

const Contact: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const contactInfo = [
    { 
      icon: <Mail size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Email',
      content: 'athaidedhruv@gmail.com',
      isLink: true,
      link: 'mailto:athaidedhruv@gmail.com'
    },
    // { 
    //   icon: <Phone size={24} className="text-primary-600 dark:text-secondary-900" />,
    //   title: 'Phone',
    //   content: '+91',
    //   isLink: true,
    //   link: 'tel:+919320693337'
    // },
    { 
      icon: <Monitor size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Work',
      content: 'Deepcytes Cyber Labs (UK)',
    },
    { 
      icon: <Briefcase size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Education',
      content: 'Bachelor of Computer Applications (BCA)',
    },
    { 
      icon: <Languages size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Languages',
      content: 'English, Hindi & Spanish'
    }
  ];
  
  return (
    <div className="relative pt-20">
      <SEO 
        title="Contact" 
        description="Get in touch with Dhruv Athaide for collaborations, projects, or just to say hello."
        keywords={['Contact', 'Email', 'Hire', 'Collaboration']}
      />

      
      <div className="container-custom py-10">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="text-primary-600 dark:text-secondary-900">Touch</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">Contact Information</h2>
            <p className="text-lg text-dark-500 dark:text-gray-300 mb-10">
              Feel free to reach out to me for professional inquiries, collaborations, or just to say hello. I'm always open to discussing new projects, opportunities, and ideas.
            </p>

            <div className="mb-10 rounded-xl overflow-hidden shadow-lg h-48 relative group">
              <img 
                src="/images/mumbai-map-stylized.png" 
                alt="Mumbai, India Map" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={18} className="text-secondary-400" />
                  <span className="font-medium">Mumbai, India</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <div className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.title === 'Email' ? (
                      <div 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => handleCopy(item.content, 'email')}
                      >
                        <span className="text-dark-500 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">
                          {item.content}
                        </span>
                        {copiedId === 'email' ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                        {copiedId === 'email' && <span className="text-xs text-green-500">Copied!</span>}
                      </div>
                    ) : item.isLink ? (
                      <a 
                        href={item.link} 
                        className="text-dark-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-dark-500 dark:text-gray-300">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/DhruvAthaide/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/dhruvathaide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a 
                  href="https://x.com/Dhruv_Athaide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UC-lcp7FoBrTefpw2q9qpQrg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/people/Dhruv-Athaide/pfbid02EJVMGTzJXBoGRbPzo1SN1c5qcV1gB6kvvrEQ7UPA9vp58jR3LvXRNUf3Gv1octvkl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-dark-700 rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;