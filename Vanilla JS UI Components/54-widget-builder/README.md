# Config-Driven Widget Builder

A flexible, extensible widget system that creates UI components from configuration objects.

## Features

- **Factory Pattern**: Register and create widgets dynamically
- **Config-Driven**: Define widget behavior through JSON configuration
- **Extensible**: Easy to add new widget types
- **Framework Agnostic**: Pure JavaScript, works anywhere
- **Client Integration**: Multiple integration patterns

## Built-in Widgets

### Poll Widget
```javascript
WidgetBuilder.create({
  type: 'poll',
  container: '#my-poll',
  config: {
    title: 'Favorite Language',
    options: ['JavaScript', 'Python', 'Java'],
    colors: ['#f39c12', '#3498db', '#e74c3c']
  }
});
```

### Counter Widget
```javascript
WidgetBuilder.create({
  type: 'counter',
  container: '#my-counter',
  config: {
    title: 'Click Counter',
    initial: 0,
    step: 5,
    color: '#9b59b6'
  }
});
```

### Progress Widget
```javascript
WidgetBuilder.create({
  type: 'progress',
  container: '#my-progress',
  config: {
    title: 'Task Progress',
    max: 100,
    color: '#2ecc71'
  }
});
```

## Client Integration

### 1. Script Tag Integration
```html
<script src="widget-builder.js"></script>
<div id="my-widget"></div>
<script>
  WidgetBuilder.create({
    type: 'poll',
    container: '#my-widget',
    config: { /* config */ }
  });
</script>
```

### 2. Data Attribute Integration
```html
<div data-widget="poll" data-config='{"title":"My Poll","options":["A","B"]}'></div>
<script src="widget-builder.js"></script>
```

### 3. API-Driven Integration
```javascript
fetch('/api/widget-config')
  .then(r => r.json())
  .then(config => WidgetBuilder.create(config));
```

### 4. Custom Widget Registration
```javascript
WidgetBuilder.register('custom', (container, config) => {
  container.innerHTML = `<div>Custom Widget</div>`;
  return { /* widget API */ };
});
```

## Architecture

- **WidgetBuilder**: Main factory class
- **Widget Registry**: Stores widget factories
- **Config System**: JSON-based configuration
- **Event System**: Built-in event handling
- **API Return**: Widgets return control APIs

## Benefits

- **Rapid Development**: Create widgets from config
- **Consistency**: Standardized widget interface
- **Maintainability**: Centralized widget logic
- **Flexibility**: Easy customization and extension
- **Integration**: Multiple deployment patterns