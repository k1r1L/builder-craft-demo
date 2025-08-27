import { OverLimit } from "../components/styled";
import { CHOICE_CHAR_MAX_LENGTH } from "../constants/field";

export const renderHighlighted = (text: string) => {
  const lines = text.split(/\r?\n/);
  return lines.map((line, li) => (
    <span key={li}>
      {renderLine(line)}
      {li < lines.length - 1 ? "\n" : null}
    </span>
  ));
}

/**
 * Highlight only the overflow part of the FIRST word that crosses LIMIT.
 * Everything else (even if past 40) remains unhighlighted.
 */
export const renderLine = (line: string) => {
  if (!line) return "";
  const tokens = line.match(/(\S+|\s+)/g) ?? [line];
  let cursor = 0;
  let highlighted = false;
  const out: React.ReactNode[] = [];

  tokens.forEach((tok, i) => {
    const start = cursor;
    const end = start + tok.length;
    const isWord = /\S/.test(tok[0] ?? "");

    if (!highlighted && isWord && start < CHOICE_CHAR_MAX_LENGTH && end > CHOICE_CHAR_MAX_LENGTH) {
      // The token (word) crosses the boundary — split just this word
      const cut = CHOICE_CHAR_MAX_LENGTH - start;
      const before = tok.slice(0, cut);
      const overflow = tok.slice(cut);
      out.push(
        <span key={`b-${i}`}>{before}</span>,
        <OverLimit key={`o-${i}`}>{overflow}</OverLimit>
      );
      highlighted = true;
    } else {
      out.push(<span key={i}>{tok}</span>);
    }
    cursor = end;
  });

  return out;
}
  