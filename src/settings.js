export const settings = {
  name: 'Fitness',
  logo: '',
  loginCoverImage: '',
  primaryColor: '#009d33',
  secondaryColor: '#101828',
  backendURL: process.env.NEXT_PUBLIC_BACKEND_URL,
};

export const permissions = [
  {
    pathname: '/settings',
    userRole: ['superadmin', 'admin'],
  },
  {
    pathname: '/dashboard',
    userRole: ['superadmin', 'admin', 'user'],
  },
  {
    pathname: '/clients',
    userRole: ['superadmin', 'admin', 'user'],
  },
  {
    pathname: '/instructors',
    userRole: ['superadmin', 'admin', 'user'],
  },
];
