import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/PageTransition";

const BookAppointment = () => {
  const [step, setStep] = useState(1);

  // ✅ MUST be string (Mongo ObjectId)
  const [selectedCounsellor, setSelectedCounsellor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // ✅ TEMP counsellors with Mongo-like ObjectIds
  const counsellors = [
    {
      _id: "6955f33eb47af2d26730b0c8",
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Stress Management",
      experience: "10+ years",
      avatar: "SJ",
    },
    {
      _id: "6955f348b47af2d26730b0ca",
      name: "Dr. Michael Chen",
      specialty: "Depression & Mood Disorders",
      experience: "8+ years",
      avatar: "MC",
    },
    {
      _id: "6955f353b47af2d26730b0cc",
      name: "Dr. Emily Williams",
      specialty: "Academic Stress & Performance",
      experience: "6+ years",
      avatar: "EW",
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const generateDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates.slice(0, 7);
  };

  const availableDates = generateDates();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  // ✅ BOOK APPOINTMENT
  const handleBook = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        return;
      }

      console.log("BOOKING WITH:", {
        counsellorId: selectedCounsellor,
        date: selectedDate,
        time: selectedTime,
      });

      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          counsellorId: selectedCounsellor, // ✅ ObjectId
          date: selectedDate,
          time: selectedTime,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Booking failed");
        return;
      }

      setIsBooked(true);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error");
    }
  };

  if (isBooked) {
    const c = counsellors.find(c => c._id === selectedCounsellor);
    return (
      <div className="min-h-screen bg-background">
        <Navbar variant="dashboard" />
        <main className="pt-24 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto bg-sage-light rounded-full flex items-center justify-center mb-6">
              <Check className="w-12 h-12 text-sage" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Appointment Booked!</h1>
            <p className="text-muted-foreground mb-6">
              Your appointment has been successfully scheduled.
            </p>

            <Card>
              <CardContent className="p-6 space-y-4">
                <p><strong>Counsellor:</strong> {c?.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="hero">
                <Link to="/appointments">My Appointments</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />

      <main className="pt-24 px-4 max-w-4xl mx-auto">
        <FadeIn>
          <Link to="/dashboard" className="flex items-center gap-2 text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>
        </FadeIn>

        {step === 1 && (
          <FadeIn>
            <h2 className="text-xl font-semibold mb-4">Choose Counsellor</h2>
            <StaggerContainer className="grid md:grid-cols-3 gap-4">
              {counsellors.map(c => (
                <StaggerItem key={c._id}>
                  <Card
                    className={`cursor-pointer ${
                      selectedCounsellor === c._id ? "ring-2 ring-sage" : ""
                    }`}
                    onClick={() => setSelectedCounsellor(c._id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto bg-sage-light rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl font-bold text-sage">{c.avatar}</span>
                      </div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.specialty}</p>
                      <p className="text-xs text-sage mt-1">{c.experience}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-6 text-right">
              <Button onClick={() => setStep(2)} disabled={!selectedCounsellor}>
                Continue
              </Button>
            </div>
          </FadeIn>
        )}

        {step === 2 && (
          <FadeIn>
            <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>

            <div className="flex gap-3 overflow-x-auto mb-6">
              {availableDates.map(d => {
                const f = formatDate(d);
                return (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded ${
                      selectedDate === d ? "bg-sage text-white" : "bg-muted"
                    }`}
                  >
                    <p className="text-xs">{f.day}</p>
                    <p className="text-lg font-bold">{f.date}</p>
                    <p className="text-xs">{f.month}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`p-3 rounded ${
                    selectedTime === t ? "bg-sage text-white" : "bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}>
                Continue
              </Button>
            </div>
          </FadeIn>
        )}

        {step === 3 && (
          <FadeIn>
            <h2 className="text-xl font-semibold mb-4">Confirm</h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes (optional)"
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleBook}>Confirm Booking</Button>
            </div>
          </FadeIn>
        )}
      </main>
    </div>
  );
};

export default BookAppointment;
