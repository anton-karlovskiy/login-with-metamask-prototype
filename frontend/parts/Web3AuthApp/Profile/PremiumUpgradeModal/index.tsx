
// ray test touch <
import clsx from 'clsx';

import OctavModal, {
  OctavModalTitle,
  OctavModalInnerWrapper,
  OctavModalProps
} from 'components/UI/OctavModal';

const PremiumUpgradeModal = ({
  open,
  onClose
}: Props) => {
  return (
    <OctavModal
      open={open}
      onClose={onClose}>
      <OctavModalInnerWrapper className='max-w-lg'>
        <OctavModalTitle
          className={clsx(
            'text-lg',
            'font-medium',
            'mb-6'
          )}>
          Payment successful
        </OctavModalTitle>
        <div className='mt-2'>
          <p
            className={clsx(
              'text-sm',
              'text-gray-500'
            )}>
            Your payment has been successfully submitted. We’ve sent your
            an email with all of the details of your order.
          </p>
        </div>
        <div className='mt-4'>
          <button
            type='button'
            className={clsx(
              'inline-flex',
              'justify-center',
              'px-4',
              'py-2',
              'text-sm',
              'font-medium',
              'text-blue-900',
              'bg-blue-100',
              'border',
              'border-transparent',
              'rounded-md',
              'hover:bg-blue-200',
              'focus:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-offset-2',
              'focus-visible:ring-blue-500'
            )}
            onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </OctavModalInnerWrapper>
    </OctavModal>
  );
};

type Props = Omit<OctavModalProps, 'children'>;

export default PremiumUpgradeModal;
// ray test touch >
