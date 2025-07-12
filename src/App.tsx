import React, { useState, useEffect } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import {
  Smartphone,
  Users,
  Heart,
  Share2,
  Camera,
  MessageCircle,
  Star,
  ArrowRight,
  Check,
  Globe,
  Shield,
  Zap,
  Loader
} from 'lucide-react';

// Custom component to handle Mailchimp form and pass status to parent
const MailchimpForm = ({
  onStatusChange,
  email,
  setEmail,
  isLoading,
  setIsLoading
}: {
  onStatusChange: (status: string | null) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleWaitlistSubmit = (subscribe: (data: { EMAIL: string }) => void) => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    subscribe({ EMAIL: email });
  };

  return (
    <MailchimpSubscribe
      url="https://gmail.us7.list-manage.com/subscribe/post?u=2276722dc13d2df34b48d99de&id=f7873189db&f_id=00faade4f0"
      render={({ subscribe, status, message }) => {
        // Notify parent of status change
        onStatusChange(status);

        return (
          <div>
            {status !== "success" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleWaitlistSubmit(subscribe);
                }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <input
                  type="email"
                  name="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-6 py-3 rounded-lg border border-[#E5E5E5] focus:ring-2 focus:ring-[#0089F7] w-full sm:w-auto"
                />
                <button
                  type="submit"
                  disabled={isLoading || status === "sending"}
                  className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#0089F7] text-white rounded-lg flex items-center justify-center gap-2 hover:from-[#0F172A]/90 hover:to-[#0089F7]/90 transition-all duration-200"
                >
                  {isLoading || status === "sending" ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Join Now'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-[#0F172A] font-medium text-lg mt-4">
                🎉 Thank you! You're on the waitlist.
              </div>
            )}
            {status === "error" && (
              <div className="text-red-500 text-sm mt-2">
                {typeof message === 'string' ? message : 'An error occurred. Please try again.'}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [formStatus, setFormStatus] = useState<string | null>(null);

  useEffect(() => {
    const endDate = new Date('2025-07-20T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown('00d 00h 00m 00s');
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle status changes from Mailchimp form
  useEffect(() => {
    if (formStatus === "success" && !isSubmitted) {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }
  }, [formStatus, isSubmitted]);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#FFFFFF]/80 backdrop-blur-md z-50 border-b border-[#808080]/20">
        <div className="max-w-7xl mx-auto px-2  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className='h-[20vh] max-sm:h-[16vh]'/>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-[#808080] hover:text-[#0089F7] transition-colors">Features</a>
              <a href="#waitlist" className="text-[#808080] hover:text-[#0089F7] transition-colors">Join Waitlist</a>
              <a href="#about" className="text-[#808080] hover:text-[#0089F7] transition-colors">About</a>
            </nav>
            <a
              href="#waitlist"
              className="bg-gradient-to-r from-[#0F172A] to-[#0089F7] text-white px-4 py-2 rounded-lg hover:from-[#0F172A]/90 hover:to-[#0089F7]/90 transition-all duration-200 transform hover:scale-105"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#F0F9FF] via-[#E6F3FF] to-[#DCEEFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-[#0089F7]/30">
                  <Star className="w-4 h-4 text-[#0089F7]" />
                  <span className="text-sm font-medium text-[#0089F7]">Coming Soon</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] leading-tight">
                  Connect, Share,
                  <span className="bg-gradient-to-r from-[#0F172A] to-[#0089F7] bg-clip-text text-transparent">
                    {' '}Inspire
                  </span>
                </h1>
                <p className="text-xl text-[#808080] leading-relaxed">
                  The next generation social media platform designed for authentic connections.
                  Share your moments, discover new perspectives, and build meaningful relationships.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0F172A] to-[#0089F7] text-white rounded-xl font-semibold hover:from-[#0F172A]/90 hover:to-[#0089F7]/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0089F7]/30 text-[#0089F7] rounded-xl font-semibold hover:bg-[#F0F9FF] transition-all duration-200">
                  <Camera className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F172A]">10K+</div>
                  <div className="text-sm text-[#808080]">Beta Testers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F172A]">50K+</div>
                  <div className="text-sm text-[#808080]">Waitlist</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F172A]">4.9★</div>
                  <div className="text-sm text-[#808080]">Beta Rating</div>
                </div>
              </div>

              <div className="mt-10">
                <img
                  src="/mockup.png"
                  alt="App Preview Mockup"
                  className="w-full max-w-md rounded-xl shadow-2xl"
                />
              </div>
            </div>

            {/* Feed Card UI */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#0089F7] rounded-3xl p-8 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0F172A] to-[#0089F7] rounded-full">
                        <img src="./feedwoman.jpg" alt="" className="w-10 h-10 rounded-full" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0F172A]">@kabubiayo</div>
                        <div className="text-sm text-[#808080]">2 min ago</div>
                      </div>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-[#F0F9FF] to-[#DCEEFF] rounded-xl flex items-center justify-center">
                      <img src="/feedwoman.jpg" className="aspect-square rounded-[10px]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Heart className="w-5 h-5 text-red-500" />
                        <MessageCircle className="w-5 h-5 text-[#0089F7]" />
                        <Share2 className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="text-sm text-[#808080]">1.2K likes</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#0089F7] rounded-3xl blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Why Boostalk is Different
            </h2>
            <p className="text-xl text-[#808080] max-w-2xl mx-auto">
              We're building the social platform you've always wanted, with features that matter most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              icon: Users,
              title: "Authentic Connections",
              text: "Connect with people who share your interests and values using circles. Our algorithm prioritizes meaningful interactions over engagement metrics."
            }, {
              icon: Shield,
              title: "Privacy First",
              text: "Your data belongs to you. We use end-to-end encryption and give you complete control over your privacy settings."
            }, {
              icon: Globe,
              title: "Global Reach",
              text: "Expand your network beyond borders. Join global communities, share stories, and be inspired by diverse perspectives."
            }, {
              icon: Zap,
              title: "Fast & Lightweight",
              text: "Built for speed. Enjoy a snappy interface, lightning-fast feeds, and minimal distractions."
            }, {
              icon: Camera,
              title: "Visual Storytelling",
              text: "Share photos and videos with beautiful filters and creative tools. Tell your story your way."
            }, {
              icon: Check,
              title: "Verified Safety",
              text: "We actively monitor and verify accounts to ensure your experience is safe and positive."
            }].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="p-6 border border-[#E5E5E5] rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0F172A] to-[#0089F7] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h3>
                <p className="text-[#808080] text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section with Mailchimp */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-[#F0F9FF] to-[#DCEEFF]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            Be the First to Experience the Wave
          </h2>
          <p className="text-[#808080] text-lg mb-8">
            Join our waitlist and get exclusive early access to Boostalk before anyone else.
          </p>
          {!isSubmitted ? (
            <MailchimpForm
              onStatusChange={setFormStatus}
              email={email}
              setEmail={setEmail}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <div className="text-[#0F172A] font-medium text-lg mt-4">
              🎉 Thank you! You're on the waitlist.
            </div>
          )}

          <div className="mt-12 text-[#0089F7] text-3xl sm:text-4xl font-bold">
            {countdown}
          </div>
          <p className="text-[#808080] text-sm mt-2">
            Countdown to launch – July 20
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 text-2xl font-semibold">Boostalk</div>
          <p className="text-[#FFFFFF]/80 mb-4">
            Built for authenticity. Powered by community. Privacy by design.
          </p>
          <p className="text-sm text-[#FFFFFF]/50">© {new Date().getFullYear()} Boostalk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;