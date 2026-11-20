import Link from "next/link";
import { CalendarDays, MessageCircle } from "lucide-react";

export function MobileQuickActions() {
  return (
    <nav className="mobile-quick-actions" aria-label="Quick actions">
      <Link href="/admissions" className="mobile-quick-action mobile-quick-action-primary">
        <MessageCircle size={17} aria-hidden="true" />
        <span>Admissions enquiry</span>
      </Link>
      <Link href="/visit" className="mobile-quick-action mobile-quick-action-secondary">
        <CalendarDays size={17} aria-hidden="true" />
        <span>Visit campus</span>
      </Link>
    </nav>
  );
}
