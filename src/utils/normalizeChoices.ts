// Util that receives a bunch of choices, and returns only a unique array of these choices
export function normalizeChoices(raw: string): string[] {
    const lines = raw
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(Boolean);
    const uniq: string[] = [];
    const seen = new Set<string>();
    for (const item of lines) {
      if (!seen.has(item)) {
        seen.add(item);
        uniq.push(item);
      }
    }
    return uniq;
  }
  