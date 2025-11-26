class WidgetBuilder {
  static widgets = {};

  static register(type, factory) {
    this.widgets[type] = factory;
  }

  static create(options) {
    const { type, container, config = {} } = options;
    const factory = this.widgets[type];
    
    if (!factory) throw new Error(`Widget type "${type}" not found`);
    
    const element = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    return factory(element, config);
  }
}

// Poll Widget
WidgetBuilder.register('poll', (container, config) => {
  const { title = 'Poll', options = [], colors = ['#3498db', '#e74c3c', '#f39c12', '#9b59b6'] } = config;
  
  const votes = new Array(options.length).fill(0);
  let totalVotes = 0;

  container.innerHTML = `
    <div class="widget poll-widget">
      <h3>${title}</h3>
      <div class="total-votes">Total: <span>0</span></div>
      <div class="options">
        ${options.map((option, i) => `
          <div class="option" data-index="${i}">
            <button class="vote-btn">${option}</button>
            <div class="progress">
              <div class="bar" style="background: ${colors[i % colors.length]}"></div>
              <span class="percent">0%</span>
            </div>
            <span class="count">0 votes</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('vote-btn')) {
      const index = parseInt(e.target.closest('.option').dataset.index);
      votes[index]++;
      totalVotes++;
      updateUI();
    }
  });

  function updateUI() {
    container.querySelector('.total-votes span').textContent = totalVotes;
    container.querySelectorAll('.option').forEach((option, i) => {
      const percent = totalVotes > 0 ? (votes[i] / totalVotes * 100) : 0;
      option.querySelector('.bar').style.width = `${percent}%`;
      option.querySelector('.percent').textContent = `${Math.round(percent)}%`;
      option.querySelector('.count').textContent = `${votes[i]} vote${votes[i] !== 1 ? 's' : ''}`;
    });
  }

  return { votes, totalVotes };
});

// Counter Widget
WidgetBuilder.register('counter', (container, config) => {
  const { title = 'Counter', initial = 0, step = 1, color = '#3498db' } = config;
  let count = initial;

  container.innerHTML = `
    <div class="widget counter-widget">
      <h3>${title}</h3>
      <div class="counter-display" style="color: ${color}">${count}</div>
      <div class="counter-controls">
        <button class="btn-dec">-${step}</button>
        <button class="btn-reset">Reset</button>
        <button class="btn-inc">+${step}</button>
      </div>
    </div>
  `;

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-inc')) count += step;
    if (e.target.classList.contains('btn-dec')) count -= step;
    if (e.target.classList.contains('btn-reset')) count = initial;
    container.querySelector('.counter-display').textContent = count;
  });

  return { getValue: () => count, setValue: (val) => count = val };
});

// Progress Widget
WidgetBuilder.register('progress', (container, config) => {
  const { title = 'Progress', max = 100, color = '#2ecc71' } = config;
  let value = 0;

  container.innerHTML = `
    <div class="widget progress-widget">
      <h3>${title}</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="background: ${color}"></div>
        <span class="progress-text">0%</span>
      </div>
      <div class="progress-controls">
        <button class="btn-progress" data-value="25">25%</button>
        <button class="btn-progress" data-value="50">50%</button>
        <button class="btn-progress" data-value="75">75%</button>
        <button class="btn-progress" data-value="100">100%</button>
      </div>
    </div>
  `;

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-progress')) {
      value = parseInt(e.target.dataset.value);
      updateProgress();
    }
  });

  function updateProgress() {
    const percent = (value / max) * 100;
    container.querySelector('.progress-fill').style.width = `${percent}%`;
    container.querySelector('.progress-text').textContent = `${Math.round(percent)}%`;
  }

  return { setValue: (val) => { value = val; updateProgress(); } };
});

window.WidgetBuilder = WidgetBuilder;