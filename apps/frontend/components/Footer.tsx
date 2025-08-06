import { motion } from "framer-motion";
import { Github, MessageCircle, Mail, Heart } from "lucide-react";

const Footer = () => {
  type FooterLink = {
    name: string;
    href: string;
    icon?: React.ElementType;
  };

  type FooterSection = {
    title: string;
    links: FooterLink[];
  };

  const footerLinks: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "How it Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Roadmap", href: "#roadmap" }
    ]
  },
  {
    title: "Community",
    links: [
      { name: "GitHub", href: "https://github.com/Ranjan-3105", icon: Github },
      { name: "Discord", href: "https://discord.com/users/639437052261171200", icon: MessageCircle },
      { name: "Support", href: "https://mail.google.com/mail/?view=cm&fs=1&to=soumya@example.com&su=Hello%20Soumya&body=I%20am%20interested%20in%20DoodleHub!", icon: Mail }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Privacy", href: "#privacy" }
    ]
  }
];

   return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="md:col-span-1">
            <div className="mb-8 animate-fade-in-up">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                DoodleHub
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The minimalist, real-time whiteboard for creative minds. 
                Draw, collaborate, and create together.
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Ranjan-3105", label: "GitHub" },
                { icon: MessageCircle, href: "https://www.linkedin.com/in/soumya-ranjan-nanda-849489214/", label: "Discord" },
                { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=soumya@example.com&su=Hello%20Soumya&body=I%20am%20interested%20in%20DoodleHub!", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="animate-fade-in-up"
              style={{ animationDelay: `${sectionIndex * 100}ms` }}
            >
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        <div className="mt-16 pt-8 border-t border-gray-800 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-6">
              Get the latest updates, features, and creative inspiration delivered to your inbox.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 flex items-center gap-2 animate-fade-in">
              © 2025 DoodleHub. Made with{' '}
              <span className="animate-pulse-scale">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </span>{' '}
              for creators everywhere.
            </p>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
