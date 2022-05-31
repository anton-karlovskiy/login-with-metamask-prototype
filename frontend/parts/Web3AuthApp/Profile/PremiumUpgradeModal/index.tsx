
import clsx from 'clsx';

import OctavYellowContainedButton from 'components/buttons/OctavYellowContainedButton';
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
      <OctavModalInnerWrapper
        className={clsx(
          'max-w-lg',
          'space-y-4'
        )}>
        <OctavModalTitle
          className={clsx(
            'text-lg',
            'font-medium'
          )}>
          Hi
        </OctavModalTitle>
        <div>
          <p className='text-sm'>
            Icy Premium is the edge you&apos;re looking for. Get the latest alpha and never FOMO into a project again.
          </p>
        </div>
        <div>
          <OctavYellowContainedButton onClick={onClose}>
            Got it, thanks!
          </OctavYellowContainedButton>
        </div>
      </OctavModalInnerWrapper>
    </OctavModal>
  );
};

type Props = Omit<OctavModalProps, 'children'>;

export default PremiumUpgradeModal;
