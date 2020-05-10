const MINOR_KEYS = ["Abm", "Am", "Bbm", "Bm", "Cm", "C#m", "Dm", "Ebm", "Em", "Fm", "F#m", "Gm"]; // prettier-ignore
const MAJOR_KEYS = ["Ab", "A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G"]; // prettier-ignore

var CHORD_EXP = new RegExp("[\\[\\(](([A-G][b#]?)((7sus4|7sus2|sus4|sus2|dim|aug|add9|m7M|maj7|m9|m7|m6|m|7M|9|7|6|4|11|m11)?(\\s*[-/]?\\s*)))[\\]\\)]", "g"); // prettier-ignore
var DISPLAY_CHORD_EXP = /\[.{1,7}\]/g;

function isMinorKey(key) {
  return MINOR_KEYS.indexOf(key) >= 0;
}

function isMajorKey(key) {
  return MAJOR_KEYS.indexOf(key) >= 0;
}

export function formatLyrics(lyrics) {
  return lyrics
    .replace(DISPLAY_CHORD_EXP, '<span class="chord">$&</span>')
    .replace(/\n/g, "<br />");
}

export function transpose(key, steps) {
  var keys = isMinorKey(key) ? MINOR_KEYS : isMajorKey(key) ? MAJOR_KEYS : null;
  if (!keys) throw new Error(`Invalid key: ${key}`);

  var keyIdx = keys.indexOf(key);

  var newKeyIdx = keyIdx + steps;
  if (newKeyIdx < 0) newKeyIdx += keys.length;
  else newKeyIdx %= keys.length;

  var newKey = keys[newKeyIdx];

  return newKey;
}

export function transposeLyrics(lyrics, steps) {
  return lyrics.replace(CHORD_EXP, function ($0, $1, $2, $3) {
    return "[" + transpose($2, steps) + $3 + "]";
  });
}
