import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Shield, Heart, Sparkles, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn, StaggerContainer, StaggerItem, FloatingAnimation } from "@/components/animations/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-illustration.png";

const Landing = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Support",
      description: "Chat with our compassionate AI assistant anytime, anywhere. Get immediate support when you need it most.",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments with professional counsellors with just a few clicks. Find time that works for you.",
    },
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your privacy is our priority. All conversations are encrypted and completely confidential.",
    },
    {
      icon: Users,
      title: "Professional Counsellors",
      description: "Connect with licensed mental health professionals who understand student life.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sage-light rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender-light rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-light rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light rounded-full text-sage-dark text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Confidential & Stigma-Free Support</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                  Your Mental Health{" "}
                  <span className="bg-gradient-to-r from-sage to-teal bg-clip-text text-transparent">
                    Matters
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                  Confidential mental health support designed for college students. 
                  Talk to our AI companion or connect with professional counsellors.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/chatbot">
                      <MessageCircle className="w-5 h-5" />
                      Talk to AI Chatbot
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="xl" asChild>
                    <Link to="/book-appointment">
                      <Calendar className="w-5 h-5" />
                      Book Counselling
                    </Link>
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-sage" />
                    <span className="text-sm text-muted-foreground">100% Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-coral" />
                    <span className="text-sm text-muted-foreground">24/7 AI Support</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Hero Image */}
            <FloatingAnimation className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-glow">
                  <img
                    src={heroImage}
                    alt="Peaceful meditation illustration"
                    className="w-full h-auto rounded-3xl"
                  />
                </div>
              </motion.div>
            </FloatingAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Support You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide multiple pathways to support your mental health journey, 
              all designed with your comfort and privacy in mind.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card variant="elevated" className="h-full p-6">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-sage" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage/10 to-teal/10" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Take the First Step?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                You don't have to face challenges alone. Our AI chatbot is available 24/7, 
                and our counsellors are here to help you navigate through difficult times.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/register">Create Free Account</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">I Already Have an Account</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
