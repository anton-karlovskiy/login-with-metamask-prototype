
import clsx from 'clsx';

// MEMO: inspired by https://mui.com/customization/dark-mode/#dark-mode-with-custom-palette
const DISABLED_BACKGROUND_CLASSES = clsx(
  'bg-black',
  'bg-opacity-10',
  'dark:bg-white',
  'dark:bg-opacity-10'
);
const DISABLED_TEXT_CLASSES = clsx(
  'text-black',
  'text-opacity-25',
  'dark:text-white',
  'dark:text-opacity-30'
);

const TEXT_CLASSES = clsx(
  'text-black',
  'text-opacity-90',
  'dark:text-white'
);

export {
  DISABLED_BACKGROUND_CLASSES,
  DISABLED_TEXT_CLASSES,
  TEXT_CLASSES
};
