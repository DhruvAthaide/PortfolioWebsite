import React, { useState, useEffect, useMemo } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const FALLBACK_HINT = 'Please email me directly at athaidedhruv@gmail.com.';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    p_number: '', // Honeypot field
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // EmailJS configuration
  const emailJSConfig = useMemo(() => ({
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  }), []);
  
  useEffect(() => {
    const { publicKey } = emailJSConfig;
    if (publicKey) {
      emailjs.init(publicKey);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;

    // Honeypot check - if field has value, it's a bot
    if (formData.p_number) {
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', p_number: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
      return;
    }
    
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
      setSubmitError(`${FALLBACK_HINT} (message service is not configured)`);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(serviceId, templateId, {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitSuccess(true);
      // Increment message count in localStorage
      const userIdentifier = localStorage.getItem('userIdentifier') || formData.email;
      const messageCountKey = `messageCount_${userIdentifier}`;
      const currentCount = parseInt(localStorage.getItem(messageCountKey) || '0', 10);
      localStorage.setItem(messageCountKey, String(currentCount + 1));
      setFormData({ name: '', email: '', subject: '', message: '', p_number: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
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

      console.error('Contact form send failed', { error });
      setSubmitError(`${errorMessage} ${FALLBACK_HINT}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6">
        {submitSuccess && (
          <div className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded">
            <span className="block sm:inline">
              Thanks, your message is on its way. I'll reply by email.
            </span>
          </div>
        )}
        {submitError && (
          <div role="alert" className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            {submitError}
          </div>
        )}
        {rateLimitExceeded && (
          <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            <span className="block sm:inline">
              You&apos;ve reached the limit of 2 messages from this browser. Please email me directly at athaidedhruv@gmail.com.
            </span>
          </div>
        )}

        {/* Honeypot Field (Hidden) */}
        <div className="hidden h-0 overflow-hidden" style={{ opacity: 0, position: 'absolute', zIndex: -1 }}>
          <label htmlFor="p_number">Phone Number</label>
          <input
            type="text"
            id="p_number"
            name="p_number"
            value={formData.p_number}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-900 dark:text-gray-200 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-secondary-900 dark:focus:border-secondary-900 dark:bg-dark-800 dark:border-dark-600 dark:text-gray-50 ${
              errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Enter your name"
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-900 dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-secondary-900 dark:focus:border-secondary-900 dark:bg-dark-800 dark:border-dark-600 dark:text-gray-50 ${
              errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-dark-900 dark:text-gray-200 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-secondary-900 dark:focus:border-secondary-900 dark:bg-dark-800 dark:border-dark-600 dark:text-gray-50 ${
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
          <label htmlFor="message" className="block text-sm font-medium text-dark-900 dark:text-gray-200 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-white focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-secondary-900 dark:focus:border-secondary-900 dark:bg-dark-800 dark:border-dark-600 dark:text-gray-50 resize-none ${
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
          type="submit"
          disabled={isSubmitting || rateLimitExceeded}
          className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </form>
  );
};

export default ContactForm;
