export function PrototypeDisclosureBanner() {
  const items = ['prototipo', 'sem deploy producao', 'sem coleta real', 'sem analytics real', 'sem certificacao diagnostica', 'sem dado clinico']

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-950">
      <p className="font-black">SenseTrust Prototype UX v2.0</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded bg-white px-2 py-1 text-xs font-bold uppercase text-amber-800">{item}</span>
        ))}
      </div>
    </div>
  )
}
