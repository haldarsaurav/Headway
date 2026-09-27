# Train delay graph — Rev1.1

## What it measures

Each minute is a snapshot of the fetched Freising board, across all train pages. Select services
whose returned departure time is from now through 60 minutes ahead (inclusive). The firmware
retains at most 24 trains, so this is a bounded board sample, not a complete station census.

For each non-cancelled service, require `realTime = true` and valid actual and scheduled departure
timestamps. Lateness is `max(actual - scheduled, 0)` in seconds. Average those seconds over the
eligible services, then round once to the nearest tenth of a minute. Early departures contribute
zero lateness. Timetable-only entries and entries without comparable timestamps do not dilute
the mean. With no eligible services, the reading is missing, not zero.

Examples: 90 and 180 seconds average to 2.3 minutes after rounding. A two-minute early train and
a two-minute late train average to 1.0 minute of lateness. One cancellation and one on-time
realtime train produce a zero-height green reading plus a cancellation marker, not 7.5 minutes.

The [MOTIS schema](https://github.com/motis-project/motis/blob/master/openapi.yaml) defines
`realTime` as availability of realtime information for the leg; it is not a per-stop accuracy
or freshness guarantee. The device cannot infer unreported delays or a feed's hidden age.

## Time axis and legend

- Left to right: 180 elapsed-minute slots, oldest to newest, with hourly guide lines and `3h` label.
- A minute uses its latest response. Retries do not create extra columns.
- Missed refreshes, failed requests, invalid device time and empty eligible sets leave gaps.
  A failed response also clears an earlier response in that same minute.
- Green: average under 1.5 minutes. Amber: 1.5 to under 4. Red: 4 minutes or more.
- Bar height: zero to 15 minutes (`15m` label). A white cap means above the visible scale;
  observations are not individually capped at 30 minutes. Only the storage maximum of
  6,553.4 minutes is saturated, well outside normal operating values.
- Red dots in the top track: at least one cancelled service in the same one-hour window.
- Grey dots in the second track: at least one non-cancelled service lacked comparable realtime
  information. This includes a wholly timetable-only snapshot with no coloured bar.
- Numeric bars occupy their own track below these markers; zero delay is a one-pixel green bar.

Elapsed time uses unsigned `millis()` arithmetic, so NTP corrections do not rearrange past
samples and the normal millis rollover is supported. The loop advances history during outages.
History lives in RAM. Since firmware 1.2.7 a copy is also kept in the chip's RTC memory, which
survives a software restart, a watchdog reset or a crash but not a power cut. It is written once
a second (magic word, format number, FNV-1a checksum) together with the wall-clock second at which
the newest slot began. After a restart, once the clock is set, `DelayGraph::resume()` re-anchors
it on the new `millis()` axis, so the restart and any time in setup become gaps. A copy that fails
the checks, lies in the future or is three hours old or more is dropped. Start over wipes it.

## Interpretation and limits

This is a history of the board's reported situation, not final departure punctuality or a
per-trip reliability score. The same upcoming train can appear in successive snapshots. Route
mix, service count and realtime coverage can change; missing observations are not interpolated.
The one-hour window follows returned departure time, so a very delayed train can enter or leave
it as its forecast changes. Cancellation markers cover only cancellations returned by the API.

A true final-departure reliability chart would need stable trip IDs, retained per-trip records
and confirmation after departure. That is a different measurement and is not claimed here.

## Why Rev1 changed

The old metric mixed cancellations with an invented 15-minute delay, included unknown realtime
as zero, clipped each train to 30 minutes, truncated seconds and drew an empty board as green.
Its 180 successful responses stretched across outages rather than representing three elapsed
hours. Rev1.1 removes those distortions and makes missing data visible.

The exact firmware implementation is exercised by [delay_graph_test.cpp](../tests/delay_graph_test.cpp).
