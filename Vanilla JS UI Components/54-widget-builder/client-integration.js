// Client Integration Examples

// 1. Basic Widget Creation
function createBasicWidget() {
  WidgetBuilder.create({
    type: 'poll',
    container: '#widget-container',
    config: {
      title: 'Quick Poll',
      options: ['Option A', 'Option B']
    }
  });
}

// 2. Dynamic Widget Creation from API
async function createWidgetFromAPI() {
  const response = await fetch('/api/widget-config');
  const config = await response.json();
  
  WidgetBuilder.create({
    type: config.type,
    container: config.container,
    config: config.settings
  });
}

// 3. Multiple Widgets Dashboard
function createDashboard(widgets) {
  widgets.forEach((widget, index) => {
    const container = document.createElement('div');
    container.id = `widget-${index}`;
    document.body.appendChild(container);
    
    WidgetBuilder.create({
      type: widget.type,
      container: container,
      config: widget.config
    });
  });
}

// 4. Widget with Event Callbacks
function createWidgetWithCallbacks() {
  const widget = WidgetBuilder.create({
    type: 'counter',
    container: '#counter',
    config: {
      title: 'Analytics Counter',
      initial: 0,
      step: 1
    }
  });
  
  // Custom event handling
  document.querySelector('#counter').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-inc')) {
      console.log('Counter incremented:', widget.getValue());
      // Send analytics event
    }
  });
}

// 5. Custom Widget Registration
WidgetBuilder.register('chart', (container, config) => {
  const { title = 'Chart', data = [], type = 'bar' } = config;
  
  container.innerHTML = `
    <div class="widget chart-widget">
      <h3>${title}</h3>
      <div class="chart-container">
        ${data.map(item => `
          <div class="chart-bar" style="height: ${item.value}%">
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  return { updateData: (newData) => console.log('Update chart:', newData) };
});

// 6. Embed Script for External Sites
(function() {
  const script = document.createElement('script');
  script.src = 'https://your-domain.com/widget-builder.js';
  script.onload = function() {
    // Auto-initialize widgets from data attributes
    document.querySelectorAll('[data-widget]').forEach(el => {
      const config = JSON.parse(el.dataset.config || '{}');
      WidgetBuilder.create({
        type: el.dataset.widget,
        container: el,
        config: config
      });
    });
  };
  document.head.appendChild(script);
})();

// Usage Examples:
// <div data-widget="poll" data-config='{"title":"My Poll","options":["A","B"]}'></div>
// <div data-widget="counter" data-config='{"initial":10,"step":5}'></div>