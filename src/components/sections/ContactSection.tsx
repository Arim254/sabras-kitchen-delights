import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, CalendarIcon, Users, Clock, DollarSign, Download, Upload, FileText } from "lucide-react";
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Event date validation
    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (formData.eventDate < today) {
        newErrors.eventDate = "Event date must be in the future";
      }
    }

    // Event time validation
    if (!formData.eventTime) {
      newErrors.eventTime = "Please select a time slot";
    }

    // Event type validation
    if (!formData.eventType) {
      newErrors.eventType = "Please select an event type";
    }

    // Guest count validation
    if (!formData.guestCount) {
      newErrors.guestCount = "Number of guests is required";
    } else {
      const count = parseInt(formData.guestCount, 10);
      if (isNaN(count) || count < 1) {
        newErrors.guestCount = "Please enter a valid number of guests";
      } else if (count > 1000) {
        newErrors.guestCount = "Maximum 1000 guests allowed";
      }
    }

    // Budget per person validation
    if (!formData.budgetPerPerson) {
      newErrors.budgetPerPerson = "Budget per person is required";
    } else {
      const budget = parseFloat(formData.budgetPerPerson);
      if (isNaN(budget) || budget < 1) {
        newErrors.budgetPerPerson = "Please enter a valid amount";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Please provide event details";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("eventDate", formData.eventDate ? format(formData.eventDate, "dd/MM/yyyy") : "");
      formDataToSend.append("eventTime", formData.eventTime);
      formDataToSend.append("eventType", formData.eventType);
      formDataToSend.append("guestCount", formData.guestCount);
      formDataToSend.append("budgetPerPerson", `KES ${formData.budgetPerPerson}`);
      formDataToSend.append("message", formData.message);
      
      if (menuFile) {
        formDataToSend.append("menuSelection", menuFile);
      }

      const response = await fetch("https://formspree.io/f/xvzzozbo", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Inquiry Sent!",
          description: "Thank you for your inquiry. We'll get back to you soon.",
        });

        setFormData({ 
          name: "", 
          email: "", 
          eventDate: undefined, 
          eventTime: "",
          eventType: "", 
          guestCount: "", 
          budgetPerPerson: "",
          message: "" 
        });
        setMenuFile(null);
        setErrors({});
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, menuFile: "Please upload a PDF file" }));
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, menuFile: "File size must be less than 10MB" }));
        return;
      }
      setMenuFile(file);
      setErrors((prev) => ({ ...prev, menuFile: undefined }));
    }
  };

  const eventTypes = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Private Dinner",
    "Anniversary",
    "Baby Shower",
    "Graduation Party",
    "Other",
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground">
            Ready to create delicious moments? Let's discuss your catering needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Let's Connect
            </h3>
            <p className="text-muted-foreground mb-8">
              Whether you're planning a wedding, corporate event, or intimate dinner party, 
              we'd love to hear from you. Reach out through any of the channels below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:sabraskitchen1@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    sabraskitchen1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:+254722899195"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +254 722 899 195
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/254722899195"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#25D366] text-card font-medium rounded-lg hover:bg-[#22c55e] transition-colors"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg shadow-theme-lg p-8">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Book Your Event
            </h3>

            {/* Menu Download Section */}
            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="text-primary" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">Download Our Menu</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download our menu selection form, choose your preferred items, and upload it back with your booking.
                  </p>
                  <a
                    href="/Sabras_menu_items.pdf"
                    download="Sabras_Menu_Selection.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Download size={16} />
                    Download Menu PDF
                  </a>
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                    errors.name ? "border-destructive" : "border-border"
                  )}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                    errors.email ? "border-destructive" : "border-border"
                  )}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Date <span className="text-destructive">*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal px-4 py-3 h-auto bg-input",
                          !formData.eventDate && "text-muted-foreground",
                          errors.eventDate ? "border-destructive" : "border-border"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.eventDate ? (
                          format(formData.eventDate, "dd/MM/yyyy")
                        ) : (
                          <span>dd/mm/yyyy</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.eventDate}
                        onSelect={(date) => {
                          setFormData((prev) => ({ ...prev, eventDate: date }));
                          if (errors.eventDate) {
                            setErrors((prev) => ({ ...prev, eventDate: undefined }));
                          }
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-destructive">{errors.eventDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Time <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={formData.eventTime}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, eventTime: value }));
                      if (errors.eventTime) {
                        setErrors((prev) => ({ ...prev, eventTime: undefined }));
                      }
                    }}
                  >
                    <SelectTrigger 
                      className={cn(
                        "w-full px-4 py-3 h-auto bg-input",
                        errors.eventTime ? "border-destructive" : "border-border"
                      )}
                    >
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover max-h-60">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventTime && (
                    <p className="mt-1 text-sm text-destructive">{errors.eventTime}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type of Event <span className="text-destructive">*</span>
                </label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, eventType: value }));
                    if (errors.eventType) {
                      setErrors((prev) => ({ ...prev, eventType: undefined }));
                    }
                  }}
                >
                  <SelectTrigger 
                    className={cn(
                      "w-full px-4 py-3 h-auto bg-input",
                      errors.eventType ? "border-destructive" : "border-border"
                    )}
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.eventType && (
                  <p className="mt-1 text-sm text-destructive">{errors.eventType}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="guestCount"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Number of Guests <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      min="1"
                      max="1000"
                      className={cn(
                        "w-full pl-10 pr-4 py-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                        errors.guestCount ? "border-destructive" : "border-border"
                      )}
                      placeholder="e.g. 50"
                    />
                  </div>
                  {errors.guestCount && (
                    <p className="mt-1 text-sm text-destructive">{errors.guestCount}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="budgetPerPerson"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Budget per Person (KES) <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      id="budgetPerPerson"
                      name="budgetPerPerson"
                      value={formData.budgetPerPerson}
                      onChange={handleChange}
                      min="1"
                      className={cn(
                        "w-full pl-10 pr-4 py-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                        errors.budgetPerPerson ? "border-destructive" : "border-border"
                      )}
                      placeholder="e.g. 1500"
                    />
                  </div>
                  {errors.budgetPerPerson && (
                    <p className="mt-1 text-sm text-destructive">{errors.budgetPerPerson}</p>
                  )}
                </div>
              </div>

              {/* Menu Upload Section */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Completed Menu Selection
                </label>
                <div 
                  className={cn(
                    "relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors hover:border-primary/50",
                    menuFile ? "border-primary bg-primary/5" : "border-border",
                    errors.menuFile && "border-destructive"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {menuFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="text-primary" size={20} />
                      <span className="text-sm text-foreground font-medium">{menuFile.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-muted-foreground" size={24} />
                      <span className="text-sm text-muted-foreground">
                        Click to upload your completed menu PDF
                      </span>
                    </div>
                  )}
                </div>
                {errors.menuFile && (
                  <p className="mt-1 text-sm text-destructive">{errors.menuFile}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Optional: Upload the menu form after selecting your preferred items
                </p>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Event Details & Special Requests <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none",
                    errors.message ? "border-destructive" : "border-border"
                  )}
                  placeholder="Tell us about your event, dietary requirements, or any special requests..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
