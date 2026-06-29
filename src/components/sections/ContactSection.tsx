import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, CalendarIcon, Users, Clock, DollarSign, Download, Upload, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  email?: string;
  eventDate?: string;
  eventTime?: string;
  eventType?: string;
  guestCount?: string;
  budgetPerPerson?: string;
  message?: string;
  menuFile?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventDate: undefined as Date | undefined,
    eventTime: "",
    eventType: "",
    guestCount: "",
    budgetPerPerson: "",
    message: "",
  });
  const [menuFile, setMenuFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else if (formData.eventDate <= new Date()) {
      newErrors.eventDate = "Event date must be in the future";
    }
    if (!formData.eventTime) {
      newErrors.eventTime = "Event time is required";
    }
    if (!formData.eventType) {
      newErrors.eventType = "Event type is required";
    }
    if (!formData.guestCount.trim()) {
      newErrors.guestCount = "Number of guests is required";
    } else if (isNaN(Number(formData.guestCount)) || Number(formData.guestCount) < 1) {
      newErrors.guestCount = "Please enter a valid number of guests";
    } else if (Number(formData.guestCount) > 1000) {
      newErrors.guestCount = "For more than 1000 guests, please contact us directly";
    }
    if (!formData.budgetPerPerson.trim()) {
      newErrors.budgetPerPerson = "Budget per person is required";
    } else if (isNaN(Number(formData.budgetPerPerson)) || Number(formData.budgetPerPerson) < 1) {
      newErrors.budgetPerPerson = "Please enter a valid budget amount";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Event details are required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (at least 10 characters)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, menuFile: "Only PDF files are allowed" }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, menuFile: "File must be less than 10MB" }));
        return;
      }
      setMenuFile(file);
      setErrors((prev) => ({ ...prev, menuFile: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("eventDate", formData.eventDate ? format(formData.eventDate, "PPP") : "");
      formPayload.append("eventTime", formData.eventTime);
      formPayload.append("eventType", formData.eventType);
      formPayload.append("guestCount", formData.guestCount);
      formPayload.append("budgetPerPerson", formData.budgetPerPerson);
      formPayload.append("message", formData.message);
      if (menuFile) {
        formPayload.append("menuFile", menuFile);
      }
      const response = await fetch("https://formspree.io/f/xvzzozbo", {
        method: "POST",
        body: formPayload,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        toast({
          title: "Booking request sent! 🎉",
          description: "Thank you! We'll get back to you within 24 hours to confirm your catering booking.",
        });
        setFormData({
          name: "",
          email: "",
          eventDate: undefined,
          eventTime: "",
          eventType: "",
          guestCount: "",
          budgetPerPerson: "",
          message: "",
        });
        setMenuFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setErrors({});
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="organic-blob -top-40 -right-40 w-96 h-96 bg-primary/5" />
      <div className="organic-blob -bottom-40 -left-40 w-80 h-80 bg-secondary/5" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 animate-fade-in">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title mt-2 mb-4">
            Book Your Event
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
          <p className="section-description mx-auto">
            Ready to create something delicious? Fill out the form below and we'll craft
            the perfect menu for your special occasion.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-2 space-y-6 animate-slide-in-left">
            {/* Download Menu Card */}
            <div className="glass-card rounded-xl p-6 border-l-4 border-l-secondary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1">Select Your Menu</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download our menu selection form to choose your preferred dishes.
                  </p>
                  <Button variant="goldOutline" size="sm" asChild>
                    <a href="/Sabras_menu_items.pdf" download>
                      <Download className="w-4 h-4" />
                      Download Menu PDF
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="glass-card rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Email</p>
                  <a href="mailto:sabraskitchen1@gmail.com" className="text-foreground hover:text-primary transition-colors font-medium">
                    sabraskitchen1@gmail.com
                  </a>
                </div>
              </div>
              <div className="w-full h-px bg-border" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Phone</p>
                  <a href="tel:+254722899195" className="text-foreground hover:text-primary transition-colors font-medium">
                    +254 722 899 195
                  </a>
                </div>
              </div>
              <div className="w-full h-px bg-border" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Location</p>
                  <p className="text-foreground font-medium">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">Prefer WhatsApp?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a quick response on WhatsApp. We're typically online 8 AM - 8 PM.
                </p>
                <Button variant="gold" className="w-full" asChild>
                  <a href="https://wa.me/254722899195" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-3 animate-slide-in-right">
            <div className="glass-card rounded-xl p-6 lg:p-8 shadow-warm-lg">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      data-error={errors.name ? "true" : undefined}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        "w-full h-11 rounded-lg border bg-background px-4 text-sm transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                        errors.name ? "border-destructive ring-1 ring-destructive/30" : "border-input hover:border-primary/50"
                      )}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      data-error={errors.email ? "true" : undefined}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        "w-full h-11 rounded-lg border bg-background px-4 text-sm transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                        errors.email ? "border-destructive ring-1 ring-destructive/30" : "border-input hover:border-primary/50"
                      )}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-foreground">
                      Event Date <span className="text-primary">*</span>
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          data-error={errors.eventDate ? "true" : undefined}
                          className={cn(
                            "w-full h-11 rounded-lg border bg-background px-4 text-sm text-left flex items-center gap-2 transition-all duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                            errors.eventDate ? "border-destructive ring-1 ring-destructive/30" : "border-input hover:border-primary/50",
                            !formData.eventDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="w-4 h-5 text-secondary shrink-0" />
                          {formData.eventDate ? format(formData.eventDate, "PPP") : "Select event date"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.eventDate}
                          onSelect={(date) => setFormData({ ...formData, eventDate: date })}
                          disabled={(date) => date <= new Date()}
                          initialFocus
                          className="rounded-lg border border-border"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.eventDate && <p className="text-xs text-destructive mt-1">{errors.eventDate}</p>}
                  </div>

                  {/* Event Time */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-foreground">
                      Event Time <span className="text-primary">*</span>
                    </label>
                    <Select
                      value={formData.eventTime}
                      onValueChange={(value) => setFormData({ ...formData, eventTime: value })}
                    >
                      <SelectTrigger
                        data-error={errors.eventTime ? "true" : undefined}
                        className={cn(
                          "w-full h-11 rounded-lg border bg-background px-4 text-sm",
                          errors.eventTime ? "border-destructive ring-1 ring-destructive/30" : "border-input"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary shrink-0" />
                          <SelectValue placeholder="Select event time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.eventTime && <p className="text-xs text-destructive mt-1">{errors.eventTime}</p>}
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-foreground">
                      Type of Event <span className="text-primary">*</span>
                    </label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                    >
                      <SelectTrigger
                        data-error={errors.eventType ? "true" : undefined}
                        className={cn(
                          "w-full h-11 rounded-lg border bg-background px-4 text-sm",
                          errors.eventType ? "border-destructive ring-1 ring-destructive/30" : "border-input"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-secondary shrink-0" />
                          <SelectValue placeholder="Select event type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {["Wedding", "Corporate Event", "Private Party", "Birthday", "Anniversary", "Graduation", "Baby Shower", "Other"].map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.eventType && <p className="text-xs text-destructive mt-1">{errors.eventType}</p>}
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium mb-1.5 text-foreground">
                      Number of Guests <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-5 text-secondary pointer-events-none" />
                      <input
                        id="guestCount"
                        type="number"
                        min="1"
                        max="1000"
                        data-error={errors.guestCount ? "true" : undefined}
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className={cn(
                          "w-full h-11 rounded-lg border bg-background pl-10 pr-4 text-sm transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                          errors.guestCount ? "border-destructive ring-1 ring-destructive/30" : "border-input hover:border-primary/50"
                        )}
                        placeholder="e.g. 50"
                      />
                    </div>
                    {errors.guestCount && <p className="text-xs text-destructive mt-1">{errors.guestCount}</p>}
                  </div>

                  {/* Budget per person */}
                  <div className="sm:col-span-2">
                    <label htmlFor="budgetPerPerson" className="block text-sm font-medium mb-1.5 text-foreground">
                      Budget per Person (KES) <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-5 text-secondary pointer-events-none" />
                      <input
                        id="budgetPerPerson"
                        type="number"
                        min="1"
                        data-error={errors.budgetPerPerson ? "true" : undefined}
                        value={formData.budgetPerPerson}
                        onChange={(e) => setFormData({ ...formData, budgetPerPerson: e.target.value })}
                        className={cn(
                          "w-full h-11 rounded-lg border bg-background pl-10 pr-4 text-sm transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                          errors.budgetPerPerson ? "border-destructive ring-1 ring-destructive/30" : "border-input hover:border-primary/50"
                        )}
                        placeholder="e.g. 1500"
                      />
                    </div>
                    {errors.budgetPerPerson && <p className="text-xs text-destructive mt-1">{errors.budgetPerPerson}</p>}
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground">
                    Event Details & Special Requests <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    data-error={errors.message ? "true" : undefined}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full rounded-lg border bg-background px-4 py-3 text-sm transition-all duration-200 resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                      errors.message ? "border-destructive ring-1 ring-destructive/30" : "border-input hover:border-primary/50"
                    )}
                    placeholder="Tell us about your event, dietary requirements, and any special requests..."
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">
                    Upload Completed Menu (Optional)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
                      "hover:border-secondary/50 hover:bg-secondary/5",
                      menuFile ? "border-secondary bg-secondary/5" : "border-border"
                    )}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {menuFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{menuFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(menuFile.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-secondary/60 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          <span className="text-secondary font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PDF only, max 10MB</p>
                      </div>
                    )}
                  </div>
                  {errors.menuFile && <p className="text-xs text-destructive mt-1">{errors.menuFile}</p>}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Booking Request
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
