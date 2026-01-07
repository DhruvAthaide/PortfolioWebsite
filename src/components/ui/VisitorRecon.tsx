import React, { useEffect, useState } from 'react';
import { Shield, Smartphone, Monitor, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisitorData {
  ip: string;
  userAgent: string;
  os: string;
  browser: string;
}

const VisitorRecon: React.FC = () => {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Fetch public IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Parse basic user agent info (simplified)
        const ua = navigator.userAgent;
        let os = 'Unknown OS';
        if (ua.indexOf("Win") !== -1) os = "Windows";
        if (ua.indexOf("Mac") !== -1) os = "MacOS";
        if (ua.indexOf("Linux") !== -1) os = "Linux";
        if (ua.indexOf("Android") !== -1) os = "Android";
        if (ua.indexOf("like Mac") !== -1) os = "iOS";

        let browser = 'Unknown Browser';
        if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
        else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
        else if (ua.indexOf("Safari") !== -1) browser = "Safari";
        else if (ua.indexOf("Edge") !== -1) browser = "Edge";

        setData({
          ip: ipData.ip,
          userAgent: ua,
          os,
          browser
        });
      } catch (error) {
        console.error('Failed to fetch recon data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorData();
  }, []);

  if (loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-8 pt-6 border-t border-dashed border-gray-300 dark:border-dark-600 font-mono text-xs text-dark-400 dark:text-gray-500"
    >
      <div className="flex items-center gap-2 mb-2">
        <Shield size={12} className="text-green-500" />
        <span className="uppercase tracking-widest font-bold">System Telemetry</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <Globe size={12} />
          <span>IP: <span className="text-primary-600 dark:text-green-400">{data?.ip}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Monitor size={12} />
          <span>OS: {data?.os}</span>
        </div>
        <div className="flex items-center gap-2">
          {data?.userAgent.includes('Mobile') ? <Smartphone size={12} /> : <Monitor size={12} />}
          <span>Client: {data?.browser}</span>
        </div>
        <div className="hidden lg:block truncate" title={data?.userAgent}>
          UA: {data?.userAgent.substring(0, 20)}...
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorRecon;
