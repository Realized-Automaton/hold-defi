
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { BookOpen, Gamepad2, Trophy, BarChart3, Settings } from 'lucide-react';

// Define navigation items - SWAPPED Quests and Challenges labels/icons
const navItems = [
    { href: '/', label: 'Challenges', icon: <Gamepad2 />, tooltip: 'Challenges' }, // Was Quests (BookOpen)
    { href: '/challenges', label: 'Quests', icon: <BookOpen />, tooltip: 'Quests' }, // Was Challenges (Gamepad2)
    { href: '/badges', label: 'Badges', icon: <Trophy />, tooltip: 'Badges' },
    { href: '/leaderboard', label: 'Leaderboard', icon: <BarChart3 />, tooltip: 'Leaderboard' },
    { href: '/settings', label: 'Settings', icon: <Settings />, tooltip: 'Settings' },
];

export function SidebarNavigation() {
    const pathname = usePathname();

    return (
        <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref>
                        <SidebarMenuButton
                            tooltip={item.tooltip}
                            isActive={pathname === item.href}
                        >
                            {item.icon} {item.label}
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}

