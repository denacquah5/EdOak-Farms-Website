import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interest: 'Farm For Me',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        interest: 'Farm For Me',
        message: ''
      });
    } catch (err: any) {
      console.error("Error submitting inquiry:", err);
      setError('Failed to send message. Please try again or contact us directly via email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[var(--color-primary-dark)] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto px-4">
          Ready to work with EdOak Farms? Get in touch with our team today.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Get In Touch</h2>
              <p className="text-slate-600 mb-8">
                Whether you're interested in Farm For Me, commercial farming, or produce supply, we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                  <a href="mailto:info@edoakfarms.com" className="block text-slate-600 hover:text-[var(--color-accent)]">info@edoakfarms.com</a>
                  <a href="mailto:contact@edoakfarms.com" className="block text-slate-600 hover:text-[var(--color-accent)]">contact@edoakfarms.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Call / WhatsApp</h4>
                  <a href="tel:+233593963047" className="block text-slate-600 hover:text-[var(--color-accent)]">+233 59 396 3047</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Head Office</h4>
                  <p className="text-slate-600">Accra, Ghana</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a 
                href="https://wa.me/233593963047" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-colors shadow-md"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Send an Inquiry</h3>
                
                {success && (
                  <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Thank you for your inquiry. Our team will contact you shortly.
                  </div>
                )}

                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                      <Input id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium text-slate-700">Country / Location</label>
                      <Input id="location" name="location" required value={formData.location} onChange={handleChange} placeholder="United States" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-medium text-slate-700">Area of Interest</label>
                    <select 
                      id="interest" 
                      name="interest" 
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                    >
                      <option value="Farm For Me">Farm For Me</option>
                      <option value="Commercial Farming">Commercial Farming</option>
                      <option value="Farm Management">Farm Management</option>
                      <option value="Produce Supply">Produce Supply</option>
                      <option value="Consulting">Consulting</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
