import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PHONE_NUMBER = '+919152106425';
const WHATSAPP_NUMBER = '919152106425';

export const StickyBottomBar = () => {
  const { t } = useLanguage();

  return (
    <div className="sticky-bottom-bar md:hidden">
      <div className="flex gap-3">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          <span>{t('call')}</span>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-whatsapp flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{t('whatsapp')}</span>
        </a>
      </div>
    </div>
  );
};
