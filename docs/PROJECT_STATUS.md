# Project status

## Closeout — firmware 1.2.8, 27 September 2026

**The project is wrapped up in software.** Firmware 1.2.8 is the final version: five looks
(Original default), readability pass from photos of the running board (1.2.2), scrolling on
every train page and a larger platform number (1.2.3), full bus names with their via part
when scrolling is on in every look (1.2.4), real umlauts in Original (1.2.5), the new name Headway (1.2.6), a delay graph that survives restarts (1.2.7), a 30-day temperature graph with each day's low and high (1.2.8), plus the 1.2.1 enclosure rotation,
Start over and button wording. Comments, CHANGELOG, READMEs, the feature guide and build notes
match the code. A final logic audit reviewed the drawing, scrolling, Split-Flap turning and
button paths; its only code change makes Original's scroll entries set their text offset
explicitly (no visible effect). `.gitignore` now also keeps the `_backup_before_*` folders and
any copy of `DeskSecrets.h` out of Git.

Checked on a PC: every screen of every look rendered from the real code under AddressSanitizer
and UBSan (normal data, stress data and 40 rounds of Split-Flap page changes, turns and
refreshes) with no errors; Original renders are pixel-identical to 1.2.1 apart from the version
number; 52 compile-time logic/graph assertions and 9 setup-page scenarios pass.

New phone photos and short video clips show a powered Headway prototype. They do not establish
that firmware 1.2.8 was flashed or that the current Rev9 / desk rev2 CAD has passed a fit check.

**Still needed for firmware 1.2.8 and the current CAD:**

1. Compile in the Arduino IDE (quit the IDE completely before opening the updated files).
   Expect roughly 76 % flash. Any compile error is new in 1.2.1–1.2.8.
2. Boot splash reads **Headway** and **v1.2.8** and is upright in the enclosure.
3. Serial after boot: `Theme <name>: fonts loaded, heap N` and the free heap after the first
   refresh (Bahnsteig and Papier load three more fonts than 1.2.1).
4. With scrolling on: train pages 2-4 scroll in Bahnsteig, Amber Matrix and Papier; Amber bus
   rows keep their umlaut dots while scrolling; Split-Flap names turn over every 3 s and the
   button stays responsive while they do.
5. With scrolling on, the P+R board shows "... ü. Gute Änger" scrolling in every look
   (Original too, with the real ü and Ä).
6. First train page: next-train block and the bigger platform number in all four font looks.
7. Setup page: Look card, Save, Start over. The setup Wi-Fi is now called **Headway-Setup**
   (the QR on the screen already knows the new name).
8. Delay graph through a restart: let the board run 10+ minutes, change the look and Save. After
   the restart the graph keeps its bars, with a short gap for the restart. Serial prints
   `Delay graph: restored, newest slot N s old`. Start over (or unplugging) empties it.
9. 30-day temperature graph: serial prints `Temperature history: 31 days, today low X high Y`; each bar floats from the day's low to its high, and the left numbers are the warmest high and coldest low. If every bar is only a thin mark, the lows did not arrive.

**Folder cleanup (27 Sep 2026):** backups, temporary files, the 1.2.0 previews and zip, and the
enclosure concepts and Rev1–Rev7 were removed. The enclosure folder keeps wall Rev9 (current) and
Rev8, desk rev2 (current) and rev1, and both photo-card sets; the release zip was rebuilt (now for 1.2.5).


## Rev1.2 audit — 26 September 2026

The five-look firmware and Rev7 enclosure files received a release audit. Small text contrast,
text fitting and countdown limits received a code audit. The local Rev1.2 ZIP
is generated with its source, font notices, CAD files and checksum manifest. The final
ESP32-C3 compile/link passed at 2,282,874 bytes flash and 52,452 bytes static RAM; 52
compile-time logic/graph assertions and five setup-page JavaScript scenarios pass. The screen previews
are illustrative and predate the last contrast pass. The display has not been flashed in this
audit, and the Rev7 enclosure has not been fit-tested. Check actual LCD legibility, button and
setup interactions, and printed clearances before calling the physical design verified.

## Rev1.1 closeout

**Software, documentation and repository packaging completed on 25 September 2026.**
Firmware remains **1.1.0**. The `rev1.1-final` tag adds the final documentation and permission
policy to the reviewed firmware revision; the earlier `rev1.1` tag is preserved unchanged.

## Delivered

- Reviewed firmware, including corrected delay snapshots and the prior reliability fixes.
- A dedicated [code repository](https://github.com/haldarsaurav/headway_code)
  for firmware, tests and build/release documentation.
- A [public showcase](https://github.com/haldarsaurav/headway) whose current
  branch contains documentation and images, with no firmware source or compiled firmware.
- The [complete feature guide](https://github.com/haldarsaurav/headway/blob/main/docs/FEATURE_GUIDE.md),
  covering screen fields, symbols, colours, graph legends, controls, examples and limitations.
- Two enlarged explanation diagrams, visually checked for clipping and legibility.
- Matching proprietary [licence](../LICENSE) and [permission guide](PERMISSIONS.md)
  in both repositories.
- A complete local Rev1.1 ZIP containing reviewed source, documentation and existing CAD
  snapshots, with a per-file SHA-256 manifest. Private settings and reference photos are excluded.

## Verification

The firmware release passed **52 compile-time logic/graph assertions**, **five actual embedded
setup JavaScript scenarios**, and ESP32-C3 compile/link/image generation. Finalization changes
only documentation, notices and illustration assets; the executable source matches the tested
Rev1.1 source. Documentation links, image files, repository separation and archive checksums
are checked as part of final packaging.

## Physical validation still open

The board was not flashed in this review. Physical display appearance, tiny marker legibility,
MODE and setup interactions on the device, Wi-Fi outage recovery over a long run, and enclosure
fit need an actual hardware session. Software/documentation completion does not certify those
physical results. The illustrations are not evidence of hardware testing.

## Publication and rights scope

The public repository's older commits may still contain the original firmware. They were not
rewritten. The new notices do not retrospectively revoke earlier valid grants or GitHub platform
rights, and cannot physically prevent copying. The owner nevertheless expressly
requires prior written permission for the protected reuse described in the licence.
