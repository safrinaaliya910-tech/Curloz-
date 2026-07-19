'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import CopperButton from '../ui/CopperButton';
import { fadeInUp } from '@/lib/utils/animations';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <motion.div variants={fadeInUp} className="w-full max-w-xl mx-auto md:mx-0">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-off-white p-12 text-center border border-copper/20"
          >
            <h3 className="font-serif text-3xl text-charcoal mb-4">Message Sent</h3>
            <p className="font-sans text-charcoal/70">
              Thank you for reaching out to the CURLOZ team. A representative will be in touch with you shortly.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-8 font-sans text-sm tracking-widest uppercase text-copper hover:text-copper-dark transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/60 mb-2">
                Name
              </label>
              <input
                id="name"
                {...register('name')}
                className={`w-full bg-off-white border ${errors.name ? 'border-red-500' : 'border-charcoal/10'} px-4 py-3 text-charcoal focus:outline-none focus:border-copper transition-colors`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 font-sans text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/60 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full bg-off-white border ${errors.email ? 'border-red-500' : 'border-charcoal/10'} px-4 py-3 text-charcoal focus:outline-none focus:border-copper transition-colors`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 font-sans text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/60 mb-2">
                Subject
              </label>
              <input
                id="subject"
                {...register('subject')}
                className={`w-full bg-off-white border ${errors.subject ? 'border-red-500' : 'border-charcoal/10'} px-4 py-3 text-charcoal focus:outline-none focus:border-copper transition-colors`}
                placeholder="How can we help?"
              />
              {errors.subject && (
                <p className="mt-1 font-sans text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/60 mb-2">
                Message
              </label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className={`w-full bg-off-white border ${errors.message ? 'border-red-500' : 'border-charcoal/10'} px-4 py-3 text-charcoal focus:outline-none focus:border-copper transition-colors resize-none`}
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className="mt-1 font-sans text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <CopperButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </CopperButton>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
