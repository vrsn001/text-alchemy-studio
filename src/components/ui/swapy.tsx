"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { createSwapy, Swapy, SlotItemMapArray } from "swapy";
import { cn } from "@/lib/utils";

interface SwapyContextType {
  swapy: Swapy | null;
}

const SwapyContext = createContext<SwapyContextType>({ swapy: null });

interface SwapyLayoutProps {
  children: React.ReactNode;
  className?: string;
  onSwap?: (event: { newSlotItemMap: { asArray: SlotItemMapArray } }) => void;
}

export function SwapyLayout({ children, className, onSwap }: SwapyLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<Swapy | null>(null);

  useEffect(() => {
    if (containerRef.current && !swapyRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        animation: "dynamic",
      });

      if (onSwap) {
        swapyRef.current.onSwap((event) => {
          onSwap({ newSlotItemMap: { asArray: event.newSlotItemMap.asArray } });
        });
      }
    }

    return () => {
      swapyRef.current?.destroy();
      swapyRef.current = null;
    };
  }, [onSwap]);

  return (
    <SwapyContext.Provider value={{ swapy: swapyRef.current }}>
      <div ref={containerRef} className={cn("grid gap-4", className)}>
        {children}
      </div>
    </SwapyContext.Provider>
  );
}

interface SwapySlotProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SwapySlot({ id, children, className }: SwapySlotProps) {
  return (
    <div data-swapy-slot={id} className={cn("h-full", className)}>
      {children}
    </div>
  );
}

interface SwapyItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SwapyItem({ id, children, className }: SwapyItemProps) {
  return (
    <div data-swapy-item={id} className={cn("h-full", className)}>
      {children}
    </div>
  );
}

interface DragHandleProps {
  className?: string;
}

export function DragHandle({ className }: DragHandleProps) {
  return (
    <div
      data-swapy-handle
      className={cn(
        "absolute top-2 right-2 w-6 h-6 cursor-grab active:cursor-grabbing flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors z-10",
        className
      )}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="1.5" fill="currentColor" />
        <circle cx="9" cy="3" r="1.5" fill="currentColor" />
        <circle cx="3" cy="9" r="1.5" fill="currentColor" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
