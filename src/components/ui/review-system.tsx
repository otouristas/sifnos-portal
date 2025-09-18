import { useState } from "react";
import { Star, ThumbsUp, Flag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified: boolean;
  businessResponse?: {
    content: string;
    date: string;
    responderName: string;
  };
}

interface ReviewSystemProps {
  businessId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  className?: string;
}

interface NewReview {
  rating: number;
  title: string;
  content: string;
  userName: string;
}

const StarRating = ({ 
  rating, 
  size = "sm", 
  interactive = false,
  onChange 
}: { 
  rating: number; 
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            interactive ? 'cursor-pointer' : ''
          } ${
            star <= (hoverRating || rating) 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300'
          }`}
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  
  return (
    <Card className="hover-lift">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={review.userAvatar} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{review.userName}</span>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating} />
                <span className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-muted-foreground leading-relaxed">
              {review.content}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsHelpful(!isHelpful)}
              className={isHelpful ? 'text-primary' : ''}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Helpful ({review.helpful + (isHelpful ? 1 : 0)})
            </Button>
          </div>
          
          {review.businessResponse && (
            <>
              <Separator />
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">
                    Business Response
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {review.businessResponse.responderName} • {
                      new Date(review.businessResponse.date).toLocaleDateString()
                    }
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {review.businessResponse.content}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AddReviewDialog = ({ 
  onAddReview 
}: { 
  onAddReview: (review: NewReview) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newReview, setNewReview] = useState<NewReview>({
    rating: 0,
    title: "",
    content: "",
    userName: ""
  });

  const handleSubmit = () => {
    if (newReview.rating > 0 && newReview.title && newReview.content && newReview.userName) {
      onAddReview(newReview);
      setNewReview({ rating: 0, title: "", content: "", userName: "" });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-hero hover:bg-primary-dark">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Your Rating</Label>
            <StarRating 
              rating={newReview.rating} 
              size="lg"
              interactive={true}
              onChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={newReview.userName}
              onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={newReview.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Your Review</Label>
            <Textarea
              id="content"
              value={newReview.content}
              onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your experience with this business..."
              rows={4}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!newReview.rating || !newReview.title || !newReview.content || !newReview.userName}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ReviewSystem = ({ 
  businessId, 
  reviews, 
  averageRating, 
  totalReviews,
  onAddReview,
  className 
}: ReviewSystemProps) => {
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  const handleAddReview = (reviewData: NewReview) => {
    const review = {
      ...reviewData,
      userId: 'temp-user-id',
      verified: false,
      businessResponse: undefined
    };
    onAddReview?.(review);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Reviews & Ratings</h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                  <StarRating rating={Math.round(averageRating)} size="md" />
                </div>
                <span className="text-muted-foreground">
                  Based on {totalReviews} reviews
                </span>
              </div>
            </div>
            {onAddReview && (
              <AddReviewDialog onAddReview={handleAddReview} />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm w-8">{rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        
        {reviews.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to share your experience!
              </p>
              {onAddReview && (
                <AddReviewDialog onAddReview={handleAddReview} />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { ReviewSystem, StarRating, type Review };
