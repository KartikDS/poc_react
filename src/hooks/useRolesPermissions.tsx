import { useCallback } from 'react';

import { permissions } from '@/settings';

interface USERDATA {
  path: string;
  userRole: string;
}
function useRolesPermissions() {
  const isUserValid = useCallback((userData: USERDATA) => {
    const allowed = permissions.some(
      pm => userData.path.includes(pm.pathname) && pm.userRole.includes(userData.userRole),
    );
    return allowed;
  }, []);
  // Permissions Checking
  // Return True/false
  return {
    isUserValid,
  };
}

export default useRolesPermissions;
