import { ethers } from "ethers";
import { brandService } from "@developeruche/protocol-core";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";
import { relay } from "@developeruche/protocol-core";
import { PauseOpenRewardProps } from "../lib/types";
export async function pauseOpenRewardFN({
  email,
  magic,
  rewardAddress,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  GELATO_API_KEY,
  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
}: PauseOpenRewardProps) {
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

      const data = await brandService.pauseOpenRewards(rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);
      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: data.data,
        to: OPEN_REWARD_DIAMOND,
      };

      const { taskId }: { taskId: string } = await relay(
        relayInput,
        signer,
        meApiKey,
        reqURL,
        GELATO_API_KEY,
        JSON_RPC_URL,
        CHAIN_ID,
        OPEN_REWARD_DIAMOND,
        costPayerId,
        debug
      );

      return { taskId };
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

      const data = await brandService.pauseOpenRewards(rewardAddress, JSON_RPC_URL, OPEN_REWARD_DIAMOND);
      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: data.data,
        to: OPEN_REWARD_DIAMOND,
      };
      const { taskId }: { taskId: string } = await relay(
        relayInput,
        signer,
        meApiKey,
        reqURL,
        GELATO_API_KEY,
        JSON_RPC_URL,
        CHAIN_ID,
        OPEN_REWARD_DIAMOND,
        costPayerId,
        debug
      );

      return { taskId };
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
