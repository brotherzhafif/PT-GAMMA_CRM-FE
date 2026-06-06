import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";

export default function NewFeedbackModal({ open, onOpenChange, onConfirm }) {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("Service");
  const [source, setSource] = useState("Tablet");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const categories = ["Treatment", "Wait Time", "Facility", "Billing", "Service"];
  const sources = ["WhatsApp", "Tablet", "Web Form", "Google", "Walk-in"];

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const validate = () => {
    const nextErrors = {};
    if (!patientName.trim()) {
      nextErrors.patientName = "Patient name is required";
    }
    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required";
    }
    if (!comment.trim()) {
      nextErrors.comment = "Feedback text is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Determine sentiment based on rating
    let sentiment = "Neutral";
    if (rating >= 4) {
      sentiment = "Positive";
    } else if (rating <= 2) {
      sentiment = "Negative";
    }

    const payload = {
      patientName,
      phone,
      email: email || "N/A",
      rating,
      category,
      source,
      comment,
      sentiment,
      status: "Pending",
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      replies: []
    };

    onConfirm(payload);
    
    // Reset form
    setPatientName("");
    setPhone("");
    setEmail("");
    setRating(5);
    setCategory("Service");
    setSource("Tablet");
    setComment("");
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] border border-slate-200 dark:border-gray-800 bg-white dark:bg-card">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Add New Feedback</DialogTitle>
          <p className="text-xs text-muted-foreground">
            Log patient comments, ratings, and clinics evaluations manually.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Patient Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="patientName" className="text-xs font-bold text-foreground">
              Patient Name *
            </Label>
            <Input
              id="patientName"
              placeholder="e.g. John Doe"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className={`text-xs h-9 bg-slate-50 dark:bg-input/20 border ${
                errors.patientName ? "border-rose-500 ring-rose-500/20" : "border-gray-300 dark:border-gray-800"
              }`}
            />
            {errors.patientName && (
              <span className="text-[10px] text-rose-500 font-semibold">{errors.patientName}</span>
            )}
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone" className="text-xs font-bold text-foreground">
                Phone Number *
              </Label>
              <Input
                id="phone"
                placeholder="+62..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`text-xs h-9 bg-slate-50 dark:bg-input/20 border ${
                  errors.phone ? "border-rose-500 ring-rose-500/20" : "border-gray-300 dark:border-gray-800"
                }`}
              />
              {errors.phone && (
                <span className="text-[10px] text-rose-500 font-semibold">{errors.phone}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="patient@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs h-9 bg-slate-50 dark:bg-input/20 border border-gray-300 dark:border-gray-800"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-foreground">Satisfaction Rating *</Label>
            <div className="flex items-center gap-2 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const starVal = i + 1;
                const active = starVal <= rating;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRatingSelect(starVal)}
                    className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800 transition cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        active ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-gray-700"
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs text-muted-foreground font-bold ml-1">
                ({rating} Star{rating !== 1 && "s"})
              </span>
            </div>
          </div>

          {/* Category & Source */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold text-foreground">Evaluation Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 dark:bg-input/20 border border-gray-300 dark:border-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold text-foreground">Source Channel</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 dark:bg-input/20 border border-gray-300 dark:border-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comments */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="comment" className="text-xs font-bold text-foreground">
              Feedback Text *
            </Label>
            <Textarea
              id="comment"
              placeholder="Describe the patient's comments or reviews..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`text-xs min-h-[90px] bg-slate-50 dark:bg-input/20 border ${
                errors.comment ? "border-rose-500 ring-rose-500/20" : "border-gray-300 dark:border-gray-800"
              }`}
            />
            {errors.comment && (
              <span className="text-[10px] text-rose-500 font-semibold">{errors.comment}</span>
            )}
          </div>

          <DialogFooter className="mt-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white h-9 text-xs font-bold shadow-md cursor-pointer"
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
