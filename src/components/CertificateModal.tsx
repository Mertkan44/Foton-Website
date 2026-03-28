'use client';

import { useState, useEffect } from 'react';

interface CertificateModalProps {
    pdfUrl: string;
    title: string;
    accent: string;
    onClose: () => void;
}

export default function CertificateModal({ pdfUrl, title, accent, onClose }: CertificateModalProps) {
    const [loaded, setLoaded] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Prevent body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const iframeSrc = pdfUrl;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full flex flex-col overflow-hidden"
                style={{ maxWidth: 800, maxHeight: '90vh', height: '90vh' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-1.5 h-6 rounded-full"
                            style={{ background: accent }}
                        />
                        <h3 className="font-bold text-[#1e293b] text-base">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* PDF via iframe — toolbar hidden, right-click disabled */}
                <div
                    className="relative flex-1 bg-slate-100 overflow-hidden"
                    onContextMenu={e => e.preventDefault()}
                >
                    {/* Loading spinner */}
                    {!loaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                            <div
                                className="w-10 h-10 rounded-full border-4 border-slate-200 animate-spin"
                                style={{ borderTopColor: accent }}
                            />
                        </div>
                    )}
                    <iframe
                        src={iframeSrc}
                        className="w-full h-full border-0"
                        onLoad={() => setLoaded(true)}
                        title={title}
                    />
                </div>
            </div>
        </div>
    );
}
