export const getAuthCookie = () => {
  const authCookie = document.cookie;
  return authCookie?.split('=')?.join(' ');
}
