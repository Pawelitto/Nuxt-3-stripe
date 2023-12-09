export const useRedirectIfAuth = (url = '/') =>{
  const user = useSupabaseUser();
  
    watch(
      user,
      (user) => {
        if (user) {
          return navigateTo(url)
        }
      },
      { immediate: true }
    );
  }