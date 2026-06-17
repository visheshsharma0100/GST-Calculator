import { useMemo, useState } from 'react';

const slabs = [5, 12, 18, 28];

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

function formatCurrency(value) {
  return currency.format(Number.isFinite(value) ? value : 0);
}

export default function App() {
  const [price, setPrice] = useState('');
  const [gstRate, setGstRate] = useState(18);
  const [touched, setTouched] = useState(false);

  const numericPrice = Number(price);
  const hasPrice = price.trim() !== '';
  const isInvalid = touched && (!hasPrice || numericPrice <= 0);

  const result = useMemo(() => {
    if (!hasPrice || numericPrice <= 0) {
      return null;
    }

    const gstAmount = (numericPrice * gstRate) / 100;
    const halfGst = gstAmount / 2;

    return {
      gstAmount,
      cgst: halfGst,
      sgst: halfGst,
      total: numericPrice + gstAmount,
    };
  }, [gstRate, hasPrice, numericPrice]);

  const handlePriceChange = (event) => {
    const value = event.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    const sanitized =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : value;

    setPrice(sanitized);
    setTouched(true);
  };

  const clearCalculator = () => {
    setPrice('');
    setGstRate(18);
    setTouched(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),linear-gradient(135deg,#ffffff_0%,#eef5ff_52%,#dbeafe_100%)]" />
      <div className="pointer-events-none absolute -right-16 top-20 select-none text-[16rem] font-black leading-none text-blue-900/[0.055] sm:right-8 sm:text-[22rem]">
        ₹
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-950 text-xl font-bold text-white shadow-lg shadow-blue-950/20">
              ₹
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                GST Tools
              </p>
              <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">
                GST Calculator
              </h1>
            </div>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-12">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-white/75 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm backdrop-blur">
              Fast, accurate Indian GST breakdowns
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-blue-950 sm:text-5xl">
              Calculate GST, CGST, SGST, and totals in real time.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Enter a base price, pick the GST slab, and get a polished tax
              split instantly for invoices, estimates, and billing checks.
            </p>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-7">
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Price
                </span>
                <div className="group flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <span className="text-xl font-bold text-blue-950">₹</span>
                  <input
                    value={price}
                    onBlur={() => setTouched(true)}
                    onChange={handlePriceChange}
                    inputMode="decimal"
                    placeholder="Enter amount"
                    aria-invalid={isInvalid}
                    className="min-h-14 w-full bg-transparent px-3 text-lg font-semibold text-slate-950 outline-none placeholder:text-slate-400"
                  />
                </div>
                {isInvalid && (
                  <p className="mt-2 text-sm font-medium text-red-600">
                    Please enter a valid amount greater than zero.
                  </p>
                )}
              </label>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  GST Slab
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {slabs.map((slab) => (
                    <button
                      key={slab}
                      type="button"
                      onClick={() => setGstRate(slab)}
                      className={`rounded-2xl border px-4 py-3 text-base font-bold transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                        gstRate === slab
                          ? 'border-blue-950 bg-blue-950 text-white shadow-lg shadow-blue-950/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-800'
                      }`}
                    >
                      {slab}%
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={clearCalculator}
                className="w-full rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3.5 text-base font-bold text-blue-900 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-950/10"
              >
                Clear / Reset
              </button>
            </div>

            {result && (
              <section
                key={`${price}-${gstRate}`}
                className="mt-7 animate-fadeUp rounded-3xl bg-gradient-to-br from-blue-950 to-blue-800 p-5 text-white shadow-xl shadow-blue-950/20 sm:p-6"
                aria-live="polite"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-100">
                      Calculation
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold">
                      {gstRate}% GST
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/12 px-4 py-2 text-sm font-bold text-blue-50">
                    Base {formatCurrency(numericPrice)}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ResultItem label="GST Amount" value={result.gstAmount} />
                  <ResultItem label="CGST" value={result.cgst} />
                  <ResultItem label="SGST" value={result.sgst} />
                  <ResultItem label="Total Amount" value={result.total} strong />
                </div>
              </section>
            )}
          </div>
        </div>

        <footer className="relative mt-auto rounded-3xl border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="space-y-1 text-sm text-slate-700">
            <p>
              <span className="font-bold text-slate-950">Name:</span> Vishesh
              Sharma
            </p>
            <p>
              <span className="font-bold text-slate-950">Email:</span>{' '}
              <a
                href="mailto:visheshsharma00410@gmail.com"
                className="font-semibold text-blue-800 hover:text-blue-950"
              >
                visheshsharma00410@gmail.com
              </a>
            </p>
          </div>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-blue-950 px-5 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 sm:mt-0 sm:w-auto"
          >
            Built for Digital Heroes
          </a>
        </footer>
      </section>
    </main>
  );
}

function ResultItem({ label, value, strong = false }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-sm font-medium text-blue-100">{label}</p>
      <p className={`mt-1 ${strong ? 'text-2xl' : 'text-xl'} font-extrabold`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}
