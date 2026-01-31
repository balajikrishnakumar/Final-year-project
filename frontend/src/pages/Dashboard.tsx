import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
} from "@/components/animations/PageTransition";

const Dashboard = () => {
  /* ============================
     🔹 USER NAME FROM MONGODB
     ============================ */

  // Read name stored after login (fetched from MongoDB)
  const storedName = localStorage.getItem("userName");

const getCleanFirstName = (name: string | null) => {
  if (!name) return "User";
  const firstName = name.trim().split(" ")[0];
  return firstName.replace(/[0-9]/g, "");
};


  /* ============================
     🔹 UI DATA
     ============================ */

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Chat with AI",
      description:
        "Talk to our compassionate AI assistant about anything on your mind.",
      link: "/chatbot",
      color: "bg-sage-light",
      iconColor: "text-sage",
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      description:
        "Schedule a session with a professional counsellor.",
      link: "/book-appointment",
      color: "bg-lavender-light",
      iconColor: "text-lavender",
    },
    {
      icon: Clock,
      title: "Appointment Status",
      description:
        "View and manage your upcoming appointments.",
      link: "/appointments",
      color: "bg-teal-light",
      iconColor: "text-teal",
    },
  ];

  const upcomingAppointment = {
    counsellor: "Dr. Sarah Johnson",
    date: "January 5, 2025",
    time: "2:00 PM",
    type: "Video Call",
  };

  const wellnessTips = [
    "Take 5 deep breaths when you feel overwhelmed",
    "Stay hydrated - drink at least 8 glasses of water",
    "Take a 10-minute walk between study sessions",
    "Practice gratitude - write 3 things you're grateful for",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* ============================
             🔹 WELCOME SECTION
             ============================ */}
          <FadeIn>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-coral" />
                <span className="text-sm font-medium text-coral">
                  Welcome back!
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Hello, {getCleanFirstName(storedName)} 👋
              </h1>

              <p className="text-muted-foreground mt-2">
                How are you feeling today? We're here to support you.
              </p>
            </div>
          </FadeIn>

          {/* ============================
             🔹 QUICK ACTIONS
             ============================ */}
          <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <StaggerItem key={index}>
                <HoverScale>
                  <Link to={action.link}>
                    <Card
                      variant="elevated"
                      className="h-full cursor-pointer group"
                    >
                      <CardHeader className="pb-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-2`}
                        >
                          <action.icon
                            className={`w-6 h-6 ${action.iconColor}`}
                          />
                        </div>

                        <CardTitle className="text-lg flex items-center justify-between">
                          {action.title}
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-sage group-hover:translate-x-1 transition-all" />
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <CardDescription className="text-sm">
                          {action.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* ============================
             🔹 MAIN GRID
             ============================ */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upcoming Appointment */}
            <FadeIn delay={0.3}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sage" />
                    Upcoming Appointment
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="bg-sage-light rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          {upcomingAppointment.counsellor}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {upcomingAppointment.date} at{" "}
                          {upcomingAppointment.time}
                        </p>
                        <span className="inline-block mt-2 text-xs bg-sage/20 text-sage-dark px-2 py-1 rounded-full">
                          {upcomingAppointment.type}
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                        <span className="text-lg font-semibold text-sage">
                          SJ
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="subtle" size="sm" className="flex-1">
                        Reschedule
                      </Button>
                      <Button variant="calm" size="sm" className="flex-1">
                        Join Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Daily Wellness Tips */}
            <FadeIn delay={0.4}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-coral" />
                    Daily Wellness Tips
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {wellnessTips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">
                          {tip}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* ============================
             🔹 QUICK CHAT CTA
             ============================ */}
          <FadeIn delay={0.5}>
            <Card
              variant="glass"
              className="mt-8 bg-gradient-to-r from-sage/10 to-teal/10"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-sage flex items-center justify-center">
                      <MessageCircle className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Need someone to talk to?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI companion is available 24/7 to listen and support you.
                      </p>
                    </div>
                  </div>

                  <Button variant="hero" asChild>
                    <Link to="/chatbot">Start Chatting</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
