
import Image from 'next/image'; // Import next/image
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Gamepad2, Check, Layers, ShieldCheck, Settings, BarChart3, Target, ScrollText, Lightbulb, AlertTriangle } from 'lucide-react'; // Added Lightbulb, AlertTriangle
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Leaderboard } from '@/components/leaderboard';
import { FaucetCard } from '@/components/faucet-card';
import { SwapCard } from '@/components/swap-card';
import { RugPullCard } from '@/components/rug-pull-card';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { SidebarNavigation } from '@/components/sidebar-navigation'; // Import the navigation component
import { UserProfileCard } from '@/components/user-profile-card'; // Import the new component
import { CryptoInfographicCard } from '@/components/crypto-infographic-card'; // Import the new infographic card
import { LpCard } from '@/components/lp-card'; // Import the new LP card
import { ConnectWalletButton } from '@/components/connect-wallet-button'; // Import the Connect Wallet button


// Remove useUser import if not directly needed here, UserProfileCard handles it
// import { useUser } from '@/context/user-context';

export default function Home() {
  // Mock data - replace with actual data fetching
  // Keep unlockedBadges mock for now, or move to context later
  const unlockedBadges = ['Intro Badge', 'Swap Master'];

  // Quest data remains mocked for now
  // TODO: Manage quest completion state properly (e.g., in context or backend)
  const quests = [
    { id: 1, title: "Mint Your First $CLASS Token", description: "Learn the basics of minting.", icon: <Gamepad2 />, completed: true, xp: 50 },
    { id: 2, title: "Swap $CLASS for $XP", description: "Understand token swapping.", icon: <BookOpen />, completed: false, xp: 75 },
    { id: 3, title: "Provide Liquidity", description: "Create your first LP.", icon: <Layers />, completed: false, xp: 100 }, // Updated icon
    { id: 4, title: "Use the Faucet", description: "Get some free tokens.", icon: <ShieldCheck />, completed: false, xp: 50 },
    { id: 6, title: "Spot the Rug Pull", description: "Learn to identify risky projects.", icon: <Target />, completed: false, xp: 150 },
    { id: 7, title: "Survive Telegram Support", description: "Identify a common support scam.", icon: <AlertTriangle />, completed: false, xp: 100 }, // New Quest
  ];

  const currentQuest = quests.find(q => !q.completed) ?? quests[quests.length - 1];

  return (
    <div className="flex min-h-screen w-full">
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
        <SidebarContent className="p-4 flex-1"> {/* Add flex-1 here */}
          <SidebarNavigation /> {/* Use the navigation component */}
        </SidebarContent>
         <SidebarFooter className="p-4 flex items-center justify-between"> {/* Add SidebarFooter */}
             <ThemeToggleButton />
         </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
         <header className="sticky top-0 z-10 flex h-[57px] items-center gap-2 border-b bg-background px-4"> {/* Reduced default gap */}
             <SidebarTrigger className="md:hidden" />
              {/* Updated Header Content */}
             {/* Reduced gap for mobile, adjusted icon visibility */}
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
           {/* Remove the separate mobile description */}
           {/* Use h-full on all direct children Card components */}
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {/* User Profile Card */}
             <UserProfileCard className="col-span-1 h-full" />
             {/* DeFi Basics Infographic Card */}
             <CryptoInfographicCard className="col-span-1 h-full" />
             {/* Leaderboard Card */}
             <Leaderboard className="col-span-1 h-full" /> {/* Use h-full */}

             {/* Faucet Card */}
             <FaucetCard className="col-span-1 h-full" questId={4} xpReward={50}/> {/* Use h-full */}
             {/* Swap Card */}
             <SwapCard className="col-span-1 h-full" questId={2} xpReward={75}/> {/* Use h-full */}
             {/* LP Card */}
             <LpCard className="col-span-1 h-full" questId={3} xpReward={100} /> {/* Use h-full */}

             {/* Rug Pull Card - Spans full width on smaller screens, 3 cols on large */}
             <RugPullCard className="md:col-span-2 lg:col-span-3 h-full" questId={6} xpReward={150} />

             {/* Completed Quests List */}
             <Card className="md:col-span-2 lg:col-span-3 h-full"> {/* Span all cols */}
                <CardHeader>
                    <CardTitle>Completed Quests</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                    {quests.filter(q => q.completed).map(quest => (
                        <li key={quest.id} className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className='flex items-center gap-2'>{quest.icon} {quest.title}</span>
                        <Check className="text-accent" size={16}/>
                        </li>
                    ))}
                    {quests.filter(q => q.completed).length === 0 && (
                        <p className="text-sm text-muted-foreground">No quests completed yet.</p>
                    )}
                    </ul>
                </CardContent>
             </Card>
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}

