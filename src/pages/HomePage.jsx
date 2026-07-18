import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  GraduationCap, School, FileCheck2, Plane, Car, BedDouble, Stamp,
  Phone, Mail, Instagram, MapPin, MessageCircle, Menu, X, Star, ChevronRight,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import WhatsAppButton from '@/components/WhatsAppButton';
import EnquiryForm from '@/components/EnquiryForm';
import { CONTACT, DESTINATIONS, SERVICES, PROCESS, TESTIMONIALS, FAQS, GALLERY } from '@/data/site';

const ICONS = { GraduationCap, School, StampIcon: Stamp, FileCheck2, Plane, Car, BedDouble };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Reveal = ({ children, className, delay = 0 }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-80px' }}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const NAV = [
  ['About', 'about'], ['Destinations', 'destinations'], ['Services', 'services'],
  ['Process', 'process'], ['Gallery', 'gallery'], ['FAQ', 'faq'], ['Contact', 'contact'],
];

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-navy-deep">
      <Helmet>
        <title>AlphaMed Edu Consultancy — Study MBBS Abroad</title>
        <meta name="description" content="Guiding doctors to a global future. Study MBBS abroad in Russia, Georgia, Kyrgyzstan, Uzbekistan and Kazakhstan with expert guidance from AlphaMed Edu Consultancy." />
      </Helmet>
      <WhatsAppButton />

      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-navy-deep/95 backdrop-blur shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4">
          <button onClick={() => go('top')} className="flex items-center gap-2 text-white">
          <img src="/images/logo.png" alt="AlphaMed Logo" className="h-24 w-auto object-contain" />
            <span className="block text-[30px] font-display text-lg font-semibold leading-tight">AlphaMed<span className="block text-[20px] font-sans font-bold tracking-widest text-gold">EDU CONSULTANCY</span></span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map(([label, id]) => (
              <button key={id} onClick={() => go(id)} className="text-sm font-medium text-white/80 transition hover:text-gold">{label}</button>
            ))}
            <button onClick={() => go('contact')} className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy-deep transition hover:bg-gold-soft">Apply Now</button>
          </nav>
          <button className="lg:hidden text-white" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-white/10 bg-navy-deep px-5 pb-5">
            {NAV.map(([label, id]) => (
              <button key={id} onClick={() => go(id)} className="block w-full py-3 text-left text-white/85 border-b border-white/5">{label}</button>
            ))}
            <button onClick={() => go('contact')} className="mt-4 w-full rounded-full bg-gold py-3 font-semibold text-navy-deep">Apply Now</button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-deep">
        <img src="https://images.hostinger.com/0b077be2-afdc-4f77-ad62-3f233393324f.png" alt="Medical student in white coat" className="absolute inset-0 h-full w-full object-cover object-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
        <div className="relative mx-auto grid w-full max-w-[90rem] gap-10 px-5 pt-28 pb-16 lg:grid-cols-2">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Star className="h-4 w-4 fill-gold" /> NMC / WHO approved universities
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              Guiding Doctors to a <span className="text-gold">Global Future</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg text-white/80 sm:text-xl">
              Study MBBS Abroad with Expert Guidance.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => go('contact')} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-navy-deep transition hover:bg-gold-soft active:scale-[0.98]">
                Apply Now <ChevronRight className="h-5 w-5" />
              </button>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
                <MessageCircle className="h-5 w-5" /> Free Counselling
              </a>
            </motion.div>
            <div className="mt-10 flex gap-8">
              {[['5+', 'Countries'], ['20+', 'Universities'], ['1000+', 'Students placed']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-gold">{n}</div>
                  <div className="text-sm text-white/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-gold py-3 text-navy-deep">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-lg font-semibold">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-12">
              {['Free Counselling', 'Direct University Admission', 'Full Visa Assistance', 'Airport Pickup', 'Hostel Support', 'NMC Approved'].map((t) => (
                <span key={t} className="flex items-center gap-3">{t} <Star className="h-4 w-4 fill-navy-deep" /></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="mx-auto max-w-[72rem] px-5 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="font-medium uppercase tracking-widest text-gold">About Us</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">Your trusted partner for a medical career abroad</h2>
          <p className="mt-5 text-lg leading-relaxed text-navy/70">
            AlphaMed Edu Consultancy is a dedicated team of education advisors helping aspiring doctors secure admission into
            world-recognised medical universities. We simplify every step — from choosing the right country to landing safely on campus.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ['Who We Are', 'A specialist MBBS-abroad consultancy with on-ground partners across five countries and years of admission experience.'],
            ['Our Mission', 'To make quality medical education accessible, affordable and stress-free for every deserving student.'],
            ['Why Choose AlphaMed', 'Transparent guidance, direct university tie-ups, and full support from enquiry to graduation — no hidden costs.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-navy/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5">
                <div className="mb-4 h-1 w-10 rounded-full bg-gold" />
                <h3 className="font-display text-xl font-semibold text-navy">{t}</h3>
                <p className="mt-3 text-navy/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="bg-navy-deep py-20 md:py-28 text-white">
        <div className="mx-auto max-w-[90rem] px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-medium uppercase tracking-widest text-gold">Study Destinations</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Where you can study MBBS</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 0.08}>
                <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="relative h-48 overflow-hidden">
                    <img src={d.image} alt={d.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep to-transparent" />
                    <span className="absolute left-4 top-4 text-4xl drop-shadow">{d.flag}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                      <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">{d.fee}</span>
                    </div>
                    <p className="mt-3 text-white/70">{d.blurb}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-[90rem] px-5 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium uppercase tracking-widest text-gold">Our Services</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">Complete support, start to finish</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || GraduationCap;
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 transition hover:border-gold hover:shadow-lg hover:shadow-navy/5">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy/65">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-[72rem] px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-medium uppercase tracking-widest text-gold">Admission Process</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">Five simple steps to your seat</h2>
          </Reveal>
          <div className="mt-14 space-y-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="flex items-start gap-5 rounded-2xl bg-white p-6 shadow-sm md:items-center">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy font-display text-xl font-bold text-gold">{p.step}</div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy">{p.title}</h3>
                    <p className="mt-1 text-navy/65">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[90rem] px-5 py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-medium uppercase tracking-widest text-gold">Success Stories</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">Students who now wear the white coat</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6">
                <div className="flex gap-0.5 text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-gold" />)}</div>
                <p className="mt-4 flex-1 italic text-navy/75">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-navy font-display font-semibold text-gold">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-navy">{t.name}</div>
                    <div className="text-sm text-navy/60">{t.place}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-navy-deep py-20 md:py-28 text-white">
        <div className="mx-auto max-w-[90rem] px-5">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-medium uppercase tracking-widest text-gold">University Gallery</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">A glimpse of campus life</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={i} delay={(i % 3) * 0.06} className={i % 5 === 0 ? 'md:row-span-2' : ''}>
                <div className="group relative h-full min-h-[180px] overflow-hidden rounded-2xl">
                  <img src={g.src} alt={g.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 translate-y-2 font-medium opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{g.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-[56rem] px-5 py-20 md:py-28">
        <Reveal className="text-center">
          <p className="font-medium uppercase tracking-widest text-gold">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">Questions, answered</h2>
        </Reveal>
        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-navy/10">
                <AccordionTrigger className="text-left font-display text-lg text-navy hover:text-gold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-navy/70">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-navy-deep py-20 md:py-28 text-white">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 lg:grid-cols-2">
          <div>
            <p className="font-medium uppercase tracking-widest text-gold">Contact Us</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Start your journey today</h2>
            <p className="mt-4 max-w-md text-white/70">Book a free counselling session or send us an enquiry. Our advisors reply within 24 hours.</p>
            <div className="mt-8 space-y-4">
              <a href={CONTACT.phoneHref} className="flex items-center gap-4 text-white/85 transition hover:text-gold">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Phone className="h-5 w-5" /></span>
                <span><span className="block text-sm text-white/50">Call us</span>{CONTACT.phone}</span>
              </a>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/85 transition hover:text-gold">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><MessageCircle className="h-5 w-5" /></span>
                <span><span className="block text-sm text-white/50">WhatsApp</span>{CONTACT.whatsapp}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 text-white/85 transition hover:text-gold">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Mail className="h-5 w-5" /></span>
                <span><span className="block text-sm text-white/50">Email</span>{CONTACT.email}</span>
              </a>
              <a href={CONTACT.instagramHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/85 transition hover:text-gold">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10"><Instagram className="h-5 w-5" /></span>
                <span><span className="block text-sm text-white/50">Instagram</span>{CONTACT.instagram}</span>
              </a>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="AlphaMed location"
                src="https://www.google.com/maps?q=Bishkek,Kyrgyzstan&output=embed"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 sm:p-9">
            <h3 className="font-display text-2xl font-semibold">Online Enquiry</h3>
            <p className="mt-1 text-sm text-white/60">Fill in your details and we&apos;ll reach out.</p>
            <div className="mt-6"><EnquiryForm /></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep border-t border-white/10 py-10 text-white/60">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-4 px-5 text-sm md:flex-row">
          <div className="flex items-center gap-2 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-gold font-display font-bold text-navy-deep">A</span>
            <span className="font-display font-semibold">AlphaMed Edu Consultancy</span>
          </div>
          <p>&copy; {new Date().getFullYear()} AlphaMed Edu Consultancy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={CONTACT.instagramHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold"><Instagram className="h-5 w-5" /></a>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold"><MessageCircle className="h-5 w-5" /></a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-gold"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
