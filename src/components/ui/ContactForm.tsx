import React, { useState, useEffect, useMemo } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

  // Memoize the EmailJS configuration using environment variables
  const emailJSConfig = useMemo(() => ({
    publicKey: 'MfP_PCzJ0Z36Wlahh',
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  }), []);
  
  useEffect(() => {
    const { publicKey} = emailJSConfig;

    if (publicKey) {
      try {
        emailjs.init(publicKey);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('EmailJS initialization error:', error);
      }
    } else {
      console.warn('EmailJS public key not found');
    }
  }, [emailJSConfig]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    
    // Rate Limiting is set to 2 messages per user identifier (email or unique ID).
    const email = formData.email;
    let userIdentifier = email;
    const storedIdentifier = localStorage.getItem('userIdentifier');
    if (!storedIdentifier) {
      // Generate a simple unique identifier if none exists
      const newIdentifier = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
      localStorage.setItem('userIdentifier', newIdentifier);
    }
    // Use stored identifier for tracking if email is not used or changes
    userIdentifier = storedIdentifier || email;
    const messageCountKey = `messageCount_${userIdentifier}`;
    const messageCount = parseInt(localStorage.getItem(messageCountKey) || '0', 10);
    
    if (messageCount >= 2) {
      setRateLimitExceeded(true);
      setTimeout(() => setRateLimitExceeded(false), 5000);
      return;
    }

    const { serviceId, templateId } = emailJSConfig;

    if (!serviceId || !templateId) {
      alert('EmailJS configuration is missing. Please check your environment variables.');
      return;
    }

    setIsSubmitting(true);
    console.log('Attempting to send email with data:', {
      user_name: formData.name,
      user_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    // Fetch user's IP address
    let ipAddress = 'Unknown';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ipAddress = data.ip || 'Unknown';
    } catch (error) {
      console.error('Failed to fetch IP address:', error);
    }

    // Append IP address to the message
    const messageWithIp = `${formData.message}\n\nUser IP Address: ${ipAddress}`;

    try {
      const result = await emailjs.send(serviceId, templateId, {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        message: messageWithIp,
      });

      console.log('EmailJS send result:', result);
      setSubmitSuccess(true);
      // Increment message count in localStorage
      const userIdentifier = localStorage.getItem('userIdentifier') || formData.email;
      const messageCountKey = `messageCount_${userIdentifier}`;
      const currentCount = parseInt(localStorage.getItem(messageCountKey) || '0', 10);
      localStorage.setItem(messageCountKey, String(currentCount + 1));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('EmailJS send error:', error);

      let errorMessage = 'Failed to send message.';
      if (typeof error === 'object' && error !== null) {
        if ('text' in error && typeof (error as { text?: string }).text === 'string') {
          errorMessage += ' Error: ' + (error as { text: string }).text;
        } else if ('message' in error && typeof (error as { message?: string }).message === 'string') {
          errorMessage += ' Error: ' + (error as { message: string }).message;
        } else if ('status' in error) {
          errorMessage += ' Status: ' + String((error as { status?: number }).status);
        }
      }

      alert(errorMessage + '\n\nCheck the console for more details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'rgb(0 0 0 / 0.1)' }}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>

      <div className="space-y-6">
        {submitSuccess && (
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded">
            <span className="block sm:inline">
              Your message has been sent successfully. I'll get back to you soon!
            </span>
          </div>
        )}
        {rateLimitExceeded && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            <span className="block sm:inline">
              You have reached the limit of 2 messages. Please contact me through other means if you need to send more messages.
            </span>
          </div>
        )}

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Subject of your message"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none ${
              errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your message here..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || rateLimitExceeded}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send size={16} />
              Send Message
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
