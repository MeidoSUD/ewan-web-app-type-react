import React from 'react';
import { Hexagon } from 'lucide-react';

export const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* 
        TODO: Replace the src below with your actual logo path. 
        Example: src="/logo.png" if you place logo.png in the public folder.
        For now, using a placeholder text styling that looks like a logo if image fails.
      */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <img src="/assets/logo.png" alt="Ewan" className="absolute inset-0 h-full w-full object-contain" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-text tracking-tight">Ewan</h1>
    </div >
  );
};