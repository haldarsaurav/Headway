const themes = {
  O: { name: 'Original', description: 'The original navy sign keeps the layout that started the project.' },
  A: { name: 'Bahnsteig', description: 'Signal yellow and navy, with the next train given its own large block.' },
  B: { name: 'Amber Matrix', description: 'Warm amber dots borrow the feeling of an older electronic station board.' },
  C: { name: 'Papier', description: 'Ink on a light background makes the data feel like a printed timetable.' },
  F: { name: 'Split-Flap', description: 'Tile-like rows recall mechanical departure boards; changed characters flip on a refresh.' }
};
const pages = {
  '2_trains': { name: 'train departures', description: 'The next trains at Freising: line, destination, platform, revised departure and minutes to go. The footer plots reported lateness from the last three hours.' },
  '3_stadtbus': { name: 'Bahnhof Stadtbus', description: 'A dedicated board for local town buses at the station, including a bay when the feed supplies one.' },
  '4_pr': { name: 'P+R-Platz buses', description: 'A second bus board for the P+R-Platz stop. Long destinations can move sideways when scrolling is on.' },
  '5_weather': { name: 'current weather', description: 'The weather now, plus rain probability bars and an orange temperature line for the next twelve hours.' },
  '6_outlook': { name: 'three-day outlook', description: 'Highs, lows, feels-like readings, rain timing, wind, UV, sunrise, daylight change and moon phase.' },
  '8_setup': { name: 'device setup screen', description: 'The device screen guides you to the setup Wi-Fi and browser page; the portal controls are explained below.' }
};
let theme = 'O';
let page = '2_trains';
function setPressed(selector, active) {
  document.querySelectorAll(selector).forEach(button => {
    const selected = button.dataset[active] === (active === 'theme' ? theme : active === 'page' ? page : active === 'model' ? model : view);
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
function updatePreview() {
  const path = `previews_v1.2.6/${theme}_${page}.png`;
  const label = `${themes[theme].name} theme, ${pages[page].name}, sample data`;
  const image = document.getElementById('preview');
  image.src = path;
  image.alt = label;
  document.getElementById('preview-link').href = path;
  document.getElementById('preview-caption').textContent = `${themes[theme].name} · ${pages[page].name} · sample data`;
  document.getElementById('theme-description').textContent = themes[theme].description;
  document.getElementById('page-description').textContent = pages[page].description;
  setPressed('.theme-choice', 'theme');
  setPressed('.page-choice', 'page');
}
document.querySelectorAll('.theme-choice').forEach(button => button.addEventListener('click', () => { theme = button.dataset.theme; updatePreview(); }));
document.querySelectorAll('.page-choice').forEach(button => button.addEventListener('click', () => { page = button.dataset.page; updatePreview(); }));

const models = {
  A: { folder: 'model_A/rev9', source: 'Headway_enclosure_rev9.FCStd', readme: 'README_REV9.md', revision: 'Rev9', name: 'Model A · wall case', description: 'A slim case to mount near the morning routine. The current Rev9 uses four M2.5 heat-set inserts: three hold the display and help close the case, and a fourth secures the back plate\'s corner.' },
  B: { folder: 'model_B/rev2', source: 'Headway_desk_rev2.FCStd', readme: 'README_DESK_REV2.md', revision: 'rev2', name: 'Model B · desk case', description: 'The desk version uses the same four-insert closure and sits in a separate 15° stand. The case lifts out and the USB-C cable enters from the right.' }
};
let model = 'A';
let view = 'isometric';
function updateModel() {
  if (model === 'A' && view === 'stand') view = 'isometric';
  const info = models[model];
  const image = document.getElementById('model-image');
  image.src = `../enclosure/${info.folder}/images/${view}.png`;
  image.alt = `${view.replace('_', ' ')} CAD view of ${info.name}`;
  document.getElementById('model-caption').textContent = `${info.name} ${info.revision} · ${view.replace('_', ' ')} · rendered from its FreeCAD-exported STL`;
  document.getElementById('model-heading').textContent = info.name;
  document.getElementById('model-description').textContent = info.description;
  document.getElementById('model-cad').href = `../enclosure/${info.folder}/${info.source}`;
  document.getElementById('model-build').href = `https://github.com/haldarsaurav/Headway/blob/main/enclosure/${info.folder}/${info.readme}`;
  document.querySelector('[data-view="stand"]').hidden = model !== 'B';
  setPressed('.model-choice', 'model');
  setPressed('.view-choice', 'view');
}
document.querySelectorAll('.model-choice').forEach(button => button.addEventListener('click', () => { model = button.dataset.model; updateModel(); }));
document.querySelectorAll('.view-choice').forEach(button => button.addEventListener('click', () => { view = button.dataset.view; updateModel(); }));
