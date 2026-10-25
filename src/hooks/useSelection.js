import { useCallback, useRef, useState } from 'react';

const readFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return { a: params.get('a'), b: params.get('b') };
};

const writeToUrl = ({ a, b }) => {
  const url = new URL(window.location.href);
  for (const [key, value] of [['a', a], ['b', b]]) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  window.history.replaceState(null, '', url);
};

/** The two players being compared, kept in the address bar so a comparison can be shared as a link. */
export const useSelection = () => {
  const [selection, setSelection] = useState(readFromUrl);
  const nextToReplace = useRef('a');

  const update = useCallback((next) => {
    writeToUrl(next);
    setSelection(next);
  }, []);

  const setSide = useCallback((side, slug) => update({ ...selection, [side]: slug }), [selection, update]);

  const swap = useCallback(() => update({ a: selection.b, b: selection.a }), [selection, update]);

  const clear = useCallback(() => update({ a: null, b: null }), [update]);

  /** Click on a leaderboard row: fills a free side, replaces sides in turn once both are taken, or removes the player. */
  const toggle = useCallback(
    (slug) => {
      if (selection.a === slug) return setSide('a', null);
      if (selection.b === slug) return setSide('b', null);
      if (!selection.a) return setSide('a', slug);
      if (!selection.b) return setSide('b', slug);

      const side = nextToReplace.current;
      nextToReplace.current = side === 'a' ? 'b' : 'a';
      return setSide(side, slug);
    },
    [selection, setSide],
  );

  return { selection, setSide, swap, clear, toggle };
};
