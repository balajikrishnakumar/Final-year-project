import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Check, X, RefreshCw, User, FileText, ChevronDown, ChevronUp, Stethoscope, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/PageTransition";
import { Link } from "react-router-dom";

interface Appointment {
  id: number;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  notes: string;
  status: "pending" | "accepted" | "completed" | "rescheduled";
}

const CounsellorDashboard = () => {
  const counsellorName = "Dr. Sarah Johnson";
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      studentName: "Alex Thompson",
      studentEmail: "alex.t@university.edu",
      date: "2025-01-05",
      time: "2:00 PM",
      notes: "Feeling overwhelmed with upcoming exams and having trouble sleeping.",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Jordan Lee",
      studentEmail: "jordan.l@university.edu",
      date: "2025-01-06",
      time: "10:00 AM",
      notes: "Would like to discuss anxiety management techniques.",
      status: "pending",
    },
    {
      id: 3,
      studentName: "Sam Rivera",
      studentEmail: "sam.r@university.edu",
      date: "2025-01-04",
      time: "3:00 PM",
      notes: "Follow-up session for stress management.",
      status: "accepted",
    },
    {
      id: 4,
      studentName: "Casey Morgan",
      studentEmail: "casey.m@university.edu",
      date: "2025-01-03",
      time: "11:00 AM",
      notes: "General check-in and coping strategies.",
      status: "completed",
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAccept = (id: number) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: "accepted" as const } : apt)
    );
  };

  const handleReschedule = (id: number) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: "rescheduled" as const } : apt)
    );
  };

  const handleComplete = (id: number) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: "completed" as const } : apt)
    );
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    const styles = {
      pending: "bg-coral-light text-coral",
      accepted: "bg-sage-light text-sage-dark",
      completed: "bg-lavender-light text-lavender",
      rescheduled: "bg-muted text-muted-foreground",
    };

    return (
      <Badge className={`${styles[status]} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === "all" || apt.status === filter;
    const matchesSearch = apt.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    pending: appointments.filter(a => a.status === "pending").length,
    today: appointments.filter(a => a.status === "accepted").length,
    completed: appointments.filter(a => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender to-sage flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">{counsellorName}</h1>
                <p className="text-sm text-muted-foreground">Counsellor Dashboard</p>
              </div>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/">Sign Out</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Stats Cards */}
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card variant="elevated" className="bg-coral-light border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-coral">Pending Requests</p>
                      <p className="text-3xl font-bold text-coral">{stats.pending}</p>
                    </div>
                    <Clock className="w-10 h-10 text-coral/50" />
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated" className="bg-sage-light border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-sage-dark">Upcoming Sessions</p>
                      <p className="text-3xl font-bold text-sage-dark">{stats.today}</p>
                    </div>
                    <Calendar className="w-10 h-10 text-sage/50" />
                  </div>
                </CardContent>
              </Card>
              <Card variant="elevated" className="bg-lavender-light border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-foreground">Completed This Week</p>
                      <p className="text-3xl font-bold text-secondary-foreground">{stats.completed}</p>
                    </div>
                    <Check className="w-10 h-10 text-lavender/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "pending", "accepted", "completed"].map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? "calm" : "outline"}
                    size="sm"
                    onClick={() => setFilter(status)}
                    className="capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Appointments List */}
          <FadeIn delay={0.2}>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Appointment Requests</CardTitle>
                <CardDescription>
                  Manage and respond to student appointment requests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {filteredAppointments.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No appointments found.
                      </p>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="border border-border rounded-xl overflow-hidden"
                        >
                          {/* Main Row */}
                          <div
                            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => setExpandedId(expandedId === appointment.id ? null : appointment.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                                <User className="w-6 h-6 text-sage" />
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{appointment.studentName}</p>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(appointment.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {appointment.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(appointment.status)}
                              {expandedId === appointment.id ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {expandedId === appointment.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30">
                                  <div className="mb-4">
                                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                                    <p className="text-sm text-foreground">{appointment.studentEmail}</p>
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                      <FileText className="w-4 h-4" />
                                      Student Notes
                                    </p>
                                    <p className="text-sm text-foreground bg-background p-3 rounded-lg">
                                      {appointment.notes}
                                    </p>
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="flex flex-wrap gap-2">
                                    {appointment.status === "pending" && (
                                      <>
                                        <Button
                                          variant="calm"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAccept(appointment.id);
                                          }}
                                        >
                                          <Check className="w-4 h-4 mr-1" />
                                          Accept
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleReschedule(appointment.id);
                                          }}
                                        >
                                          <RefreshCw className="w-4 h-4 mr-1" />
                                          Reschedule
                                        </Button>
                                      </>
                                    )}
                                    {appointment.status === "accepted" && (
                                      <>
                                        <Button variant="calm" size="sm">
                                          Join Session
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleComplete(appointment.id);
                                          }}
                                        >
                                          <Check className="w-4 h-4 mr-1" />
                                          Mark Complete
                                        </Button>
                                      </>
                                    )}
                                    {appointment.status === "completed" && (
                                      <p className="text-sm text-muted-foreground">
                                        This session has been completed.
                                      </p>
                                    )}
                                    {appointment.status === "rescheduled" && (
                                      <p className="text-sm text-muted-foreground">
                                        Awaiting student to select a new time.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default CounsellorDashboard;
