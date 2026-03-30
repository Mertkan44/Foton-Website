export default function Loading() {
    return (
        <div className="min-h-screen bg-[#fdfbf7] animate-pulse">

            {/* Hero skeleton */}
            <div className="relative h-[85vh] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 skeleton-shine" />
                <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="w-full lg:w-1/2 space-y-6 pt-20">
                        <div className="h-4 w-32 bg-slate-200 rounded-full" />
                        <div className="space-y-3">
                            <div className="h-14 w-4/5 bg-slate-200 rounded-2xl" />
                            <div className="h-14 w-3/5 bg-slate-200 rounded-2xl" />
                            <div className="h-14 w-2/3 bg-slate-200 rounded-2xl" />
                        </div>
                        <div className="h-5 w-3/4 bg-slate-200 rounded-full" />
                        <div className="h-5 w-1/2 bg-slate-200 rounded-full" />
                        <div className="h-14 w-44 bg-slate-300 rounded-2xl mt-4" />
                    </div>
                </div>
            </div>

            {/* Cards skeleton */}
            <div className="bg-[#fdfbf7] py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-[320px] md:h-[380px] rounded-[30px] md:rounded-[40px] bg-slate-200 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 skeleton-shine" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="bg-white py-20 border-y border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-12">
                        <div className="space-y-4 max-w-lg">
                            <div className="h-12 w-3/4 bg-slate-200 rounded-2xl" />
                            <div className="h-12 w-1/2 bg-slate-200 rounded-2xl" />
                            <div className="h-5 w-full bg-slate-100 rounded-full mt-6" />
                            <div className="h-5 w-4/5 bg-slate-100 rounded-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-10 lg:gap-16">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="border-l-2 border-slate-200 pl-5 space-y-2">
                                    <div className="h-12 w-24 bg-slate-200 rounded-xl" />
                                    <div className="h-3 w-20 bg-slate-100 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .skeleton-shine {
                    background-size: 200% 100%;
                    animation: skeleton-shimmer 1.6s infinite linear;
                }
                @keyframes skeleton-shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position:  200% 0; }
                }
            `}</style>
        </div>
    );
}
