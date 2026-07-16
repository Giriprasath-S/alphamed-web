import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/data/site';

const WhatsAppButton = () => (
  <a
    href={CONTACT.whatsappHref}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95"
  >
    <MessageCircle className="h-6 w-6" strokeWidth={2} />
    <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
  </a>
);

export default WhatsAppButton;
