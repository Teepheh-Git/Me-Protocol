import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";
import { OnBoardRewardsProps } from "../lib/types";
import { onboard_reward_magic } from "@developeruche/runtime-sdk";

export async function onBoardRewardsFN({ email, magic, brand_id, reward_address, setLoading, setError, persist, RUNTIME_URL }: OnBoardRewardsProps) {
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
        return { taskId: "no accounts found" };
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      // ============================================FROM HERE=====================================================================

      return await onboard_reward_magic(brand_id, reward_address, ethers.utils.parseEther("1000"), ethers.utils.parseEther("1"), signer, RUNTIME_URL);
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
          return { taskId: "no accounts found" };
        }
        const userAccount = accounts[0];
        // console.log(userAccount, "user account is this");
        const provider = await magic.wallet.getProvider();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner(userAccount);
        const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

        // ============================================FROM HERE=====================================================================

        return await onboard_reward_magic(
          brand_id,
          reward_address,
          ethers.utils.parseEther("1000"),
          ethers.utils.parseEther("1"),
          signer,
          RUNTIME_URL
        );
      }
      const accounts = await magicWeb3.eth.getAccounts();
      //if the user accounts is not found - update it on the console
      if (accounts.length === 0) {
        return { taskId: "no accounts found" };
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);

      // ============================================FROM HERE=====================================================================

      return await onboard_reward_magic(brand_id, reward_address, ethers.utils.parseEther("1000"), ethers.utils.parseEther("1"), signer, RUNTIME_URL);
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
