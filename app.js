const official = 'https://www.sampson.k12.nc.us/o/uhs';
const arrow = () => Object.assign(document.createElement('span'), {className: 'arrow external'});
const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
const content = {
  students: ['For students', 'Your school day starts here', 'Find ClassLink, NCEDCloud, dining, tech help, and student records in the resource directory. The official school website connects you to each service.', 'Browse student resources', '#school-resources'],
  families: ['For families', 'Stay part of the conversation', 'Find Campus Parent Portal, enrollment information, school calendars, and policy resources. For questions about Union, call the school at 910-532-6300.', 'Browse family resources', '#school-resources'],
  community: ['For our community', 'Connect with Union', 'Find Union High School at 1189 Kader Merritt Road in Rose Hill, NC. Contact the school or visit the official website for current announcements and ways to stay connected.', 'School contact information', '#contact']
};
const tabs = [...document.querySelectorAll('[role=tab]')];
function activate(tab) {
  tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
  const [number, title, description, label, href] = content[tab.dataset.tab];
  const panel = document.querySelector('#experience-panel');
  panel.setAttribute('aria-labelledby', tab.id);
  panel.querySelector('.experience-number').textContent = number;
  panel.querySelector('h3').textContent = title;
  panel.querySelector('p').textContent = description;
  const link = panel.querySelector('a');
  link.href = href; link.removeAttribute('target'); link.removeAttribute('rel');
  const icon = arrow(); icon.classList.remove('external'); icon.setAttribute('aria-hidden', 'true');
  link.replaceChildren(document.createTextNode(label), icon);
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', e => {
    let index;
    if (e.key === 'ArrowRight') index = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') index = (i + tabs.length - 1) % tabs.length;
    if (e.key === 'Home') index = 0;
    if (e.key === 'End') index = tabs.length - 1;
    if (index !== undefined) { e.preventDefault(); activate(tabs[index]); tabs[index].focus(); }
  });
});
activate(tabs[0]);
// All shortcut illustrations share a single 24px line-icon treatment.
const paths = {
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
  book: '<path d="M12 5v16M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2Z"/>',
  people: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[el.dataset.icon]}</svg>`; });
const events = [...document.querySelectorAll('.event-list article')];
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  const filter = button.dataset.filter;
  let count = 0;
  events.forEach(event => {
    event.hidden = filter !== 'all' && event.querySelector(':scope > span').textContent.trim() !== filter;
    if (!event.hidden) count++;
  });
  document.querySelector('#event-status').textContent = filter === 'all' ? `Showing all ${count} events` : `Showing ${count} ${filter.toLowerCase()} event${count === 1 ? '' : 's'}`;
}));
const dialog = document.querySelector('#search-dialog');
const input = document.querySelector('#search-input');
const results = document.querySelector('#search-results');
const resources = [
  {name:'School calendar', keywords:'events dates schedule basketball pictures exams', href:'#events'},
  {name:'Student resources', keywords:'learning academics classes', href:'#school-resources'},
  {name:'Family connections', keywords:'parents', href:'#life'},
  {name:'School contact information', keywords:'phone address directions Rose Hill', href:'#contact'},
  {name:'School news', keywords:'JROTC Panthers policy job fair', href:'#updates'},
  ...[...document.querySelectorAll('.resource-grid a')].map(a => ({name:a.textContent.trim(), keywords:'school resource', href:a.getAttribute('href')}))
];
function search() {
  const words = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const found = resources.filter(({name, keywords}) => words.every(word => (name + ' ' + keywords).toLowerCase().includes(word)));
  results.replaceChildren();
  if (!found.length) { const p = document.createElement('p'); p.textContent = 'No matching resources. Try “ClassLink”, “calendar”, or “contact”.'; results.append(p); }
  found.forEach(({name, href}) => {
    const a = document.createElement('a'); a.href = href; a.textContent = name;
    const icon = arrow(); icon.setAttribute('aria-hidden','true');
    if (href.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener'; }
    else { icon.classList.remove('external'); a.addEventListener('click', () => { dialog.close(); const target = document.querySelector(href); target.tabIndex = -1; target.focus({preventScroll:true}); }); }
    a.append(icon); results.append(a);
  });
}
document.querySelector('.search-button').addEventListener('click', () => { dialog.showModal(); input.value = ''; search(); input.focus(); });
document.querySelector('#close-search').addEventListener('click', () => dialog.close());
input.addEventListener('input', search);
dialog.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); dialog.close(); } });
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
