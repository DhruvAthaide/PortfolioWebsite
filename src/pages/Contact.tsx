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

            <div className="mb-10 rounded-xl overflow-hidden shadow-lg h-64 relative group border border-gray-200 dark:border-dark-600 bg-black">
              <img 
                src="/images/india-map-stylized.png" 
                alt="India Map" 
                className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
              />
              {/* Pulsing Dot for Mumbai - Adjusted Position */}
              <div className="absolute top-[67%] left-[26%] flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-red-600 rounded-full relative z-10 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
              </div>

               <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary-900/30">
                <div className="flex items-center gap-2 text-white text-xs">
                  <MapPin size={12} className="text-secondary-400" />
                  <span className="font-mono tracking-wider">MUMBAI, IN</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-dark-700/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <div className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-primary-600 dark:text-secondary-900 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">{item.title}</h3>
                    {item.title === 'Email' ? (
                      <div 
                        className="flex items-center gap-2 cursor-pointer group w-max"
                        onClick={() => handleCopy(item.content, 'email')}
                      >
                        <span className="text-lg font-medium text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors">
                          {item.content}
                        </span>
                        {copiedId === 'email' ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                        {copiedId === 'email' && <span className="text-xs text-green-500 font-medium">Copied!</span>}
                      </div>
                    ) : item.isLink ? (
                      <a 
                        href={item.link} 
                        className="text-lg font-medium text-dark-900 dark:text-white hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-dark-900 dark:text-white">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                {[
                    { icon: FaGithub, link: "https://github.com/DhruvAthaide/", label: "GitHub" },
                    { icon: FaLinkedin, link: "https://linkedin.com/in/dhruvathaide", label: "LinkedIn" },
                    { icon: FaTwitter, link: "https://x.com/Dhruv_Athaide", label: "Twitter" },
                    { icon: FaYoutube, link: "https://www.youtube.com/channel/UC-lcp7FoBrTefpw2q9qpQrg", label: "YouTube" },
                    { icon: FaFacebook, link: "https://www.facebook.com/people/Dhruv-Athaide/pfbid02EJVMGTzJXBoGRbPzo1SN1c5qcV1gB6kvvrEQ7UPA9vp58jR3LvXRNUf3Gv1octvkl/", label: "Facebook" }
                ].map((social, idx) => (
                    <a 
                    key={idx}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white dark:bg-dark-700 rounded-xl text-dark-600 dark:text-gray-300 hover:text-white hover:bg-primary-600 dark:hover:bg-secondary-900 dark:hover:text-dark-900 transition-all duration-300 shadow-md hover:-translate-y-1"
                    aria-label={social.label}
                    >
                    <social.icon size={22} />
                    </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/60 dark:bg-dark-700/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-dark-600 p-8 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">I'll get back to you as soon as possible.</p>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;