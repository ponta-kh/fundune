# Project Development Guidelines

This document outlines the rules and conventions to be followed during the development of this component library.

## 1. 構成 (Structure & Configuration)

This section describes the main tools, libraries, and directory structure of the project.

### 1.1. Core Technologies & Tools

- **Package Manager**: npm
- **Language**: TypeScript
- **UI Framework**: React
- **Build Tool**: Vite
- **Component-driven Development**: Storybook
- **Unit Testing**: Vitest (planned)
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Base Component Library**: shadcn/ui

### 1.2. Directory Structure

- `src/components/common`: Contains the publicly exposed wrapper components that form the final component library.
- `src/components/shadcn`: Contains the base UI components from shadcn/ui. These should not be used directly outside of the `common` components.
- `src/stories`: Contains the Storybook stories for the components in `src/components/common`. The directory structure here mirrors the `common` directory.
- `src/lib`: Contains shared utilities, such as the `cn` function for merging class names.

## 2. 実装 (Implementation)

### 2.1. Component Architecture

The component architecture is based on wrapping `shadcn/ui` components to create a custom, reusable library.

- **Base Components**: The raw, unstyled components provided by `shadcn/ui` are located in `src/components/shadcn/`. These components **must not** be exported directly from the library or used directly in application code.
- **Wrapper Components**: The publicly exposed components of this library are located in `src/components/common/`.
- **Implementation Steps**:
    1. Each component in `src/components/common/` will act as a wrapper around a corresponding component from `src/components/shadcn/`.
    2. The wrapper's responsibility is to apply consistent styling, add application-specific logic, and define a clear, simplified API for the consumer.
    3. Customizations and styling should be applied via `className` and the `cn` utility from `src/lib/utils.ts`.

#### Example: `src/components/common/card.tsx`

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

// Define props for the wrapper component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  footerContent?: React.ReactNode;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  title,
  description,
  footerContent,
  children,
  className,
  ...props
}) => {
  return (
    <ShadcnCard className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </ShadcnCard>
  );
};

export { Card };
```

### 2.2. React Component Implementation

Adhere to the latest React implementation standards, primarily using functional components and Hooks.

- **Component Definition**: All components must be defined as functional components. Class components are not to be used.
- **Props Typing**: Use TypeScript interfaces for defining component props.
- **State Management**:
    - For simple, local state, use the `useState` Hook.
    - For more complex state logic, use the `useReducer` Hook.
    - To avoid prop drilling, use the `Context API`.
- **Side Effects**: Use the `useEffect` Hook for any side effects, such as data fetching or subscriptions.
- **Memoization**: To optimize performance, use `useCallback` for functions and `useMemo` for values.

## 3. テスト (Testing)

### 3.1. Storybook

Stories must be written in [Component Story Format 3 (CSF 3)](https://storybook.js.org/docs/react/writing-stories/introduction) to align with modern Storybook practices.

- **Directory Structure**: The directory structure for stories within `src/stories/` must mirror the component structure in `src/components/common/`. For example, the story for `src/components/common/form-item/input-field.tsx` must be located at `src/stories/form-item/input-field.stories.tsx`.
- **`meta` Object (Default Export)**: Each story file must have a default export containing the component's metadata.
    - `title`: Path-based naming convention that reflects the directory structure (e.g., `Common/Form/InputField`).
    - `component`: The component itself.
    - `tags: ['autodocs']`: Enable automatic documentation generation.
    - `argTypes`: Define controls for props to manipulate the component in the Storybook UI.
- **Story Objects (Named Exports)**: Each individual story should be a named export.
    - Use the `StoryObj<typeof meta>` type for type safety.
    - Define the component's state for a given story using the `args` property.

### 3.2. Unit Testing (Vitest)

*(Rules for unit testing with Vitest will be defined here.)*