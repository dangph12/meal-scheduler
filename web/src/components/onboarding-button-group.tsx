import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface OnboardingButtonGroupProps {
  onBack: () => void;
  onNext: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isNextDisabled?: boolean;
}

export function OnboardingButtonGroup({
  onBack,
  onNext,
  isFirstStep = false,
  isLastStep = false,
  isNextDisabled = false
}: OnboardingButtonGroupProps) {
  return (
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4'>
      <Button
        type='button'
        variant='outline'
        onClick={onBack}
        disabled={isFirstStep}
        className={isFirstStep ? 'invisible' : ''}
      >
        <ChevronLeft className='w-4 h-4' />
        Quay lại
      </Button>

      <Button type='button' onClick={onNext} disabled={isNextDisabled}>
        {isLastStep ? 'Hoàn thành' : 'Tiếp theo'}
        {!isLastStep && <ChevronRight className='w-4 h-4' />}
      </Button>
    </div>
  );
}
