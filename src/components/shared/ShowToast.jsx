'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

const baseStyle = {
  padding: '14px 20px 14px 18px',
  borderRadius: '14px',
  fontSize: '14.5px',
  fontWeight: '600',
  letterSpacing: '0.01em',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderLeft: '4px solid transparent',
  minWidth: '240px',
  maxWidth: '380px',
    marginRight: '20px',
};

const styles = {
  success: {
    background: 'linear-gradient(135deg, rgba(240,253,244,0.97) 0%, rgba(220,252,231,0.97) 100%)',
    border: '1px solid #86EFAC',
    borderLeft: '4px solid #22C55E',
    color: '#14532D',
    boxShadow: '0 8px 32px rgba(34,197,94,0.18), 0 2px 10px rgba(0,0,0,0.10)',
  },
  error: {
    background: 'linear-gradient(135deg, rgba(254,242,242,0.97) 0%, rgba(254,226,226,0.97) 100%)',
    border: '1px solid #FCA5A5',
    borderLeft: '4px solid #EF4444',
    color: '#7F1D1D',
    boxShadow: '0 8px 32px rgba(239,68,68,0.18), 0 2px 10px rgba(0,0,0,0.10)',
  },
  warning: {
    background: 'linear-gradient(135deg, rgba(255,251,235,0.97) 0%, rgba(254,243,199,0.97) 100%)',
    border: '1px solid #FCD34D',
    borderLeft: '4px solid #F59E0B',
    color: '#78350F',
    boxShadow: '0 8px 32px rgba(245,158,11,0.18), 0 2px 10px rgba(0,0,0,0.10)',
  },
  info: {
    background: 'linear-gradient(135deg, rgba(239,246,255,0.97) 0%, rgba(219,234,254,0.97) 100%)',
    border: '1px solid #93C5FD',
    borderLeft: '4px solid #3B82F6',
    color: '#1E3A8A',
    boxShadow: '0 8px 32px rgba(59,130,246,0.18), 0 2px 10px rgba(0,0,0,0.10)',
  },
};

const ShowToast = ({
  message,
  type = 'success',
  description,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const options = {
        description,
        position: 'top-right',
        style: { ...baseStyle, ...styles[type] },
        duration: 4000,
        offset: '20px',
      };

      switch (type) {
        case 'success':
          toast.success(message, options);
          break;
        case 'error':
          toast.error(message, options);
          break;
        case 'warning':
          toast.warning(message, options);
          break;
        case 'info':
          toast.info(message, options);
          break;
        default:
          toast(message, options);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [message, type, description]);

  return null;
};

export default ShowToast;