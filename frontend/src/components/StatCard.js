export default function StatCard({ title, value, color }) {
  return (
    <div className={`card border-left-${color} shadow h-100 py-2`}>
      <div className="card-body">
        <div className="text-xs text-uppercase mb-1">
          {title}
        </div>
        <div className="h5 mb-0 font-weight-bold text-gray-800">
          {value}
        </div>
      </div>
    </div>
  );
}