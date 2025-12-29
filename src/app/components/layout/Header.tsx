import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../../context/CartContext";
import { cn } from "@/lib/utils";
import { Search, User, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "figma:asset/c68abe051f9bb3901828d7472af82d8f5b8062f7.png";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, openCart } = useCart();
  const [location, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] md:h-[120px] z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-light/5 flex flex-col items-center justify-between py-3 md:justify-center px-4 md:px-16 transition-all duration-300">
      {/* Top bar with Search/My/Cart - Refined Mobile Positioning */}
      <div className="w-full flex justify-between items-center md:absolute md:right-16 md:top-1/2 md:-translate-y-1/2 md:w-auto">
        {/* Mobile Logo Placeholder to keep spacing / Or just use the space */}
        <div className="md:hidden w-24" /> 

        <div className="flex items-center gap-5 md:gap-8 text-brand-light/80">
          <button 
            className="cursor-pointer hover:text-brand-cyan transition-all duration-300 bg-transparent border-none p-0 outline-none"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={16} md:size={18} strokeWidth={1} />
          </button>
          <Link href="/orders">
            <span className={cn(
              "cursor-pointer hover:text-brand-cyan transition-all duration-300 block",
              location === "/orders" && "text-brand-cyan"
            )}>
              <User size={16} md:size={18} strokeWidth={1} />
            </span>
          </Link>
          <div 
            className="cursor-pointer hover:text-brand-cyan transition-all duration-300 flex items-center relative"
            onClick={openCart}
          >
            <ShoppingBag size={16} md:size={18} strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[7px] bg-brand-cyan text-brand-black rounded-full min-w-[12px] h-[12px] flex items-center justify-center font-bold px-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center Logo - Absolutely positioned on mobile to prevent overlap */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 md:relative md:left-0 md:top-0 md:translate-y-0 z-10 md:mb-1">
        <Link href="/">
          <img src={logoImg} alt="DEW&ODE" className="h-5 md:h-10 w-auto object-contain transition-transform duration-500" />
        </Link>
      </div>

      {/* Structure Diagram Navigation - Hidden on mobile or simplified */}
      <div className="hidden md:flex flex-col items-center w-full mt-2">
        <div className="flex items-center w-full justify-center relative">
          <div className="flex-1 flex justify-end items-center">
            <Link 
              href="/shop" 
              className={cn(
                "text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-light hover:text-brand-cyan transition-all duration-500 pr-18 md:pr-36",
                location === "/shop" ? "text-brand-cyan" : "text-brand-light/50"
              )}
            >
              Shop
            </Link>
          </div>

          <div className="flex-1 flex justify-start items-center">
            <Link 
              href="/collection" 
              className={cn(
                "text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-light hover:text-brand-cyan transition-all duration-500 pl-18 md:pl-36",
                location === "/collection" ? "text-brand-cyan" : "text-brand-light/50"
              )}
            >
              Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 z-50 bg-brand-black flex items-center justify-center px-8"
          >
            <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-brand-light/20 py-4 text-2xl font-light tracking-widest text-brand-light outline-none focus:border-brand-cyan transition-colors uppercase placeholder:text-brand-light/20"
              />
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-light/60 hover:text-brand-cyan transition-colors"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}