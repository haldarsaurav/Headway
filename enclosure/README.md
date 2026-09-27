# The two Headway cases

[Back to the project](../README.md) · [Interactive CAD gallery](../docs/index.html#enclosures)

Both current designs come from editable FreeCAD models. The gallery images below were rendered from those models' exported STL geometry. They show the design, not an assembled or fit-verified device. The [main README](../README.md#the-two-cases) also shows real print iterations and the parts before assembly; its [powered-board photos](../README.md#the-board-in-use) show a physical prototype, without proving the latest CAD revision fits.

## Model A · wall, Rev9

This is the case I plan to place near my bathroom mirror or by the front door. It has a display window, a small picture-card opening and access to the BOOT key. Rev9 adds a fourth screw boss and stronger ESP32 ribs. Four M2.5 heat-set inserts and countersunk screws make the back removable. The three display screws also clamp the display; the fourth closes the far corner.

<p align="center"><img src="model_A/rev9/images/isometric.png" alt="Model A isometric CAD view" width="680"><br><sub>Isometric front shell</sub></p>

<p align="center"><img src="model_A/rev9/images/front.png" alt="Model A front CAD view" width="450"><br><sub>Front</sub></p>
<p align="center"><img src="model_A/rev9/images/back.png" alt="Model A back CAD view" width="450"><br><sub>Back / inside of shell</sub></p>
<p align="center"><img src="model_A/rev9/images/top.png" alt="Model A top CAD view" width="450"><br><sub>Top</sub></p>
<p align="center"><img src="model_A/rev9/images/side.png" alt="Model A side CAD view" width="450"><br><sub>Side</sub></p>
<p align="center"><img src="model_A/rev9/images/back_plate.png" alt="Model A separate back plate CAD view" width="450"><br><sub>Separate back plate</sub></p>

[FreeCAD model](model_A/rev9/Headway_enclosure_rev9.FCStd) · [STEP](model_A/rev9/Headway_enclosure_rev9.step) · [parts, print orientation and assembly](model_A/rev9/README_REV9.md)

<p align="center"><img src="../docs/assets/slicer-model-a.webp" alt="Model A shell and back plate arranged on a slicer bed" width="680"><br><sub>Model A in the slicer: shell and back plate.</sub></p>

[Full-size slicer screenshot](slicer/modelA.png)

## Model B · desk, rev2

Model B puts the board on my desk. Its separate stand leans the screen back 15°. The USB-C cable comes in from the right and the case can lift out of the stand. Rev2 carries the same four-insert closure as Model A; the stand is a separate print.

<p align="center"><img src="model_B/rev2/images/isometric.png" alt="Model B isometric CAD view" width="680"><br><sub>Isometric front shell</sub></p>

<p align="center"><img src="model_B/rev2/images/front.png" alt="Model B front CAD view" width="450"><br><sub>Front</sub></p>
<p align="center"><img src="model_B/rev2/images/back.png" alt="Model B back CAD view" width="450"><br><sub>Back / inside of shell</sub></p>
<p align="center"><img src="model_B/rev2/images/top.png" alt="Model B top CAD view" width="450"><br><sub>Top</sub></p>
<p align="center"><img src="model_B/rev2/images/side.png" alt="Model B side CAD view" width="450"><br><sub>Side</sub></p>
<p align="center"><img src="model_B/rev2/images/back_plate.png" alt="Model B separate back plate CAD view" width="450"><br><sub>Separate back plate</sub></p>
<p align="center"><img src="model_B/rev2/images/stand.png" alt="Model B separate stand CAD view" width="450"><br><sub>15° desk stand</sub></p>

[FreeCAD model](model_B/rev2/Headway_desk_rev2.FCStd) · [STEP](model_B/rev2/Headway_desk_rev2.step) · [parts, print orientation and assembly](model_B/rev2/README_DESK_REV2.md)

<p align="center"><img src="../docs/assets/slicer-model-b.webp" alt="Model B shell, back plate and desk stand arranged on a slicer bed" width="680"><br><sub>Model B in the slicer: shell, back plate and separate stand.</sub></p>

[Full-size slicer screenshot](slicer/modelB.png)

## About the printed parts

Using heat-set threaded inserts was a first for me. I like being able to open the case again without cutting a fresh screw thread in the plastic each time. The source notes specify four M2.5 × 3 × 3.5 inserts, three M2.5 × 12 countersunk screws for the display posts and one M2.5 × 6 for the corner boss. The optional fit-test STL is intended to check the window before a full shell print. Print settings and insertion steps are in each model's README.

<p align="center"><img src="../docs/assets/print-warm.jpg" alt="Case parts on the printer bed" width="270"> <img src="../docs/assets/print-revisions.jpg" alt="Printed enclosure iterations arranged on a mat" width="270"> <img src="../docs/assets/assembly-parts.jpg" alt="Shell, display, ESP32-C3 and fasteners before assembly" width="270"><br><sub>Print in progress, iterations and parts laid out before assembly.</sub></p>

<p align="center"><img src="../docs/assets/thread-inserts.jpg" alt="Three brass threaded inserts visible in the printed front shell, beside the ESP32-C3, display and screws" width="600"><br><sub>Three of the front-shell inserts are visible in this assembly photo.</sub></p>

The CAD geometry has had script-level overlap checks, but the current enclosure revisions still need a complete physical fit, screw engagement and heat check. The image renderer is in [render_views.py](render_views.py), so the five-view sets can be recreated from the FreeCAD-exported STL files.
