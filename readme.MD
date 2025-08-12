# @ioak/powerui

A versatile UI component library with built-in support for both dark and light modes. Users can easily customize components globally or locally, following a lightweight CSS framework aligned with HTML standards. It also provides multiple themes and a user-friendly color scheme generator.

## Usage

Install the package and include the built CSS once in your app root:

```tsx
import '@ioak/powerui/styles.css';
import { Button } from '@ioak/powerui';

export function App() {
  return <Button>Click me</Button>;
}
```

## Development

- `npm run dev` - start Storybook
- `npm run build` - build library and CSS to `dist/`
- `npm run package` - create a distributable `.tgz` via `npm pack`

## Releasing

1. Bump version in `package.json`
2. `npm run package` → publish or share the generated `.tgz`
