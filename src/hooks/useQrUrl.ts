import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export const useQrUrl = () => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(location.href).then(setUrl);
  }, []);

  return url;
};
