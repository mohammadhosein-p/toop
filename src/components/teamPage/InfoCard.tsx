
export default function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2 p-3 bg-gray-100 rounded-lg shadow-sm h-full">
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="text-emerald-600 text-lg mt-0.5">{icon}</div>
        <div className="text-xs font-semibold text-gray-500">{label}</div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{value || "-"}</div>
      </div>
    </div>
  );
}
