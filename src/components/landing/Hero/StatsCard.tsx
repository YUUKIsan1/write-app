interface StatsCardProps {
  number: string
  label: string
  delay?: number
}

export default function StatsCard({ number, label, delay = 0 }: StatsCardProps) {
  return (
    <div 
      className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {number}
      </div>
      <div className="text-blue-100 text-sm md:text-base font-medium">
        {label}
      </div>
    </div>
  )
}