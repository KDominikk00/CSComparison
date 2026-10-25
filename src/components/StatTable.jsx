import { formatNumber } from '../lib/format';

const winner = (a, b, better) => {
  if (!better || typeof a !== 'number' || typeof b !== 'number' || a === b) {
    return null;
  }
  const firstWins = better === 'high' ? a > b : a < b;
  return firstWins ? 'a' : 'b';
};

const cellClass = (isWinner) => (isWinner ? 'text-green-600 font-bold' : 'text-gray-800');

/**
 * Side by side stats of two players. A row's `better` is 'high' or 'low' when one direction is
 * clearly good, and left out when the stat is only informative.
 */
const StatTable = ({ title, subtitle, names, rows }) => (
  <section className="w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-8 mt-8">
    <h2 className="text-2xl font-semibold text-center text-gray-800">{title}</h2>
    {subtitle && <p className="text-sm text-center text-gray-500 mb-6">{subtitle}</p>}
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-center">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="py-2 px-3 text-right w-1/3 text-blue-700">{names[0]}</th>
            <th className="py-2 px-3 w-1/3" />
            <th className="py-2 px-3 text-left w-1/3 text-red-700">{names[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, a, b, unit, better }) => {
            const result = winner(a, b, better);
            return (
              <tr key={label} className="border-t border-gray-100">
                <td className={`py-2 px-3 text-right ${cellClass(result === 'a')}`}>{formatNumber(a, unit)}</td>
                <td className="py-2 px-3 text-sm text-gray-600">{label}</td>
                <td className={`py-2 px-3 text-left ${cellClass(result === 'b')}`}>{formatNumber(b, unit)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

export default StatTable;
