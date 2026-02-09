import React from "react";

interface ToggleButtonProps {
  value: boolean;
  onToggle: () => void;
  onLabel: React.ReactNode;
  offLabel: React.ReactNode;
  className?: string;
};

export const ToggleButton = ({
  value,
  onToggle,
  onLabel,
  offLabel,
  className = "toggle-btn"
}: ToggleButtonProps) => {

  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={onToggle}
      className={className}
    >
      {value ? onLabel : offLabel}
    </button>
  );
};

