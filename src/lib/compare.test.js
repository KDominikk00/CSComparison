import { describe, expect, it } from 'vitest';
import { barFractions, betterFor, buildSections, slugify, tally, winner } from './compare';

const player = (overrides = {}) => ({
  score: 7,
  killDeathRatio: 1.5,
  killsPerRound: 0.8,
  deathsPerRound: 0.55,
  damagePerRound: 85,
  totals: {
    tournaments: { count: 9, winRate: 33 },
    matches: { count: 38, winRate: 74 },
    maps: { count: 95, winRate: 68 },
    rounds: { count: 1900, winRate: 56 },
  },
  accuracy: [{ bodyPart: 'Head', hits: 800, share: 24 }],
  categories: [{ name: 'AIM', stats: [{ name: 'Headshots %', value: 43, average: 46, unit: '%' }] }],
  mapStats: [{ map: 'Cache', score: 7.5, count: 9 }],
  ...overrides,
});

describe('winner', () => {
  it('picks the higher value when higher is better', () => {
    expect(winner(1.5, 1.2, 'high')).toBe('a');
    expect(winner(1.2, 1.5, 'high')).toBe('b');
  });

  it('picks the lower value when lower is better', () => {
    expect(winner(0.5, 0.7, 'low')).toBe('a');
    expect(winner(0.7, 0.5, 'low')).toBe('b');
  });

  it('has no winner for ties, neutral stats or missing values', () => {
    expect(winner(1, 1, 'high')).toBeNull();
    expect(winner(1, 2, undefined)).toBeNull();
    expect(winner(1, undefined, 'high')).toBeNull();
    expect(winner(null, 2, 'high')).toBeNull();
  });
});

describe('betterFor', () => {
  it('knows which stats are lower-is-better and which are neutral', () => {
    expect(betterFor('Death')).toBe('low');
    expect(betterFor('Open death')).toBe('low');
    expect(betterFor('Kill cost')).toBeUndefined();
    expect(betterFor('Assists')).toBe('high');
  });
});

describe('barFractions', () => {
  it('scales both bars against the larger value', () => {
    expect(barFractions(50, 100)).toEqual([0.5, 1]);
  });

  it('shows empty bars for missing or non-positive values', () => {
    expect(barFractions(undefined, 3)).toEqual([0, 1]);
    expect(barFractions(0, 0)).toEqual([0, 0]);
    expect(barFractions(-1, null)).toEqual([0, 0]);
  });
});

describe('buildSections', () => {
  const sections = buildSections(player(), player({ score: 6, deathsPerRound: 0.7 }));

  it('creates the fixed blocks plus one per stat category', () => {
    expect(sections.map((section) => section.id)).toEqual(['overview', 'results', 'aim', 'accuracy', 'maps']);
  });

  it('computes the average rounds per map', () => {
    const results = sections.find((section) => section.id === 'results');
    expect(results.rows.find((row) => row.label === 'Average rounds per map').a).toBe(20);
  });

  it('leaves out sections without rows', () => {
    const empty = player({ categories: [], accuracy: [], mapStats: [] });
    expect(buildSections(empty, empty).map((section) => section.id)).toEqual(['overview', 'results']);
  });
});

describe('tally', () => {
  it('counts the rows each side wins', () => {
    const sections = buildSections(player(), player({ score: 6, deathsPerRound: 0.7 }));
    // a wins score and deaths per round, everything else is a tie or neutral
    expect(tally(sections)).toEqual({ a: 2, b: 0 });
  });
});

describe('slugify', () => {
  it('makes anchor-friendly ids', () => {
    expect(slugify('Primary devices')).toBe('primary-devices');
    expect(slugify('Where the shots land')).toBe('where-the-shots-land');
  });
});
