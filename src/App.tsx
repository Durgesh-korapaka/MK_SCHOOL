import { useState, useEffect, useCallback, memo } from 'react';
import {
  Phone, MapPin, Clock, GraduationCap, Heart, Award,
  Microscope, Languages, Monitor, Landmark, Palette, Calculator,
  Trophy, Music, Theater, FlaskConical, Paintbrush, Leaf, Users,
  Stethoscope, ChevronDown, Menu, X, ArrowUp, Crown
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'academics', label: 'Academics' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
];

const STATS = [
  { value: '10+', label: 'Years of Excellence' },
  { value: 'Nursery–10', label: 'All Classes' },
];

const VISION_ITEMS = [
  { icon: GraduationCap, title: 'Our Vision', desc: 'Empowering students with knowledge, values, and life skills.' },
  { icon: Heart, title: 'Our Mission', desc: 'Holistic education in a safe, inclusive, inspiring environment.' },
  { icon: Award, title: 'Our Values', desc: 'Integrity, curiosity, respect, and excellence in all we do.' },
];

const SUBJECTS = [
  { icon: Microscope, title: 'Science & Maths', desc: 'Hands-on experiments, modern concepts, and strong foundations for future STEM careers.', range: 'Classes 6–10' },
  { icon: Languages, title: 'Languages', desc: 'English, Telugu, and Hindi — building strong communication skills right from Nursery.', range: 'All Classes' },
  { icon: Monitor, title: 'Computer Science', desc: 'Digital literacy, basic programming, and technology skills for the 21st century.', range: 'Classes 5–10' },
  { icon: Landmark, title: 'Social Sciences', desc: 'History, Civics, Geography, and Economics taught with real-world relevance.', range: 'Classes 6–10' },
  { icon: Palette, title: 'Arts & Craft', desc: 'Creative expression through drawing, painting, and handcraft activities.', range: 'All Classes' },
  { icon: Calculator, title: 'Early Learning', desc: 'Play-based learning, phonics, numeracy, and life skills for Nursery to Class 5.', range: 'Nursery–5' },
];

const ACTIVITIES = [
  { icon: Trophy, label: 'Sports & Athletics' },
  { icon: Music, label: 'Music & Band' },
  { icon: Theater, label: 'Drama & Theatre' },
  { icon: FlaskConical, label: 'Science Club' },
  { icon: Paintbrush, label: 'Painting & Craft' },
  { icon: Crown, label: 'Chess Club' },
  { icon: Leaf, label: 'Eco Club' },
  { icon: Users, label: 'Student Council' },
  { icon: Stethoscope, label: 'Health Programmes' },
];

const SECTION_COLORS = {
  hero: 'from-slate-900 via-slate-800 to-slate-900',
  about: 'bg-white',
  academics: 'bg-slate-50',
  activities: 'bg-white',
  contact: 'bg-slate-50',
};

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useInView() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);
  return { ref: setRef, inView };
}

const StatCounter = memo(function StatCounter({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-4xl md:text-5xl font-bold text-amber-400">{value}</div>
      <div className="text-sm text-slate-300 mt-1">{label}</div>
    </div>
  );
});

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_ITEMS.map((n) => n.id));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <GraduationCap className={`w-7 h-7 ${scrolled ? 'text-slate-800' : 'text-amber-400'}`} />
            <span className={`font-bold text-lg ${scrolled ? 'text-slate-800' : 'text-white'}`}>Sri MK</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === id
                    ? scrolled ? 'bg-amber-100 text-amber-700' : 'bg-white/15 text-white'
                    : scrolled ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            {mobileOpen
              ? <X className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
              : <Menu className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} />
            }
          </button>
        </div>
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  activeSection === id ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden`}>
      <img
        src="/images/school-building.png"
        alt="Sri MK School building"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/75 to-slate-900/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-slate-300 tracking-wide">
          Recognised by Govt. of A.P. · R.C. No. L.DIS. No. 4394/C6/2023 · Nursery to 10th Class
        </div>
        <p className="text-amber-400/90 text-sm mb-2 tracking-widest uppercase">A Lifestyle of Learning · Since 2013</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Sri MK E.M.<br />High School
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
          Nurturing bright minds and strong character in the heart of Vuyyuru, Krishna District. English Medium from Nursery to 10th Class.
        </p>
        <div className="flex items-center justify-center gap-8 mb-10">
          {STATS.map((s) => <StatCounter key={s.label} {...s} />)}
        </div>
        <button
          onClick={() => scrollTo('about')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors"
        >
          Explore our school <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

const VisionCard = memo(function VisionCard({ icon: Icon, title, desc }: { icon: typeof GraduationCap; title: string; desc: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`text-center p-6 rounded-2xl bg-slate-50 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-amber-100 text-amber-600">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
});

function About() {
  const { ref, inView } = useInView();
  const badges = [
    { label: 'Govt. Recognised', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'English Medium', color: 'bg-blue-100 text-blue-700' },
    { label: 'Since 2013', color: 'bg-amber-100 text-amber-700' },
    { label: 'Nursery – 10th', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <section id="about" className={`${SECTION_COLORS.about} py-20 md:py-28`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">Who we are</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
          About Sri MK Institutions
        </h2>

        <div ref={ref} className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <img
              src="/images/principal.png"
              alt="Principal"
              className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-amber-100 shadow-lg"
              loading="lazy"
            />
            <h3 className="font-semibold text-slate-800 mt-4">Our Principal</h3>
            <p className="text-xs text-slate-500">Founder & Director, Sri MK Group</p>
          </div>
          <blockquote className="text-lg italic text-slate-600 border-l-4 border-amber-400 pl-4 mb-6 text-left">
            "Every child carries a unique spark. Our mission is to fan that spark into a flame of lifelong learning and excellence."
          </blockquote>
          <p className="text-slate-600 leading-relaxed">
            Sri MK Group of Educational Institutions of Society has been shaping young minds since 2013.
            We are proudly recognised by the Government of Andhra Pradesh and offer quality English Medium
            education from Nursery through Class 10.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Located on Katuru Road, Vuyyuru, Krishna District — our school combines academic rigour with
            co-curricular excellence, giving every student the tools to thrive.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {badges.map((b) => (
            <span key={b.label} className={`px-4 py-2 rounded-full text-sm font-medium ${b.color}`}>
              {b.label}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {VISION_ITEMS.map((item) => <VisionCard key={item.title} {...item} />)}
        </div>
      </div>
    </section>
  );
}

const SubjectCard = memo(function SubjectCard({ icon: Icon, title, desc, range, index }: {
  icon: typeof Microscope; title: string; desc: string; range: string; index: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-amber-200 transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-3">{desc}</p>
      <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600">
        {range}
      </span>
    </div>
  );
});

function Academics() {
  return (
    <section id="academics" className={`${SECTION_COLORS.academics} py-20 md:py-28`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">What we teach</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">Academics</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          A well-rounded curriculum designed to build knowledge, curiosity, and confidence in every student from Nursery to Class 10.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((s, i) => <SubjectCard key={s.title} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const ActivityIcon = memo(function ActivityIcon({ icon: Icon, label }: { icon: typeof Trophy; label: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-amber-50 transition-all duration-500 cursor-default ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-medium text-slate-700 text-center">{label}</span>
    </div>
  );
});

function Activities() {
  const { ref, inView } = useInView();

  return (
    <section id="activities" className={`${SECTION_COLORS.activities} py-20 md:py-28`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">Beyond the classroom</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">Activities & Events</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          From science programmes to cultural parades — our students experience education in every form.
        </p>

        <div ref={ref} className={`grid md:grid-cols-2 gap-6 mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="group relative rounded-2xl overflow-hidden aspect-video">
            <img
              src="/images/chilrun-event.png"
              alt="Students at ChilRun event"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm font-medium">ChilRun Health Programme</p>
              <p className="text-xs opacity-80">Panacea Biotec</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden aspect-video">
            <img
              src="/images/band-march.png"
              alt="School band march"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm font-medium">Annual Band & Cultural March</p>
              <p className="text-xs opacity-80">Celebrating our heritage</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {ACTIVITIES.map((a) => <ActivityIcon key={a.label} {...a} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className={`${SECTION_COLORS.contact} py-20 md:py-28`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">Get in touch</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Contact Us</h2>

        <div ref={ref} className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
                <p className="text-sm text-slate-600">Katuru Road, beside Reliance Smart,<br />Vuyyuru, Krishna Dist., A.P. – 521165</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
                <a href="tel:09440158372" className="text-sm text-amber-600 hover:text-amber-700">094401 58372</a>
                <span className="text-slate-400 mx-2">/</span>
                <a href="tel:9290570404" className="text-sm text-amber-600 hover:text-amber-700">92905 70404</a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">School Hours</h3>
                <table className="text-sm text-slate-600">
                  <tbody>
                    <tr><td className="pr-4 py-0.5">Mon – Sat</td><td>8:00 AM – 5:00 PM</td></tr>
                    <tr><td className="pr-4 py-0.5">Sunday</td><td>Closed</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">Admissions</h3>
                <p className="text-sm text-slate-600">Open for Nursery to 10th Class<br />English Medium · Govt. Recognised</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden min-h-[300px] relative group">
            <img
              src="/images/school-entrance.png"
              alt="Sri MK School entrance"
              className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-semibold">Sri MK E.M. High School</p>
              <p className="text-xs opacity-80 mt-1">Katuru Road, Vuyyuru</p>
              <a
                href="https://maps.google.com/?q=Katuru+Road+Vuyyuru+Krishna+District+Andhra+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-2 text-sm font-medium rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-white">Sri MK E.M. High School</span>
        </div>
        <p className="text-sm">Vuyyuru, Krishna District, Andhra Pradesh</p>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Academics />
        <Activities />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
