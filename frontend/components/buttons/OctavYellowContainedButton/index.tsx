
import * as React from 'react';
import clsx from 'clsx';

import OctavButtonBase, { Props as OctavButtonBaseProps } from 'components/UI/OctavButtonBase';
import {
  DISABLED_BACKGROUND_CLASSES,
  DISABLED_TEXT_CLASSES,
  TEXT_CLASSES
} from 'utils/constants/styles';
import SpinIcon from 'assets/images/icons/spin.svg';

interface CustomProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  pending?: boolean;
}

type Ref = HTMLButtonElement;
const OctavYellowContainedButton = React.forwardRef<Ref, Props>(({
  className,
  children,
  startIcon,
  endIcon,
  disabled = false,
  pending = false,
  ...rest
}, ref): JSX.Element => {
  const disabledOrPending = disabled || pending;

  return (
    <OctavButtonBase
      ref={ref}
      type='button'
      className={clsx(
        'focus:outline-none',
        'focus:ring',
        'focus:border-yellow-300',
        'focus:ring-yellow-200',
        'focus:ring-opacity-50',

        'border',
        'border-transparent',
        'font-medium',

        disabledOrPending ? clsx(
          DISABLED_BACKGROUND_CLASSES,
          DISABLED_TEXT_CLASSES
        ) : clsx(
          TEXT_CLASSES,
          'dark:!text-black', // Suppressing white text color in this specific edge case
          'bg-yellow-500',
          'hover:bg-yellow-600'
        ),

        'rounded',
        'px-4',
        'py-2',
        'text-sm',
        'space-x-1',
        'justify-center',
        className
      )}
      disabled={disabledOrPending}
      {...rest}>
      {pending && (
        <SpinIcon
          className={clsx(
            'animate-spin',
            'w-4',
            'h-4',
            'mr-3'
          )} />
      )}
      {startIcon}
      <span>
        {children}
      </span>
      {endIcon}
    </OctavButtonBase>
  );
});
OctavYellowContainedButton.displayName = 'OctavYellowContainedButton';

export type Props = CustomProps & OctavButtonBaseProps;

export default OctavYellowContainedButton;
