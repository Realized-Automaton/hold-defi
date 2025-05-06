
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/user-context'; // Import useUser hook
import { cn } from '@/lib/utils';
import { Trophy, UserCircle } from 'lucide-react'; // Import Trophy for badges section and UserCircle for fallback
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import Avatar components


// Mock Data for badges - this should eventually come from user state/backend
const unlockedBadges = ['Intro Badge', 'Swap Master'];


// Remove props interface as data comes from context now
// interface UserProfileCardProps {
//   userProgress: { xp: number; level: number; nextLevelXp: number };
//   unlockedBadges: string[];
//   className?: string;
// }

// Remove props from function signature
export function UserProfileCard({ className }: { className?: string }) {
  // Get user data directly from context
  const { username, xp, level, nextLevelXp, profilePicture } = useUser();

  // Calculate progress percentage, ensuring nextLevelXp is not zero
  const progressPercentage = nextLevelXp > 0 ? (xp / nextLevelXp) * 100 : 0;

  // Function to render username with colored first letters
  const renderUsername = (name: string) => {
    if (!name || name.length === 0) {
      return "User"; // Default or placeholder if no name
    }

    const firstLetter = name.length > 0 ? <span style={{ color: '#da3322' }}>{name[0]}</span> : '';
    const secondLetter = name.length > 1 ? <span style={{ color: '#fbcb00' }}>{name[1]}</span> : '';
    const thirdLetter = name.length > 2 ? <span style={{ color: '#60c2a2' }}>{name[2]}</span> : '';
    const fourthLetter = name.length > 3 ? <span style={{ color: '#376e99' }}>{name[3]}</span> : ''; // Add fourth letter with new color
    const restOfName = name.substring(4); // Adjust substring index

    return (
        <>
            {firstLetter}
            {secondLetter}
            {thirdLetter}
            {fourthLetter} {/* Add the fourth letter */}
            {restOfName}
        </>
    );
  };


  return (
    // Ensure the card itself is a flex column container to allow content to grow
    <Card className={cn("flex flex-col h-full", className)}> {/* Added h-full */}
      <CardHeader className="flex flex-row items-center gap-4 pb-2"> {/* Adjust header layout */}
          <Avatar className="h-12 w-12">
              <AvatarImage src={profilePicture ?? undefined} alt={username} className="object-cover" />
              <AvatarFallback>
                 {username ? username.charAt(0).toUpperCase() : <UserCircle size={24} />}
              </AvatarFallback>
          </Avatar>
          <div className="flex-1">
             {/* Use the renderUsername function */}
            <CardTitle>{renderUsername(username)}&apos;s Progress</CardTitle>
            <CardDescription>Level {level}</CardDescription>
          </div>
      </CardHeader>
      {/* Make CardContent grow and arrange its children vertically, use justify-between for spacing */}
      {/* Added flex-1 and flex flex-col to allow content to grow */}
      <CardContent className="flex flex-1 flex-col justify-between space-y-3 pt-4"> {/* Adjusted spacing */}
        {/* XP Progress Section */}
        <div>
            <div className="flex justify-between items-center text-sm mb-1">
              <span>XP: {Math.floor(xp)} / {Math.floor(nextLevelXp)}</span>
              <span className="text-xs text-muted-foreground">To Next Level</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Badges Section */}
        <div>
          <h4 className="font-medium mb-2 text-sm flex items-center gap-1"><Trophy size={16}/> Badges Unlocked:</h4>
          <div className="flex flex-wrap gap-1">
            {unlockedBadges.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs">{badge}</Badge>
            ))}
            {unlockedBadges.length === 0 && (
              <p className="text-xs text-muted-foreground">No badges unlocked yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

