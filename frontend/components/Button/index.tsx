
import clsx from 'clsx';

const Button = ({
  className,
  ...rest
}: React.ComponentPropsWithRef<'button'>) => {
  return (
    <button
      className={clsx(
        'text-white',
        'text-base',
        'w-36',
        'min-w-max',
        'h-10',
        'bg-yellow-500',
        'hover:bg-opacity-90',
        'rounded-lg',
        'px-4',
        'py-2',
        className
      )}
      {...rest} />
  );
};

export default Button;
