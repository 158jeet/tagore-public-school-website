import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";

export function MobileQuickActions() {
  return (
    <nav className="mobile-quick-actions" aria-label="Quick actions">
      <Link href="/institutions" className="mobile-quick-action mobile-quick-action-secondary">
        <Landmark size={17} aria-hidden="true" />
        <span>Institutions</span>
      </Link>
      <Link href="/contact" className="mobile-quick-action mobile-quick-action-primary">
        <ArrowRight size={17} aria-hidden="true" />
        <span>Connect with Tagore</span>
      </Link>
    </nav>
  );
}
