# My Component Library

This is a reusable React component library built with Vite, TypeScript, and styled with Tailwind CSS. It includes a set of common components, form elements, and UI components based on shadcn/ui.

## Installation

Install the package from npm:

```bash
npm install my-component
```

**Note:** The package name `my-component` is a placeholder. Please change it to a unique name before publishing.

## Usage

You can import components in two ways:

### 1. Sub-path Imports (Recommended)

For better performance and code-splitting, import components from their specific groups. This is the recommended approach.

```jsx
import { InputField, CheckboxField } from 'my-component/form';
import { Button, Dialog } from 'my-component/shadcn';

function MyOptimizedPage() {
  return (
    <form>
      <InputField label="Email" />
      <CheckboxField label="I agree to the terms" />
      <Button>Subscribe</Button>
    </form>
  );
}
```

### 2. Main Import (for common components)

You can also import components like `Card` and `Table` from the main entry point.

```jsx
import { Card, Table, Button } from 'my-component'; // Button can also be imported from here

function MyPage() {
  return (
    <Card>
      <p>This is a card.</p>
      <Button>Click Me</Button>
    </Card>
  );
}
```

## Styling Setup (Important!)

This library uses Tailwind CSS. To ensure components are styled correctly, you **must** configure your project's `tailwind.config.js` to scan this library's files for CSS classes.

Add the following path to the `content` array in your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  content: [
    // Your project's files
    "./src/**/*.{js,ts,jsx,tsx}",

    // Add this line
    "./node_modules/my-component/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Without this step, all components will appear unstyled.

## Available Component Groups

Components are organized into the following groups for import:

- **`my-component`**: The main entry point, which exports all components. Best used for common components like `Card` and `Table`.
- **`my-component/form`**: Includes all form-related components like `InputField`, `CheckboxField`, `SelectField`, etc.
- **`my-component/shadcn`**: Includes UI components from the shadcn collection, such as `Button`, `Dialog`, `Calendar`, etc.