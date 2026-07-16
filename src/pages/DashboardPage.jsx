import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, LogOut, Trash2, RefreshCw } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';

const STATUSES = ['new', 'contacted', 'enrolled', 'closed'];
const STATUS_STYLE = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  enrolled: 'bg-green-100 text-green-700',
  closed: 'bg-gray-200 text-gray-600',
};

const DashboardPage = () => {
  const { toast } = useToast();
  const [authed, setAuthed] = useState(pb.authStore.isValid);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const items = await pb.collection('inquiries').getFullList({ sort: '-created' });
      setRows(items);
    } catch (err) {
      toast({ title: 'Could not load enquiries', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await pb.collection('users').authWithPassword(email, password);
      setAuthed(true);
    } catch (err) {
      toast({ title: 'Login failed', description: 'Check your credentials.', variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  const logout = () => { pb.authStore.clear(); setAuthed(false); setRows([]); };

  const setStatus = async (id, status) => {
    try {
      const rec = await pb.collection('inquiries').update(id, { status });
      setRows((r) => r.map((x) => (x.id === id ? rec : x)));
    } catch { toast({ title: 'Update failed', variant: 'destructive' }); }
  };

  const remove = async (id) => {
    try {
      await pb.collection('inquiries').delete(id);
      setRows((r) => r.filter((x) => x.id !== id));
    } catch { toast({ title: 'Delete failed', variant: 'destructive' }); }
  };

  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter);

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-navy-deep px-5">
        <Helmet><title>Admin — AlphaMed</title></Helmet>
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-white">
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-white/60">AlphaMed enquiry dashboard</p>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-6 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 outline-none focus:border-gold" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 outline-none focus:border-gold" />
          <button disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 font-semibold text-navy-deep disabled:opacity-70">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Helmet><title>Enquiries — AlphaMed Admin</title></Helmet>
      <header className="flex items-center justify-between border-b border-navy/10 bg-navy-deep px-5 py-4 text-white">
        <h1 className="font-display text-xl font-semibold">Enquiry Dashboard</h1>
        <div className="flex items-center gap-2">
          <button onClick={load} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"><RefreshCw className="h-4 w-4" /></button>
          <button onClick={logout} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"><LogOut className="h-4 w-4" /> Logout</button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {['all', ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${filter === s ? 'bg-navy text-white' : 'bg-white text-navy/70 hover:bg-navy/5'}`}>
              {s} {s !== 'all' && <span className="opacity-60">({rows.filter((r) => r.status === s).length})</span>}
            </button>
          ))}
          <span className="ml-auto text-sm text-navy/60">{rows.length} total</span>
        </div>

        {loading ? (
          <div className="grid place-items-center py-20 text-navy/50"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : shown.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-navy/20 bg-white py-20 text-center text-navy/50">No enquiries here yet.</div>
        ) : (
          <div className="space-y-3">
            {shown.map((r) => (
              <div key={r.id} className="rounded-2xl border border-navy/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-navy">{r.name}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLE[r.status] || STATUS_STYLE.new}`}>{r.status || 'new'}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-navy/70">
                      <a href={`mailto:${r.email}`} className="hover:text-gold">{r.email}</a>
                      <a href={`tel:${r.phone}`} className="hover:text-gold">{r.phone}</a>
                      <span>Interest: <b className="text-navy">{r.country}</b></span>
                      <span className="text-navy/50">{new Date(r.created).toLocaleDateString()}</span>
                    </div>
                    {r.message && <p className="mt-3 max-w-2xl text-sm text-navy/70">{r.message}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={r.status || 'new'} onChange={(e) => setStatus(r.id, e.target.value)}
                      className="rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-gold">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={() => remove(r.id)} className="grid h-9 w-9 place-items-center rounded-lg text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
