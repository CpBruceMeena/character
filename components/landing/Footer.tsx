export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-bg-card px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {/* Brand */}
        <div className="sm:col-span-1">
          <span className="font-[family-name:var(--font-display-fredoka)] text-lg font-semibold text-amber-700">
            CharacterForge Pro
          </span>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-tertiary">
            A web-based character creation tool. Pick a style, customize every
            detail, and export in any format.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Product
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/templates"
                className="text-sm text-text-secondary transition-colors hover:text-amber-600"
              >
                Templates
              </a>
            </li>
            <li>
              <a
                href="/editor"
                className="text-sm text-text-secondary transition-colors hover:text-amber-600"
              >
                Editor
              </a>
            </li>
            <li>
              <a
                href="/export"
                className="text-sm text-text-secondary transition-colors hover:text-amber-600"
              >
                Export formats
              </a>
            </li>
          </ul>
        </div>

        {/* Meta */}
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Resources
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/docs"
                className="text-sm text-text-secondary transition-colors hover:text-amber-600"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="/changelog"
                className="text-sm text-text-secondary transition-colors hover:text-amber-600"
              >
                Changelog
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="text-sm text-text-secondary transition-colors hover:text-amber-600"
              >
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-xs text-text-tertiary">
        &copy; {year} CharacterForge Pro. Built with attention.
      </div>
    </footer>
  );
}
