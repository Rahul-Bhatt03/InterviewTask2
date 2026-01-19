export const generateMockToken = (email: string) => {
  const token = btoa(JSON.stringify({
    email,
    exp: Date.now() + (1000 * 60 * 60 * 24),
  }));
  return token;
};
