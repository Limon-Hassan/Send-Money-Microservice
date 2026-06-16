import { statsData } from '@/lib/data';
import StatCard from './StatCard';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 ">
      {statsData.map(stat => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
