    import UsageSteps from '@/components/sections/UsageSteps';
    import PageTransition from '@/components/layout/PageTransition';

    export default function Usage() {
      return (
        <PageTransition>
          <UsageSteps />
          
          {/* Additional Tips Section */}
          <section className="py-24 bg-charcoal text-off-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-copper mb-12">The Royal Decrees of Curl Care</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                <div className="bg-white/5 p-8 border border-copper/20 rounded-sm">
                  <h3 className="font-sans font-medium tracking-widest uppercase text-copper mb-4 text-sm">Do's</h3>
                  <ul className="space-y-4 font-sans text-sm text-off-white/80">
                    <li className="flex items-start gap-3">
                      <span className="text-copper mt-1">•</span>
                      <span>Always detangle wet hair loaded with conditioner to prevent breakage.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-copper mt-1">•</span>
                      <span>Use a microfiber towel or cotton t-shirt to gently squeeze out excess water.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-copper mt-1">•</span>
                      <span>Sleep on a silk or satin pillowcase to preserve your curls and reduce friction overnight.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-8 border border-white/10 rounded-sm">
                  <h3 className="font-sans font-medium tracking-widest uppercase text-white/50 mb-4 text-sm">Don'ts</h3>
                  <ul className="space-y-4 font-sans text-sm text-off-white/60">
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">•</span>
                      <span>Never dry-brush your curls; it will cause frizz and potential damage.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">•</span>
                      <span>Avoid rough towel-drying which roughens the cuticle and causes frizz.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">•</span>
                      <span>Don't touch your hair while it's drying. Let the cast form for maximum definition.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </PageTransition>
      );
    }
