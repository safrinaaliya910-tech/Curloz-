import Image from 'next/image';
import AboutStory from '@/components/sections/AboutStory';
import AboutValues from '@/components/sections/AboutValues';
import PageTransition from '@/components/layout/PageTransition';

export default function About() {
  return (
    <PageTransition>
      {/* Hero Banner */}
      <section className="-mt-24 h-[70vh] min-h-[500px] w-full bg-charcoal relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Subtle glowing effect behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-copper/20 blur-[100px] rounded-full" />
        </div>
        
        <div className="relative z-10 w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/images/logo/curloz-logo-full.png"
            alt="CURLOZ Emblem"
            fill
            style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            priority
          />
        </div>
        
        {/* Overlay gradient for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-20" />
      </section>

      <AboutStory />
      <AboutValues />
    </PageTransition>
  );
}
