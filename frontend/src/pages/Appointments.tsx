import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Appointment = {
  _id: string;
  counsellorId: string;
  date: string;
  time: string;
  status: string;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="pt-24 px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

        {loading && <p>Loading appointments...</p>}

        {!loading && appointments.length === 0 && (
          <p className="text-muted-foreground">
            No appointments booked yet.
          </p>
        )}

        <div className="space-y-4">
          {appointments.map((a) => (
            <Card key={a._id} variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-sage" />
                  Counsellor Session
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sage" />
                    {new Date(a.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sage" />
                    {a.time}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : a.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.status.toUpperCase()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
