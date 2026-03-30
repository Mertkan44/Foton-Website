"use client";
import React, { useState, useEffect, useRef } from "react";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    threshold?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, threshold = 0.05 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            {children}
        </div>
    );
};

export default FadeIn;
