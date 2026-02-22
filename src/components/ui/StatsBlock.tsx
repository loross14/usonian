interface Stat {
  label: string;
  value: string | number;
}

interface StatsBlockProps {
  stats: Stat[];
  className?: string;
}

export function StatsBlock({ stats, className = "" }: StatsBlockProps) {
  return (
    <div className={`stats-grid ${className}`}>
      {stats.map((stat, idx) => (
        <div key={idx} className="stats-block">
          <div className="stats-block-label">{stat.label}</div>
          <div className="stats-block-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
