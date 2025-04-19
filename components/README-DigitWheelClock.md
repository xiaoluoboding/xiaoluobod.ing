# Digit Wheel Clock Component

A modern and stylish digital clock component for React applications with smooth digit transitions, built using React, TypeScript, and TailwindCSS.

## Features

- Smooth digit transitions with vertical rolling animation
- Blinking colon separator
- Light and dark theme support
- Customizable colors and sizes
- Fully responsive design
- Built with TypeScript for type safety

## Preview

Visit `/digit-wheel-clock` to see a live demo of the component.

## Installation

No additional installation steps are required as the component uses React and TailwindCSS which are already part of the project.

## Usage

```tsx
import DigitWheelClock from '@/components/DigitWheelClock';

// Basic usage
<DigitWheelClock />

// With theme
<DigitWheelClock theme="light" />

// With custom class
<DigitWheelClock className="my-custom-class" />

// With both theme and custom class
<DigitWheelClock theme="light" className="my-custom-class" />
```

## Props

The `DigitWheelClock` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'dark' \| 'light'` | `'dark'` | The theme of the clock |
| `className` | `string` | `''` | Additional CSS classes to apply to the clock container |

## How It Works

The component is composed of three main parts:

1. `DigitWheelClock`: The main component that renders the clock and manages the current time.
2. `TimeDisplay`: A subcomponent that formats the time and renders the digit wheels and colons.
3. `DigitWheel`: A subcomponent that renders a single rolling digit with animation.

The clock updates every second using a `setInterval` in a `useEffect` hook. Each digit is displayed in a separate `DigitWheel` component, which uses CSS transforms to animate the transition between numbers.

## Customization

The clock's appearance can be customized in several ways:

- Use the `theme` prop to switch between dark and light themes
- Use the `className` prop to add custom CSS classes to the clock container
- Modify the component code to change the colors, sizes, or animations

## License

This component is part of the main project and is covered by the project's license. 