import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Monitor, Briefcase, Languages } from 'lucide-react';
import ContactForm from '../components/ui/ContactForm';
import InteractiveBackground from '../components/three/InteractiveBackground';

const Contact: React.FC = () => {
  const contactInfo = [
    { 
      icon: <MapPin size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Location',
      content: 'Mumbai, India'
    },
    { 
      icon: <Mail size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Email',
      content: 'athaidedhruv@gmail.com',
      isLink: true,
      link: 'mailto:athaidedhruv@gmail.com'
    },
    { 
      icon: <Phone size={24} className="text-primary-600 dark:text-secondary-900" />,
      title: 'Phone',
      content: '+91 9320693337',
      isLink: true,
      link: 'tel:+919320693337'
    },
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
      <InteractiveBackground />
      
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
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    {item.isLink ? (
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a 
                  href="https://linkedin.com/in/dhruvathaide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a 
                  href="https://x.com/Dhruv_Athaide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UC-lcp7FoBrTefpw2q9qpQrg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/people/Dhruv-Athaide/pfbid02EJVMGTzJXBoGRbPzo1SN1c5qcV1gB6kvvrEQ7UPA9vp58jR3LvXRNUf3Gv1octvkl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-dark-700 rounded-full text-dark-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-secondary-900 transition-colors"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
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
            {/* <ContactForm /> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;