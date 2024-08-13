export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen w-full bg-slate-100 font-mono">{children}</div>
	);
}
