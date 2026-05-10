var selected = ['hero', 'tech-stack', 'work-history', 'portfolio', 'credentials', 'contact'];

function renderPills() {
  var pillsEl = document.getElementById('activePills');
  pillsEl.innerHTML = selected.map(function (id) {
    return '<span class="active-pill">#' + id + '<span class="rm" onclick="removePill(\'' + id + '\')">&#215;</span></span>';
  }).join('');
  document.getElementById('countBadge').textContent = selected.length;
}

function applyVisibility() {
  var blocks = document.querySelectorAll('[data-section]');
  var empty = document.getElementById('emptyState'); // can be null

  blocks.forEach(function (b) {
    if (selected.indexOf(b.dataset.section) !== -1) {
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });

  if (empty) empty.style.display = selected.length === 0 ? 'block' : 'none';
  renderPills();
}

function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('open');
  document.getElementById('triggerBtn').classList.toggle('open');
}

document.addEventListener('click', function (e) {
  var wrap = document.querySelector('.filter-wrap');
  if (!wrap.contains(e.target)) {
    document.getElementById('dropdown').classList.remove('open');
    document.getElementById('triggerBtn').classList.remove('open');
  }
});

function toggleItem(el) {
  var id = el.dataset.id;
  el.classList.toggle('active');
  if (el.classList.contains('active')) {
    if (selected.indexOf(id) === -1) selected.push(id);
  } else {
    selected = selected.filter(function (s) { return s !== id; });
  }
  applyVisibility();
}

function selectAll() {
  selected = [];
  document.querySelectorAll('.drop-item').forEach(function (i) {
    i.classList.add('active');
    selected.push(i.dataset.id);
  });
  applyVisibility();
}

function clearAll() {
  selected = [];
  document.querySelectorAll('.drop-item').forEach(function (i) { i.classList.remove('active'); });
  applyVisibility();
  document.getElementById('dropdown').classList.remove('open');
  document.getElementById('triggerBtn').classList.remove('open');
}

function applyFilter() {
  applyVisibility();
  document.getElementById('dropdown').classList.remove('open');
  document.getElementById('triggerBtn').classList.remove('open');
}

function removePill(id) {
  selected = selected.filter(function (s) { return s !== id; });
  var item = document.querySelector('.drop-item[data-id="' + id + '"]');
  if (item) item.classList.remove('active');
  applyVisibility();
}

applyVisibility();

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.shiftKey && e.key === 'J') ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
  }
});