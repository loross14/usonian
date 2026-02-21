interface PrairieLinesProps {
  className?: string;
}

export function PrairieLines({ className = "" }: PrairieLinesProps) {
  return (
    <div className={`prairie-lines ${className}`}>
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </div>
  );
}
