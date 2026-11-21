"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

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
  const [comparison, setComparison] = useState<string[]>([]);
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return institutions.filter((item) => {
      const matchesCategory = category === "All" || item.type === category;
      const matchesQuery = !normalized || [item.name, item.type, item.description].some((value) => value.toLocaleLowerCase().includes(normalized));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);
  const hasActiveFilters = query.trim().length > 0 || category !== "All";
  const toggleComparison = (name: string) => {
    setComparison((current) => current.includes(name)
      ? current.filter((item) => item !== name)
      : current.length < 3 ? [...current, name] : current);
  };
  const comparedInstitutions = institutions.filter((item) => comparison.includes(item.name));
  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

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
            aria-controls="institution-directory-results"
          />
        </label>
        <div className="directory-filters" role="group" aria-label="Filter institutions by category">
          <SlidersHorizontal size={16} aria-hidden="true" />
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              aria-controls="institution-directory-results"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {hasActiveFilters && visible.length > 0 && (
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-navy hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy" onClick={clearFilters}>
            <X size={14} aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>
      <p className="directory-count" role="status" aria-live="polite" aria-atomic="true">
        Showing {visible.length} of {institutions.length} institutions
      </p>
      <p className="compare-guidance" id="compare-guidance">Select up to three institutions to compare their published pathway summaries. You can compare the information currently available here; this is not a ranking.</p>
      <div id="institution-directory-results" aria-busy="false">
        {visible.length ? (
          <div className="institutions">
            {visible.map((item) => (
              <article className="institution" key={item.name}>
                <div><small>{item.type}</small><h3>{item.name}</h3><p>{item.description}</p></div>
                {item.href.startsWith("/") ? <Link href={item.href}>Explore institution ↗</Link> : <a href={item.href} target="_blank" rel="noopener noreferrer">Explore institution ↗</a>}
                <label className="compare-toggle">
                  <input
                    type="checkbox"
                    checked={comparison.includes(item.name)}
                    onChange={() => toggleComparison(item.name)}
                    disabled={!comparison.includes(item.name) && comparison.length >= 3}
                    aria-describedby="compare-guidance"
                  />
                  <span>Compare</span>
                </label>
              </article>
            ))}
          </div>
        ) : (
          <div className="directory-empty">
            <h2>No matching institution found</h2>
            <p>Try another search term or reset the category filter.</p>
            <button type="button" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </div>
      {comparedInstitutions.length > 0 && (
        <section className="compare-panel" aria-labelledby="compare-heading">
          <div className="compare-panel-heading">
            <div>
              <p className="eyebrow">Side-by-side view</p>
              <h2 id="compare-heading">Compare pathways</h2>
              <p aria-live="polite">{comparedInstitutions.length} of 3 comparison places selected</p>
            </div>
            <button type="button" className="compare-clear" onClick={() => setComparison([])}>Clear comparison</button>
          </div>
          <div className="compare-table-wrap" role="region" aria-label="Institution comparison" tabIndex={0}>
            <table className="compare-table">
              <thead><tr><th scope="col">Published detail</th>{comparedInstitutions.map((item) => <th scope="col" key={item.name}>{item.name}</th>)}</tr></thead>
              <tbody>
                <tr><th scope="row">Pathway</th>{comparedInstitutions.map((item) => <td key={item.name}>{item.type}</td>)}</tr>
                <tr><th scope="row">Current summary</th>{comparedInstitutions.map((item) => <td key={item.name}>{item.description}</td>)}</tr>
                <tr><th scope="row">Next step</th>{comparedInstitutions.map((item) => <td key={item.name}>{item.href.startsWith("/") ? <Link href={item.href}>View institution</Link> : <a href={item.href} target="_blank" rel="noopener noreferrer">View institution</a>}</td>)}</tr>
              </tbody>
            </table>
          </div>
          <p className="compare-disclaimer">Only the information currently published in the directory is compared. Confirm programme details, eligibility, fees and availability with the relevant institution.</p>
        </section>
      )}
    </>
  );
}
