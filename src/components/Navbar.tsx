import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">QuickVenue</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
          >
            About
          </Link>
          <Link
            to="/admin"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
