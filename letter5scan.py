# Brukes for å scanne en tekst fil for å fjerne alle ord som ikke er 5 bokstaver

import re
import sys

INPUT = "wordList.txt"
OUTPUT = "wordList_5bokstaver.txt"

letter_re = re.compile(r'^[a-zæøå]+$', re.IGNORECASE)

def main():
    try:
        with open(INPUT, "r", encoding="utf-8") as f:
            text = f.read()
    except FileNotFoundError:
        print(f"FEIL: Finner ikke filen '{INPUT}'. Sørg for at scriptet ligger i samme mappe som filen.")
        sys.exit(1)
    except Exception as e:
        print("FEIL ved åpning av fil:", e)
        sys.exit(1)

    parts = [p for p in re.split(r'[,\n\r]+', text) if p.strip()]

    kept = []
    counters = {"total_parts": len(parts), "wrong_length":0, "has_hyphen":0, "non_letters":0}

    for p in parts:
        w = p.replace("'", "").strip()
        w = w.strip("\ufeff").strip()

        if "-" in w:
            counters["has_hyphen"] += 1
            continue
        if len(w) != 5:
            counters["wrong_length"] += 1
            continue
        if not letter_re.fullmatch(w):
            counters["non_letters"] += 1
            continue

        kept.append(w.lower())

    kept = sorted(dict.fromkeys(kept))

    try:
        with open(OUTPUT, "w", encoding="utf-8") as f:
            f.write("\n".join(kept))
    except Exception as e:
        print("FEIL ved skriving av output:", e)
        sys.exit(1)

if __name__ == "__main__":
    main()