"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Package, ArrowLeft, Search, ShieldAlert, Compass } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingBoxVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseGlowVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.15, 0.25, 0.15],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20 px-4 py-12">
      {/* Decorative ambient background glows */}
      <motion.div
        variants={pulseGlowVariants}
        animate="animate"
        className="absolute -top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        variants={pulseGlowVariants}
        animate="animate"
        className="absolute -bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center"
      >
        {/* Animated illustration of lost box / magnifying glass */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 w-64 h-64 flex items-center justify-center"
        >
          {/* Decorative rotating compass ring in background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full scale-105"
          />

          <motion.div
            variants={floatingBoxVariants}
            animate="animate"
            className="relative z-10"
          >
            {/* Beautiful Custom SVG representing NeoMarket 404 (Lost package/compass) */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 240 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary drop-shadow-[0_15px_30px_rgba(62,95,71,0.2)]"
            >
              {/* Ground shadow */}
              <ellipse cx="120" cy="210" rx="60" ry="10" fill="currentColor" fillOpacity="0.08" />
              
              {/* Outer package container / dashed frame */}
              <rect x="30" y="30" width="180" height="180" rx="20" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.3" />
              
              {/* 3D Box Open Shape */}
              {/* Box Back */}
              <path d="M70 120 L120 95 L170 120 L120 145 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Box Left Side */}
              <path d="M70 120 L70 170 L120 195 L120 145 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Box Right Side */}
              <path d="M120 145 L120 195 L170 170 L170 120 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Flaps */}
              <path d="M70 120 L40 100 L90 85 L120 95 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M170 120 L200 100 L150 85 L120 95 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Floating question mark / exclamation in box */}
              <motion.g
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Neon 404 floating above box */}
                <text x="120" y="70" textAnchor="middle" fill="currentColor" className="font-extrabold text-[40px] tracking-widest font-mono select-none">
                  404
                </text>
              </motion.g>
            </svg>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 font-heading"
        >
          Lost in the Marketplace?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed"
        >
          The page you are looking for doesn&apos;t exist or has been moved to a new destination. Let&apos;s get you back on track!
        </motion.p>

        {/* Search Bar container */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md mx-auto mb-10"
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products, categories..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-12 pl-4 pr-12 rounded-full border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/95 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </motion.div>

        {/* Buttons / Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full sm:w-auto rounded-full bg-[#3E5F47] hover:bg-[#2F4A37] text-white transition-all px-8 h-12 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <Home className="h-5 w-5" />
              <span>Go Back Home</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-full border-border hover:bg-muted/50 transition-all px-8 h-12 shadow-sm active:scale-[0.98]"
          >
            <Link href="/products" className="inline-flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              <span>Browse Products</span>
            </Link>
          </Button>
        </motion.div>

        {/* Helpful links mapping */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-border w-full max-w-md flex justify-around text-sm text-muted-foreground"
        >
          <Link href="/categories" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Compass className="h-4 w-4" />
            <span>Categories</span>
          </Link>
          <span className="text-border">|</span>
          <Link href="/signIn" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
          <span className="text-border">|</span>
          <button
            onClick={() => router.back()}
            className="hover:text-primary transition-colors flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
