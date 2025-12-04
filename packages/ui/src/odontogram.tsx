"use client";

import React from "react";

export type ToothStatus = "healthy" | "decay" | "filled" | "missing" | "crown" | "root_canal";

export interface ToothProps {
  id: number;
  status: ToothStatus;
  onClick?: (id: number) => void;
}

const statusColors: Record<ToothStatus, string> = {
  healthy: "fill-white stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600",
  decay: "fill-red-400 stroke-red-600",
  filled: "fill-zinc-400 stroke-zinc-600",
  missing: "opacity-0",
  crown: "fill-yellow-400 stroke-yellow-600",
  root_canal: "fill-purple-400 stroke-purple-600",
};

const Tooth = ({ id, status, onClick }: ToothProps) => {
  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer group"
      onClick={() => onClick?.(id)}
    >
      <span className="text-xs text-zinc-500 group-hover:text-blue-500 font-medium">{id}</span>
      <svg
        width="40"
        height="50"
        viewBox="0 0 40 50"
        className={`transition-colors duration-200 ${statusColors[status]}`}
      >
        {/* Simplified Molar Shape */}
        <path
          d="M5,15 Q5,5 20,5 Q35,5 35,15 L35,35 Q35,45 20,45 Q5,45 5,35 Z"
          strokeWidth="2"
        />
        {/* Surface Lines for detail */}
        <path d="M10,15 L30,15" strokeWidth="1" className="stroke-current opacity-50" />
        <path d="M20,15 L20,35" strokeWidth="1" className="stroke-current opacity-50" />
      </svg>
    </div>
  );
};

export interface OdontogramProps {
  teethStatus?: Record<number, ToothStatus>;
  onToothClick?: (id: number) => void;
}

export function Odontogram({ teethStatus = {}, onToothClick }: OdontogramProps) {
  const renderArch = (range: number[], reverse = false) => {
    const teeth = reverse ? [...range].reverse() : range;
    return (
      <div className="flex gap-2 justify-center">
        {teeth.map((id) => (
          <Tooth
            key={id}
            id={id}
            status={teethStatus[id] || "healthy"}
            onClick={onToothClick}
          />
        ))}
      </div>
    );
  };

  // Universal Numbering System ranges
  const upperRight = [1, 2, 3, 4, 5, 6, 7, 8];
  const upperLeft = [9, 10, 11, 12, 13, 14, 15, 16];
  const lowerLeft = [17, 18, 19, 20, 21, 22, 23, 24];
  const lowerRight = [25, 26, 27, 28, 29, 30, 31, 32];

  return (
    <div className="flex flex-col gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Upper Arch</h3>
        <div className="flex justify-center gap-8 border-b border-zinc-100 pb-8 dark:border-zinc-800">
          {renderArch(upperRight)}
          {renderArch(upperLeft)}
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center gap-8 border-b border-zinc-100 pb-8 dark:border-zinc-800">
          {renderArch(lowerRight, true)}
          {renderArch(lowerLeft, true)}
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Lower Arch</h3>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        {(Object.entries(statusColors) as [ToothStatus, string][]).map(([status, colorClass]) => (
           status !== 'missing' && (
            <div key={status} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border ${(colorClass || "").split(' ')[0]?.replace('fill-', 'bg-').replace('stroke-', 'border-') ?? 'bg-gray-200'}`}></div>
                <span className="text-xs capitalize text-zinc-600 dark:text-zinc-400">{status.replace('_', ' ')}</span>
            </div>
           )
        ))}
      </div>
    </div>
  );
}
