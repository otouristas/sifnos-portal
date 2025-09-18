import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapLocation } from "@/components/ui/map-location";
import { useCategories } from "@/hooks/use-categories";
import { useVillages } from "@/hooks/use-villages";
import { useSubscriptionPlans } from "@/hooks/use-subscription-plans";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { staticPagesSEO } from "@/lib/seo-utils";
import { 
  Upload, 
  X, 
  MapPin, 
  Info, 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  Camera,
  Clock,
  Star,
  DollarSign,
  Languages,
  Tag,
  Crown,
  Zap,
  CheckCircle2
} from "lucide-react";

const SubmitBusiness = () => {
  const { toast } = useToast();
  const seoData = staticPagesSEO.submitBusiness;
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: villages, isLoading: villagesLoading } = useVillages();
  const { data: subscriptionPlans, isLoading: plansLoading } = useSubscriptionPlans();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    village_id: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    price_range: "",
    season: "",
    booking: "",
    maps_url: "",
    tags: [] as string[],
    features: [] as string[],
    languages: [] as string[],
    photo_urls: [] as string[],
    subscription_plan_id: ""
  });

  const [newTag, setNewTag] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [mapCoordinates, setMapCoordinates] = useState<[number, number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceRanges = [
    { value: "€", label: "€ - Οικονομικό (κάτω από 20€)" },
    { value: "€€", label: "€€ - Μέτριο (20-50€)" },
    { value: "€€€", label: "€€€ - Ακριβό (50-100€)" },
    { value: "€€€€", label: "€€€€ - Πολυτελές (πάνω από 100€)" }
  ];

  const availableLanguages = [
    "Ελληνικά", "English", "Français", "Deutsch", "Italiano", "Español", "Русский"
  ];

  const seasons = [
    "Όλο το χρόνο",
    "Απρίλιος - Οκτώβριος", 
    "Μάιος - Σεπτέμβριος",
    "Ιούνιος - Αύγουστος",
    "Άλλο"
  ];

  // Pricing plan recommendations based on category
  const getPlanRecommendation = (categorySlug: string) => {
    const selectedCategory = categories?.find(cat => cat.id === formData.category_id);
    if (!selectedCategory) return null;

    const slug = selectedCategory.slug;
    
    switch (slug) {
      case 'accommodation':
        return {
          recommended: 'Professional',
          reason: 'Τα καταλύματα χρειάζονται μέγιστη προβολή με φωτογραφίες, κρατήσεις και προτεραιότητα στα αποτελέσματα αναζήτησης.'
        };
      case 'food-drink':
        return {
          recommended: 'Premium',
          reason: 'Τα εστιατόρια και ταβέρνες επωφελούνται από πολλές φωτογραφίες φαγητού και προτεραιότητα στην αναζήτηση.'
        };
      case 'experiences':
        return {
          recommended: 'Premium',
          reason: 'Οι εμπειρίες και δραστηριότητες χρειάζονται καλή προβολή και φωτογραφίες για να προσελκύσουν τουρίστες.'
        };
      case 'pottery-crafts':
        return {
          recommended: 'Premium',
          reason: 'Τα εργαστήρια κεραμικής χρειάζονται φωτογραφίες των έργων και καλή προβολή στους τουρίστες.'
        };
      case 'vehicle-rentals':
        return {
          recommended: 'Premium',
          reason: 'Οι ενοικιάσεις οχημάτων χρειάζονται προτεραιότητα στην αναζήτηση και φωτογραφίες του στόλου.'
        };
      case 'wellness':
        return {
          recommended: 'Premium',
          reason: 'Οι υπηρεσίες wellness επωφελούνται από προτεραιότητα στην αναζήτηση και επαγγελματική παρουσία.'
        };
      default:
        return {
          recommended: 'Free',
          reason: 'Η δωρεάν καταχώρηση είναι ιδανική για να ξεκινήσετε και να δοκιμάσετε την πλατφόρμα.'
        };
    }
  };

  const planRecommendation = getPlanRecommendation(formData.category_id);

  // Get plan features in Greek
  const getPlanFeaturesInGreek = (features: string[]) => {
    const featureTranslations: { [key: string]: string } = {
      'Basic listing': 'Βασική καταχώρηση',
      'Contact information': 'Στοιχεία επικοινωνίας',
      '1 photo': '1 φωτογραφία',
      'Enhanced listing': 'Βελτιωμένη καταχώρηση',
      'Up to 10 photos': 'Έως 10 φωτογραφίες',
      'Priority in search': 'Προτεραιότητα στην αναζήτηση',
      'Analytics': 'Στατιστικά',
      'Premium features': 'Premium χαρακτηριστικά',
      'Unlimited photos': 'Απεριόριστες φωτογραφίες',
      'Featured placement': 'Προβεβλημένη τοποθέτηση',
      'Booking integration': 'Ενσωμάτωση κρατήσεων',
      'Advanced analytics': 'Προχωρημένα στατιστικά',
      'Featured in search': 'Προβολή στην αναζήτηση',
      'Photo gallery': 'Γκαλερί φωτογραφιών',
      'Premium support': 'Premium υποστήριξη',
      'Analytics dashboard': 'Πίνακας στατιστικών',
      'Top placement': 'Κορυφαία τοποθέτηση',
      'Homepage featuring': 'Προβολή στην αρχική',
      'Social media promotion': 'Προώθηση στα social media',
      'SEO optimization': 'Βελτιστοποίηση SEO',
      'Priority support': 'Υποστήριξη προτεραιότητας',
      'Custom subdomain': 'Προσωπικό υποτομέα',
      'Dedicated website': 'Αφιερωμένη ιστοσελίδα',
      'Advanced SEO': 'Προχωρημένο SEO',
      'Premium branding': 'Premium branding',
      'VIP support': 'VIP υποστήριξη',
      'Marketing campaigns': 'Καμπάνιες marketing'
    };
    
    return features.map(feature => featureTranslations[feature] || feature);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const toggleLanguage = (language: string) => {
    const updatedLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    
    setSelectedLanguages(updatedLanguages);
    setFormData(prev => ({
      ...prev,
      languages: updatedLanguages
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[άαάἀἁἂἃἄἅἆἇὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ]/g, 'a')
      .replace(/[έεέἐἑἒἓἔἕὲέ]/g, 'e')
      .replace(/[ήηήἠἡἢἣἤἥἦἧὴή]/g, 'h')
      .replace(/[ίιίἰἱἲἳἴἵἶἷὶί]/g, 'i')
      .replace(/[όοόὀὁὂὃὄὅὸό]/g, 'o')
      .replace(/[ύυύὐὑὒὓὔὕὖὗὺύ]/g, 'u')
      .replace(/[ώωώὠὡὢὣὤὥὦὧὼώ]/g, 'w')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category_id || !formData.village_id || !formData.subscription_plan_id) {
      toast({
        title: "Σφάλμα",
        description: "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία συμπεριλαμβανομένου του πακέτου συνδρομής",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const slug = generateSlug(formData.name);
      
      const { error } = await supabase
        .from('businesses')
        .insert({
          name: formData.name,
          slug: slug,
          description: formData.description || null,
          category_id: formData.category_id,
          village_id: formData.village_id,
          address: formData.address || null,
          phone: formData.phone || null,
          email: formData.email || null,
          website: formData.website || null,
          price_range: formData.price_range || null,
          season: formData.season || null,
          booking: formData.booking || null,
          maps_url: formData.maps_url || null,
          tags: formData.tags.length > 0 ? formData.tags : null,
          features: formData.features.length > 0 ? formData.features : null,
          languages: formData.languages.length > 0 ? formData.languages : null,
          photo_urls: formData.photo_urls.length > 0 ? formData.photo_urls : null,
          subscription_plan_id: formData.subscription_plan_id,
          verified: false,
          featured: false
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Επιτυχής υποβολή!",
        description: "Η επιχείρησή σας έχει υποβληθεί για έλεγχο. Θα επικοινωνήσουμε μαζί σας σύντομα.",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        category_id: "",
        village_id: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        price_range: "",
        season: "",
        booking: "",
        maps_url: "",
        tags: [],
        features: [],
        languages: [],
        photo_urls: [],
        subscription_plan_id: ""
      });
      setSelectedLanguages([]);
      setMapCoordinates(null);

    } catch (error) {
      console.error('Error submitting business:', error);
      toast({
        title: "Σφάλμα",
        description: "Υπήρξε πρόβλημα με την υποβολή. Παρακαλώ δοκιμάστε ξανά.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonical={seoData.canonical}
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Καταχώρηση Επιχείρησης</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Συμμετάστε στον πιο αξιόπιστο οδηγό επιχειρήσεων της Σίφνου. 
            Ξεκινήστε με δωρεάν καταχώρηση και αναβαθμίστε όποτε θέλετε.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-2">Οδηγίες συμπλήρωσης:</p>
                <ul className="space-y-1 text-left">
                  <li>• Συμπληρώστε όλα τα υποχρεωτικά πεδία (*)</li>
                  <li>• Προσθέστε φωτογραφίες υψηλής ποιότητας</li>
                  <li>• Γράψτε μια περιγραφή που να προσελκύει πελάτες</li>
                  <li>• Όλες οι καταχωρήσεις ελέγχονται πριν τη δημοσίευση</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Βασικές Πληροφορίες */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Βασικές Πληροφορίες Επιχείρησης
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Όνομα Επιχείρησης *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="π.χ. Ταβέρνα Ωκεανός"
                    required 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Το όνομα της επιχείρησής σας όπως θέλετε να εμφανίζεται
          </p>
        </div>

                <div>
                  <Label htmlFor="category">Κατηγορία *</Label>
                  <Select 
                    value={formData.category_id} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε κατηγορία" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Επιλέξτε την κατηγορία που ταιριάζει καλύτερα
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Περιγραφή Επιχείρησης</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Περιγράψτε την επιχείρησή σας, τι προσφέρετε, τι σας κάνει ξεχωριστούς..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Μια ελκυστική περιγραφή που θα προσελκύσει πελάτες (προαιρετικό αλλά συνιστάται)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Τοποθεσία */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Τοποθεσία
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="village">Χωριό *</Label>
                  <Select 
                    value={formData.village_id} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, village_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε χωριό" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages?.map((village) => (
                        <SelectItem key={village.id} value={village.id}>
                          {village.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Διεύθυνση</Label>
                  <Input 
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="π.χ. Κεντρική Πλατεία, Απολλωνία"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="maps_url">Google Maps URL</Label>
                <Input 
                  id="maps_url"
                  value={formData.maps_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, maps_url: e.target.value }))}
                  placeholder="https://maps.google.com/..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Προσθέστε το link από το Google Maps για ακριβή τοποθεσία
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Στοιχεία Επικοινωνίας */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Στοιχεία Επικοινωνίας
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Τηλέφωνο</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="π.χ. 22840 31234"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="info@business.gr"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="website">Ιστοσελίδα</Label>
                <Input 
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://www.business.gr"
                />
              </div>

              <div>
                <Label htmlFor="booking">Σύνδεσμος Κρατήσεων</Label>
                <Input 
                  id="booking"
                  type="url"
                  value={formData.booking}
                  onChange={(e) => setFormData(prev => ({ ...prev, booking: e.target.value }))}
                  placeholder="https://booking.com/..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Σύνδεσμος για online κρατήσεις (Booking.com, Airbnb, κλπ.)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Λειτουργικές Πληροφορίες */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Λειτουργικές Πληροφορίες
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price_range">Εύρος Τιμών</Label>
                  <Select 
                    value={formData.price_range} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, price_range: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε εύρος τιμών" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="season">Περίοδος Λειτουργίας</Label>
                  <Select 
                    value={formData.season} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, season: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε περίοδο" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((season) => (
                        <SelectItem key={season} value={season}>
                          {season}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Γλώσσες που Μιλάτε</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {availableLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox 
                        id={language}
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={() => toggleLanguage(language)}
                      />
                      <Label htmlFor={language} className="text-sm">{language}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Χαρακτηριστικά & Ετικέτες */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Χαρακτηριστικά & Ετικέτες
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Ετικέτες</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Προσθέστε λέξεις-κλειδιά που περιγράφουν την επιχείρησή σας
                </p>
                <div className="flex gap-2 mb-3">
                  <Input 
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="π.χ. Παραδοσιακό, Θέα θάλασσα"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Προσθήκη
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label>Παροχές & Χαρακτηριστικά</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Προσθέστε τις παροχές και υπηρεσίες που προσφέρετε
                </p>
                <div className="flex gap-2 mb-3">
                  <Input 
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="π.χ. WiFi, Parking, Θέα θάλασσα"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    Προσθήκη
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="flex items-center gap-1">
                      {feature}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Πακέτα Συνδρομής */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Επιλογή Πακέτου Συνδρομής *
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {planRecommendation && (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-800 dark:text-green-200">
                      <p className="font-medium mb-2">Συνιστώμενο για την κατηγορία σας: {planRecommendation.recommended}</p>
                      <p>{planRecommendation.reason}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscriptionPlans?.map((plan) => {
                  const isRecommended = planRecommendation?.recommended === plan.name;
                  const features = getPlanFeaturesInGreek(plan.features || []);
                  const priceInEuros = plan.price / 100;
                  
                  return (
                    <div
                      key={plan.id}
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.subscription_plan_id === plan.id
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50'
                      } ${isRecommended ? 'ring-2 ring-green-500/30 border-green-500' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, subscription_plan_id: plan.id }))}
                    >
                      {isRecommended && (
                        <div className="absolute -top-2 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Συνιστάται
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                          {plan.name === 'Free' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          {plan.name === 'Premium' && <Star className="h-5 w-5 text-yellow-500" />}
                          {plan.name === 'Professional' && <Crown className="h-5 w-5 text-purple-500" />}
                          {plan.name}
                        </h3>
                        <div className="text-2xl font-bold text-primary">
                          {plan.price === 0 ? 'Δωρεάν' : `€${priceInEuros}`}
                          {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/μήνα</span>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                      </div>

                      <ul className="space-y-2">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {formData.subscription_plan_id === plan.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-2">Σημαντικές πληροφορίες για τα πακέτα:</p>
                    <ul className="space-y-1">
                      <li>• Μπορείτε να αλλάξετε πακέτο ανά πάσα στιγμή</li>
                      <li>• Η χρέωση γίνεται μηνιαίως για τα premium πακέτα</li>
                      <li>• Όλα τα πακέτα περιλαμβάνουν βασική υποστήριξη</li>
                      <li>• Τα premium πακέτα έχουν 14 ημέρες δοκιμαστική περίοδο</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Φωτογραφίες */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Φωτογραφίες
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Προσθέστε Φωτογραφίες</h3>
                <p className="text-muted-foreground mb-4">
                  Μεταφορτώστε εικόνες υψηλής ποιότητας της επιχείρησής σας
                </p>
                <Button type="button" variant="outline">
                  Επιλογή Φωτογραφιών
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Μέγιστο μέγεθος: 5MB ανά φωτογραφία. Υποστηριζόμενες μορφές: JPG, PNG, WebP
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium mb-1">Συμβουλές για καλύτερες φωτογραφίες:</p>
                    <ul className="space-y-1">
                      <li>• Χρησιμοποιήστε καλό φωτισμό</li>
                      <li>• Δείξτε το εσωτερικό και εξωτερικό χώρο</li>
                      <li>• Συμπεριλάβετε φωτογραφίες προϊόντων/φαγητού</li>
                      <li>• Αποφύγετε θολές ή σκοτεινές εικόνες</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Υποβολή */}
          <Card>
            <CardContent className="pt-6">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-2">Πριν την υποβολή:</p>
                    <ul className="space-y-1">
                      <li>• Όλες οι καταχωρήσεις ελέγχονται από την ομάδα μας</li>
                      <li>• Θα επικοινωνήσουμε μαζί σας εντός 2-3 εργάσιμων ημερών</li>
                      <li>• Η δωρεάν καταχώρηση περιλαμβάνει βασικές πληροφορίες</li>
                      <li>• Μπορείτε να αναβαθμίσετε σε premium πακέτο αργότερα</li>
                    </ul>
                  </div>
        </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Υποβολή..." : "Υποβολή για Έλεγχο"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default SubmitBusiness;