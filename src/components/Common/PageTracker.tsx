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
            // Record the view
            await recordPageView(pathname);
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
