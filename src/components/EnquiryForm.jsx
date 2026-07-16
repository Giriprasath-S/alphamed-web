import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';

const COUNTRIES = ['Russia', 'Georgia', 'Kyrgyzstan', 'Uzbekistan', 'Kazakhstan', 'Undecided'];

const EnquiryForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.country) {
      toast({ title: 'Please select a country of interest.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await pb.collection('inquiries').create({ ...form, status: 'new' });
      toast({ title: 'Enquiry sent!', description: 'Our counsellors will contact you shortly.' });
      setForm({ name: '', email: '', phone: '', country: '', message: '' });
    } catch (err) {
      toast({ title: 'Something went wrong.', description: 'Please try again or WhatsApp us.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none transition focus:border-gold focus:bg-white/15';

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required value={form.name} onChange={update('name')} placeholder="Full name" className={inputCls} />
        <input required type="email" value={form.email} onChange={update('email')} placeholder="Email address" className={inputCls} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input required value={form.phone} onChange={update('phone')} placeholder="Phone number" className={inputCls} />
        <select required value={form.country} onChange={update('country')} className={`${inputCls} ${form.country ? '' : 'text-white/50'}`}>
          <option value="" disabled className="text-navy">Country of interest</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c} className="text-navy">{c}</option>
          ))}
        </select>
      </div>
      <textarea value={form.message} onChange={update('message')} rows={3} placeholder="Your message (optional)" className={inputCls} />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-semibold text-navy-deep transition hover:bg-gold-soft active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {loading ? 'Sending...' : 'Submit Enquiry'}
      </button>
    </form>
  );
};

export default EnquiryForm;
