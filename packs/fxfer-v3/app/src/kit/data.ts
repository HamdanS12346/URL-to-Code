// Synthetic grid rows: the capture keeps no client data (only each column's type, lengths and the row count),
// so the rebuild makes up rows of the same shape. Deterministic: the same screen shows the same rows on every load.
import type { GridAfter, WidgetDef } from './core';

const fmtDate = (d: Date, withTime: boolean) => {
  const s = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  if (!withTime) return s;
  const h = d.getHours(), m = d.getMinutes();
  return `${s} ${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};
const WORDS = ['Alpha', 'Bravo', 'Cedar', 'Delta', 'Echo', 'Falcon', 'Granite', 'Harbor', 'Iris', 'Juniper', 'Kestrel', 'Lumen'];

export function cellValue(col: { field: string | null; title: string }, after: GridAfter | undefined, i: number): string {
  const f = (col.field && after?.fields[col.field]) || null;
  const type = f?.type ?? (/date/i.test(col.title) ? 'date' : /(^|\s)id$|number|count|size/i.test(col.title) ? 'number' : 'string');
  if (type === 'number') return String(/id/i.test(col.title) ? i + 1 : (i * 37) % 1000);
  if (type === 'boolean') return i % 5 === 4 ? 'No' : 'Yes';
  if (type === 'date') return fmtDate(new Date(2025, 0, 1 + i * 3, 7 + (i % 9), (i * 15) % 60), (f?.maxLen ?? 0) > 12);
  const max = Math.max(f?.maxLen ?? 16, 4);
  const word = `${WORDS[i % WORDS.length]} ${col.title.replace(/\s+/g, '')}${i + 1}`;
  return word.length > max ? word.slice(0, max) : word;
}

export function rowsFor(def: WidgetDef, after: GridAfter | undefined): string[][] {
  const cols = (def.columns ?? []).filter((c) => !c.hidden);
  const n = Math.min(after?.total ?? 0, 500);
  return Array.from({ length: n }, (_, i) => cols.map((c) => (c.command ? '' : cellValue(c, after, i))));
}

// what Search would return: mock data in the shape the screen expects (src/services/<screen>.ts uses it)
export function mockPage(def: WidgetDef, after: GridAfter | undefined, page = 1, size = after?.pageSize ?? def.pageSize ?? 10) {
  const rows = rowsFor(def, after);
  return { total: rows.length, rows: rows.slice((page - 1) * size, page * size) };
}
