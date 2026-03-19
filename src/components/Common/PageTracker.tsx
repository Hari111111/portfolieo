"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { recordPageView, getPageViewCount } from '@/app/api/users/view.services';
import { Icon } from '@iconify/react';

const PageTracker = ({ showCount = true }) => {
    const pathname = usePathname();
    const [viewCount, setViewCount] = useState<number | null>(null);

    useEffect(() => {
        const track = async () => {
            if (typeof window === 'undefined') return;

            // Simple device/browser detection
            const ua = window.navigator.userAgent;
            const width = window.innerWidth;

            let browser = "Other";
            if (ua.includes("Chrome")) browser = "Chrome";
            else if (ua.includes("Firefox")) browser = "Firefox";
            else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
            else if (ua.includes("Edge")) browser = "Edge";

            let os = "Other";
            if (ua.includes("Win")) os = "Windows";
            else if (ua.includes("Mac")) os = "MacOS";
            else if (ua.includes("Android")) os = "Android";
            else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
            else if (ua.includes("Linux")) os = "Linux";

            let device = "Desktop";
            if (width < 768) device = "Mobile";
            else if (width < 1024) device = "Tablet";

            // Record the view with stats
            await recordPageView(pathname, { browser, os, device });
            // Get the updated count
            const count = await getPageViewCount(pathname);
            setViewCount(count);
        };

        track();
    }, [pathname]);

    if (!showCount || viewCount === null) return null;

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-white/20 shadow-sm text-slate-500 text-xs font-bold transition-all hover:bg-white hover:text-primary group">
            <Icon icon="solar:eye-bold-duotone" className="text-lg group-hover:scale-110 transition-transform" />
            <span>{viewCount.toLocaleString()} <span className="text-[10px] uppercase tracking-wider opacity-60">Views</span></span>
        </div>
    );
};

export default PageTracker;
