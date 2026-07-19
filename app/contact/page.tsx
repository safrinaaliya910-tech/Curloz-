import ContactForm from '@/components/sections/ContactForm';
import ContactMap from '@/components/sections/ContactMap';
import PageTransition from '@/components/layout/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <section className="pt-12 pb-24 md:pb-32 bg-off-white min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 min-h-[70vh]">
            {/* Contact Form Side */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
                  Request an Audience
                </h2>
                <div className="w-16 h-px bg-copper mb-6"></div>
                <p className="font-sans text-charcoal/70 leading-relaxed">
                  Have a question about your order, our royal formulations, or need assistance building your curl routine? Send us a message and our concierge team will assist you.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Info & 3D Emblem Side */}
            <div className="order-1 lg:order-2">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
