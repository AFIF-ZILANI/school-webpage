export function StatsSection() {
  const stats = [
    { label: "Years of Excellence", value: "50+" },
    { label: "Students Enrolled", value: "1200+" },
    { label: "Expert Teachers", value: "80+" },
    { label: "Success Rate", value: "95%" },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}