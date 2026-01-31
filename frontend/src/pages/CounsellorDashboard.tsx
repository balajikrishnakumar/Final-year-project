import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Check,
  X,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/PageTransition";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";

type Status = "pending" | "accepted" | "rejected" | "completed";

interface Appointment {
  _id: string;
  studentId: {
    name: string;
    email: string;
  };
  date: string;
  time: string;
  notes: string;
  status: Status;
}

const CounsellorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* =========================
     FETCH APPOINTMENTS
  ========================= */
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Fetch appointments error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE STATUS
  ========================= */
  const updateStatus = async (id: string, status: Status) => {
    const res = await fetch(
      `${API}/counsellor/appointments/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Action failed");
      return;
    }

    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    const matchesFilter = filter === "all" || a.status === filter;
    const matchesSearch = a.studentId.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const badgeStyle = (status: Status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender to-sage flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-semibold">Counsellor Dashboard</h1>
              <p className="text-sm text-muted-foreground">Appointments</p>
            </div>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">Sign Out</Link>
          </Button>
        </div>
      </header>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Filters */}
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {["all", "pending", "accepted", "completed"].map((s) => (
                <Button
                  key={s}
                  variant={filter === s ? "calm" : "outline"}
                  size="sm"
                  onClick={() => setFilter(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </FadeIn>

          {/* Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>
                Manage and respond to student appointment requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : filteredAppointments.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">
                  No appointments found
                </p>
              ) : (
                <AnimatePresence>
                  {filteredAppointments.map((a) => (
                    <motion.div
                      key={a._id}
                      className="border rounded-lg mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div
                        className="p-4 flex justify-between cursor-pointer"
                        onClick={() =>
                          setExpandedId(expandedId === a._id ? null : a._id)
                        }
                      >
                        <div>
                          <p className="font-semibold">{a.studentId.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {a.studentId.email}
                          </p>
                          <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(a.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {a.time}
                            </span>
                          </div>
                        </div>

                        <Badge className={badgeStyle(a.status)}>
                          {a.status.toUpperCase()}
                        </Badge>
                      </div>

                      {expandedId === a._id && (
                        <div className="p-4 border-t bg-muted/30">
                          <p className="text-sm mb-3">
                            <strong>Notes:</strong> {a.notes}
                          </p>

                          {a.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() =>
                                  updateStatus(a._id, "accepted")
                                }
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  updateStatus(a._id, "rejected")
                                }
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}

                          {a.status === "accepted" && (
                            <Button
                              variant="outline"
                              onClick={() =>
                                updateStatus(a._id, "completed")
                              }
                            >
                              Mark Completed
                            </Button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CounsellorDashboard;
