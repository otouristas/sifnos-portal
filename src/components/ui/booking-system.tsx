import { useState } from "react";
import { Calendar, Clock, Users, Euro, Check, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BookingSlot {
  time: string;
  available: boolean;
  price?: number;
}

interface BookingData {
  date: Date | undefined;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface BookingSystemProps {
  businessId: string;
  businessName: string;
  businessType: "accommodation" | "restaurant" | "experience" | "rental";
  basePrice: number;
  currency?: string;
  maxGuests?: number;
  availableSlots?: BookingSlot[];
  externalBookingUrl?: string;
  className?: string;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30"
];

const BookingForm = ({ 
  businessName, 
  businessType, 
  basePrice, 
  currency = "€",
  maxGuests = 8,
  onSubmit 
}: {
  businessName: string;
  businessType: string;
  basePrice: number;
  currency?: string;
  maxGuests?: number;
  onSubmit: (booking: BookingData) => void;
}) => {
  const [booking, setBooking] = useState<BookingData>({
    date: undefined,
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  
  const [step, setStep] = useState(1);
  
  const totalPrice = basePrice * booking.guests;
  const isFormValid = booking.date && booking.time && booking.name && booking.email;
  
  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(booking);
    }
  };

  const getBookingLabel = () => {
    switch (businessType) {
      case "accommodation": return "Book Stay";
      case "restaurant": return "Reserve Table";
      case "experience": return "Book Experience";
      case "rental": return "Reserve Rental";
      default: return "Make Reservation";
    }
  };

  const getGuestsLabel = () => {
    switch (businessType) {
      case "accommodation": return "Guests";
      case "restaurant": return "Diners";
      case "experience": return "Participants";
      case "rental": return "People";
      default: return "Guests";
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step > stepNum ? <Check className="h-4 w-4" /> : stepNum}
            </div>
            <span className={`text-sm ${step >= stepNum ? 'text-foreground' : 'text-muted-foreground'}`}>
              {stepNum === 1 && "Date & Time"}
              {stepNum === 2 && "Details"}
              {stepNum === 3 && "Confirm"}
            </span>
            {stepNum < 3 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Date & Time Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">Select Date</Label>
            <CalendarComponent
              mode="single"
              selected={booking.date}
              onSelect={(date) => setBooking(prev => ({ ...prev, date }))}
              disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
              className="rounded-md border mt-2"
            />
          </div>
          
          {booking.date && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Available Times</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={booking.time === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBooking(prev => ({ ...prev, time }))}
                    className="justify-center"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-base font-semibold">
              Number of {getGuestsLabel()}
            </Label>
            <Select 
              value={booking.guests.toString()}
              onValueChange={(value) => setBooking(prev => ({ ...prev, guests: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? getGuestsLabel().slice(0, -1) : getGuestsLabel()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={() => setStep(2)} 
            disabled={!booking.date || !booking.time}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Contact Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={booking.name}
                onChange={(e) => setBooking(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={booking.email}
                onChange={(e) => setBooking(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={booking.phone}
              onChange={(e) => setBooking(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+30 xxx xxx xxxx"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requests">Special Requests</Label>
            <Textarea
              id="requests"
              value={booking.specialRequests}
              onChange={(e) => setBooking(prev => ({ ...prev, specialRequests: e.target.value }))}
              placeholder="Any special requirements or requests..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={() => setStep(3)} 
              disabled={!booking.name || !booking.email}
              className="flex-1"
            >
              Review Booking
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Business:</span>
                  <p className="font-medium">{businessName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date & Time:</span>
                  <p className="font-medium">
                    {booking.date?.toLocaleDateString()} at {booking.time}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">{getGuestsLabel()}:</span>
                  <p className="font-medium">{booking.guests}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Contact:</span>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-xs text-muted-foreground">{booking.email}</p>
                </div>
              </div>
              
              {booking.specialRequests && (
                <div>
                  <span className="text-muted-foreground text-sm">Special Requests:</span>
                  <p className="text-sm mt-1">{booking.specialRequests}</p>
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total Price:</span>
                <span>{currency}{totalPrice}</span>
              </div>
            </CardContent>
          </Card>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your booking request will be sent to {businessName}. They will contact you within 24 hours to confirm availability and provide payment instructions.
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-gradient-hero hover:bg-primary-dark">
              Confirm {getBookingLabel()}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingSystem = ({
  businessId,
  businessName,
  businessType,
  basePrice,
  currency = "€",
  maxGuests = 8,
  externalBookingUrl,
  className
}: BookingSystemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleBookingSubmit = (bookingData: BookingData) => {
    // Simulate booking submission
    console.log('Booking submitted:', { businessId, ...bookingData });
    setBookingStatus('success');
    setTimeout(() => {
      setIsOpen(false);
      setBookingStatus('idle');
    }, 2000);
  };

  const getBookingLabel = () => {
    switch (businessType) {
      case "accommodation": return "Book Stay";
      case "restaurant": return "Reserve Table";
      case "experience": return "Book Experience";
      case "rental": return "Reserve Rental";
      default: return "Make Reservation";
    }
  };

  if (externalBookingUrl) {
    return (
      <Button 
        asChild
        className={`bg-gradient-hero hover:bg-primary-dark ${className}`}
      >
        <a href={externalBookingUrl} target="_blank" rel="noopener noreferrer">
          {getBookingLabel()}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`bg-gradient-hero hover:bg-primary-dark ${className}`}>
          {getBookingLabel()}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {getBookingLabel()} - {businessName}
          </DialogTitle>
        </DialogHeader>
        
        {bookingStatus === 'success' ? (
          <div className="text-center py-8">
            <Check className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Booking Request Sent!</h3>
            <p className="text-muted-foreground">
              {businessName} will contact you within 24 hours to confirm your booking.
            </p>
          </div>
        ) : (
          <BookingForm
            businessName={businessName}
            businessType={businessType}
            basePrice={basePrice}
            currency={currency}
            maxGuests={maxGuests}
            onSubmit={handleBookingSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export { BookingSystem, type BookingData };
