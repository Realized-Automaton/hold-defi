
'use client'; // Add 'use client' directive

import * as React from 'react'; // Import React
import Image from 'next/image'; // Import next/image
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { SidebarNavigation } from '@/components/sidebar-navigation';
import { WhackAScammerGame } from '@/components/whack-a-scammer-game';
import { CryptoQuiz } from '@/components/crypto-quiz';
import { ConnectWalletButton } from '@/components/connect-wallet-button'; // Import Connect Wallet button
import { Lightbulb, Gamepad2, Skull } from 'lucide-react'; // Import icons for header, added Skull
import { ScamAlertModal } from '@/components/scam-alert-modal'; // Import the new modal component
import { useToast } from '@/hooks/use-toast'; // Import useToast
import { useUser } from '@/context/user-context'; // Import useUser
import { TelegramScamChatChallenge } from '@/components/telegram-scam-chat-challenge'; // Import the new challenge component
import { DeFiDegenGame } from '@/components/defi-degen-game'; // Import the new DeFi Degen game component

export default function ChallengesPage() {
  const [isScamModalOpen, setIsScamModalOpen] = React.useState(false);
  const [scamModalShown, setScamModalShown] = React.useState(false); // Track if shown once per session/mount
  const { toast } = useToast();
  const { addXp } = useUser();
  const SCAM_SPOT_XP_REWARD = 5; // XP for spotting the scam - Updated to 5

  React.useEffect(() => {
    // Only set the timer if the modal hasn't been shown yet in this session
    if (!scamModalShown) {
      const timer = setTimeout(() => {
        setIsScamModalOpen(true);
        setScamModalShown(true); // Mark as shown
      }, 3000); // Changed delay from 8000 to 3000 (3 seconds)

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [scamModalShown]); // Dependency array ensures this runs only when scamModalShown changes

  const handleConfirmScam = () => {
     // Award XP only once for spotting the scam
     // In a real app, you'd track completion state more robustly
    if (scamModalShown) { // Check if it was shown (implies first interaction)
        addXp(SCAM_SPOT_XP_REWARD);
         setTimeout(() => { // Defer toast
            toast({
              title: "Scam Avoided! 🎉",
              description: `Great job! You spotted your first scam and earned ${SCAM_SPOT_XP_REWARD} XP. Always be vigilant!`, // Updated description
              variant: "success", // Use new success variant
              duration: 5000,
            });
        }, 0);
        // Potentially disable re-rewarding here if needed
    }
    setIsScamModalOpen(false); // Close modal
  };

  const handleConfirmSign = () => {
     setTimeout(() => { // Defer toast
        toast({
          title: <>Uh Oh! You&apos;re Rekt! <Skull className="inline-block h-4 w-4 ml-1" /></>, // Updated title with icon
          description: "Signing unknown transactions can be risky. Luckily, this was just a simulation! Always verify DApps and transaction details.", // Updated description
          variant: "destructive", // Use destructive (red) style for warning/failure
          duration: 7000,
        });
    }, 0);
    setIsScamModalOpen(false); // Close modal
  };


  return (
    <div className="flex min-h-screen w-full">
       {/* Replicated Sidebar structure for consistency - Ideally abstract this layout */}
       <Sidebar>
        <SidebarHeader className="p-4 flex justify-center w-full"> {/* Ensure flex and justify-center */}
          {/* Replace text with larger logo */}
          <Image
              src="https://i.ibb.co/bMgZz4h4/a-logo-for-a-crypto-learning-and-gaming-applicatio.png" // Updated logo URL
              alt="ABC De-fi Logo" // Updated alt text
              width={120} // Increased width
              height={30} // Increased height proportionally or adjust as needed
              className="h-auto mx-auto" // Maintain aspect ratio and add mx-auto
              unoptimized // If using external hosting like ibb without pro plan
          />
        </SidebarHeader>
        <SidebarContent className="p-4 flex-1">
           <SidebarNavigation /> {/* Use the navigation component */}
        </SidebarContent>
         <SidebarFooter className="p-4 flex items-center justify-between">
             <ThemeToggleButton />
         </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
         <header className="sticky top-0 z-10 flex h-[57px] items-center gap-2 border-b bg-background px-4"> {/* Reduced default gap */}
             <SidebarTrigger className="md:hidden" />
             {/* Replicated Header Content from page.tsx */}
             <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2">
                 <Lightbulb className="h-5 w-5 text-primary hidden sm:inline-block" /> {/* Hide icon on smallest screens */}
                 {/* Adjusted text size for responsiveness */}
                <div className="hidden md:block text-base sm:text-lg md:text-xl font-semibold text-foreground text-center font-sans flex-shrink min-w-0"> {/* Hide on mobile, show on md+ */}
                  Increase your crypto IQ with challenges and quests
                </div>
                 <Gamepad2 className="h-5 w-5 text-primary hidden sm:inline-block" /> {/* Hide icon on smallest screens */}
             </div>
             <ConnectWalletButton /> {/* Add Connect Wallet button */}
             {/* Keep mobile theme toggle */}
             <div className="ml-auto md:hidden">
                 <ThemeToggleButton />
             </div>
         </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 md:text-base"> {/* Added md:text-base */}
           {/* Adjust grid layout */}
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2"> {/* Changed grid cols */}

            {/* Whack-a-Scammer Game Card */}
             <WhackAScammerGame className="lg:col-span-1" /> {/* Spans 1 column */}


            {/* Crypto Quiz Card */}
             <CryptoQuiz className="lg:col-span-1" /> {/* Spans 1 column */}

            {/* Telegram Scam Chat Challenge Card */}
             <TelegramScamChatChallenge className="lg:col-span-2" questId={7} xpReward={100} /> {/* Spans full width */}

             {/* DeFi Degen Game Card */}
             <DeFiDegenGame className="lg:col-span-2" questId={8} xpReward={250} /> {/* Spans full width */}


            {/* Add placeholder for potential future challenges if needed */}
            {/*
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>More Challenges Coming Soon!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Keep checking back for new ways to test your skills.</p>
              </CardContent>
            </Card>
            */}

          </div>
        </main>
      </SidebarInset>

       {/* Render the Scam Alert Modal */}
       <ScamAlertModal
         open={isScamModalOpen}
         onOpenChange={setIsScamModalOpen}
         onConfirmScam={handleConfirmScam}
         onConfirmSign={handleConfirmSign}
       />
    </div>
  );
}

