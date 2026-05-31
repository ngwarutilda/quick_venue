export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} QuickVenue · Built for the University of Buea
      </div>
    </footer>
  );
}
