const Icon = ({ children, className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const CloseIcon = (props) => (
  <Icon {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);

export const SwapIcon = (props) => (
  <Icon {...props}>
    <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />
  </Icon>
);

export const ChevronIcon = (props) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const SortIcon = ({ direction, className = 'h-3 w-3' }) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
    <path d="M6 1 10 5H2z" fill="currentColor" opacity={direction === 'asc' ? 1 : 0.25} />
    <path d="M6 11 2 7h8z" fill="currentColor" opacity={direction === 'desc' ? 1 : 0.25} />
  </svg>
);
