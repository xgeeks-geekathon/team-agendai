import React from 'react';

import { useDictionary } from '@core/hooks/useDictionary';
import { useRouter } from '@core/hooks/useRouter';

import Step1Image from '@shared/assets/step1.png';
import Step2Image from '@shared/assets/step2.png';
import Step3Image from '@shared/assets/step3.png';
import { useMeCrud } from '@modules/Auth/hooks/useMeCrud';

export const useOnboardingStepContent = () => {
  const dictionary = useDictionary();
  const router = useRouter();

  const { updateMe } = useMeCrud();

  type OnboardingStepContent = Record<string, Partial<{
    leftText: string,
    rightText: string,
    nextButtonText: string,
    nextButtonClick: any,
    title: string,
    subtitle: string,
    image: string,
  }>>

  const stepContent: OnboardingStepContent = React.useMemo(() => ({
    '1': {
      leftText: dictionary.users.onboarding.stepContent[1].leftText,
      rightText: dictionary.users.onboarding.stepContent[1].rightText,
      nextButtonText: dictionary.users.onboarding.stepContent[1].nextButtonText,
      nextButtonClick: router.onboarding.step('2').go,
      title: dictionary.users.onboarding.stepContent[1].title,
      subtitle: dictionary.users.onboarding.stepContent[1].subtitle,
      image: Step1Image,
    },
    '2': {
      leftText: dictionary.users.onboarding.stepContent[2].leftText,
      rightText: dictionary.users.onboarding.stepContent[2].rightText,
      nextButtonText: dictionary.users.onboarding.stepContent[2].nextButtonText,
      nextButtonClick: router.onboarding.step('3').go,
      title: dictionary.users.onboarding.stepContent[2].title,
      subtitle: dictionary.users.onboarding.stepContent[2].subtitle,
      image: Step2Image,
    },
    '3': {
      leftText: dictionary.users.onboarding.stepContent[3].leftText,
      rightText: dictionary.users.onboarding.stepContent[3].rightText,
      nextButtonText: dictionary.users.onboarding.stepContent[3].nextButtonText,
      nextButtonClick: router.onboarding.step('4').go,
      title: dictionary.users.onboarding.stepContent[3].title,
      subtitle: dictionary.users.onboarding.stepContent[3].subtitle,
      image: Step3Image,
    },
    '4': {
      nextButtonText: dictionary.users.onboarding.stepContent[3].nextButtonText,
      nextButtonClick: async () => {
        await updateMe({
          onboarding: false,
        });
      },
    },
  }), [dictionary, router, updateMe]);
  return stepContent;
};
