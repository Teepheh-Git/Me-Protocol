export async function logOutFn(magic: any, clearCache?: boolean) {
  try {
    return await magic.user.logout();
  } catch (error) {
    throw error;
  }
}
