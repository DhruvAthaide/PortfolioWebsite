export interface Resume {
  id: 'mobile' | 'appsec';
  label: string;
  focus: string;
  href: string;
}

// Both CVs live in public/documents. The legacy /documents/DhruvAthaide_CV.pdf
// URL is redirected to the mobile CV in vercel.json so old shared links keep working.
export const resumes: Resume[] = [
  {
    id: 'mobile',
    label: 'Mobile engineering',
    focus: 'Android, Flutter and mobile security',
    href: '/documents/DhruvAthaide_CV_Mobile_Engineer.pdf',
  },
  {
    id: 'appsec',
    label: 'Application security',
    focus: 'AppSec, VAPT and threat modeling',
    href: '/documents/DhruvAthaide_CV_Application_Security.pdf',
  },
];
