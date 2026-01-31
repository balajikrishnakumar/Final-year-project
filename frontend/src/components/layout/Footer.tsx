import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage to-teal flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">MindfulU</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Confidential mental health support for college students. Your well-being matters, 
              and we're here to help you thrive.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-sage transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/counsellor-login" className="text-sm text-muted-foreground hover:text-sage transition-colors">
                  Counsellor Login
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sm text-muted-foreground hover:text-sage transition-colors">
                  AI Chatbot
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-sage transition-colors">
                  Crisis Helpline
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-sage transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-sage transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MindfulU. All rights reserved. If you're in crisis, please call your local emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
};
