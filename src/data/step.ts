import { GetYourResumeStep } from '@/types/data';

export const getYourResume: GetYourResumeStep[] = [
  {
    stepNo: 1,
    title: 'Select your Design Template',
    image: '/images/step1.svg',
    desc: 'Select your design template from our collection of templates',
  },
  {
    stepNo: 2,
    title: 'Fill in your details',
    image: '/images/step2.svg',
    desc: 'Fill in your details in the form provided on the website',
  },

  {
    stepNo: 3,
    title: 'Download your Resume',
    image: '/images/step3.svg',
    desc: 'Download your resume in PDF format and start applying for jobs',
  },
];
