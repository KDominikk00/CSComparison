import { useEffect, useState } from 'react';
import Skeleton from './Skeleton';

/** After a few seconds, explains why loading is slow: the free server sleeps when idle. */
const SlowNotice = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className={`text-center text-sm text-slate-400 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`} aria-live="polite">
      {show && 'The server wakes up after quiet periods and this can take up to a minute. Thanks for waiting.'}
    </p>
  );
};

export const Loading = () => (
  <div className="space-y-6">
    <SlowNotice />
    <Skeleton />
  </div>
);

export const LoadError = ({ message, onRetry }) => (
  <div role="alert" className="rounded-3xl border border-red-400/30 bg-red-400/10 p-8 text-center">
    <p className="font-medium text-red-100">Could not load the players</p>
    <p className="mt-1 text-sm text-red-200/80">{message}</p>
    <button type="button" onClick={onRetry} className="mt-5 rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-950 transition-colors hover:bg-white">
      Try again
    </button>
  </div>
);
