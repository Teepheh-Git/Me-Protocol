import { SetUpWalletProps } from "../lib/types";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";

export async function setUpWalletFN({ email, magic, setLoading, setError, persist }: SetUpWalletProps) {
  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
      let isConnected = magicWeb3;
      while (!isConnected) {
        await delay(1000); // Wait for 1 second
        isConnected = magicWeb3;
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return { publicAddress: "no accounts found" };
      }
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      return { publicAddress: loggedInUserInfo.publicAddress };
    } else {
      let isConnected = magicWeb3;
      while (!isConnected) {
        await delay(1000); // Wait for 1 second
        isConnected = magicWeb3;
      }

      const { email: connectedEmail } = await magic.user.getInfo();
      //IF THE PERSISTED USER INFO IS NOT THE INFO OF THE USER TRYING TO PERFORM THE FUNCTION logout and try to login again
      if (email !== connectedEmail) {
        await magic.user.logout();
        await magic.auth.loginWithEmailOTP({ email });
        let isConnected = magicWeb3;
        while (!isConnected) {
          await delay(1000); // Wait for 1 second
          isConnected = magicWeb3;
        }
        const accounts = await magicWeb3.eth.getAccounts();
        //if the user accounts is not found - update it on the console
        if (accounts.length === 0) {
          return { publicAddress: "no accounts found" };
        }
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

        return { publicAddress: loggedInUserInfo.publicAddress };
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return { publicAddress: "no accounts found" };
      }

      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      return { publicAddress: loggedInUserInfo.publicAddress };
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
    if (!persist) {
      magic.user.logout();
    }
  }
}
