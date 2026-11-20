"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

type Institution = {
  type: string;
  name: string;
  description: string;
  href: string;
};

const institutions: Institution[] = [
  { type: "School", name: "Tagore Public School", description: "CBSE school · dedicated school website", href: "https://www.tpsgudhagorji.com" },
  { type: "School", name: "Tagore Bal Niketan", description: "RBSE senior secondary school · Hindi and English medium", href: "/institutions/tagore-bal-niketan" },
  { type: "School", name: "Tagore Smart School", description: "RBSE foundational and primary school", href: "/institutions/tagore-smart-school" },
  { type: "Competitive learning", name: "Tagore Vedant Academy", description: "Pre-foundation, MNS, IIT-JEE and NEET learning pathways", href: "/institutions/tagore-vedant-academy" },
  { type: "Higher education", name: "Tagore PG College", description: "College and higher education", href: "/institutions/tagore-pg-college" },
  { type: "Residential life", name: "Tagore Hostel", description: "Student residential services", href: "/institutions/tagore-hostel" },
];

const categories = ["All", "School", "Competitive learning", "Higher education", "Residential life"];

export function InstitutionDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return institutions.filter((item) => {
      const matchesCategory = category === "All" || item.type === category;
      const matchesQuery = !normalized || [item.name, item.type, item.description].some((value) => value.toLocaleLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <div className="directory-controls">
        <label className="directory-search">
          <span className="visually-hidden">Search institutions</span>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by institution, pathway or type"
          />
        </label>
        <div className="directory-filters" aria-label="Filter institutions by category">
          <SlidersHorizontal size={16} aria-hidden="true" />
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="directory-count" aria-live="polite">
        Showing {visible.length} of {institutions.length} institutions
      </p>
      {visible.length ? (
        <div className="institutions">
          {visible.map((item) => (
            <article className="institution" key={item.name}>
              <div><small>{item.type}</small><h3>{item.name}</h3><p>{item.description}</p></div>
              {item.href.startsWith("/") ? <Link href={item.href}>Explore institution ↗</Link> : <a href={item.href}>Explore institution ↗</a>}
            </article>
          ))}
        </div>
      ) : (
        <div className="directory-empty">
          <h2>No matching institution found</h2>
          <p>Try another search term or reset the category filter.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>
        </div>
      )}
    </>
  );
}
