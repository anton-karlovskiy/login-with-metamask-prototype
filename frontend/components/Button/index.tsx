
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
        'w-72',
        'h-14',
        'bg-yellow-500',
        'hover:bg-opacity-90',
        className
      )}
      {...rest} />
  );
};

export default Button;
