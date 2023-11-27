import { ethers } from "ethers";
import { magic } from "../lib/magic";
import { createWeb3 } from "../lib/web3";
import {
  OPEN_REWARD_DIAMOND,
  TREASURY,
  brandService,
  defaultProvider,
  relay,
} from "@developeruche/protocol-core";
import { AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps } from "../lib/types";
import axios from "axios";

export async function addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolFN({
  email,
  reward,
  rewardAmount,
  meAmount,
  setLoading,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  persist,
}: AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps) {
  setLoading(true);

  try {
    const magicWeb3 = await createWeb3(magic);

    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
      let isConnected = magicWeb3;
      while (!isConnected) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
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

      const { data: GTP }: any = await axios.post(
        `${reqURL}/reward/get-treasury-permit`,
        {
          // token: TREASURY,
          spender: OPEN_REWARD_DIAMOND,
          value: meAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
      console.log(GTP, "FROM TREASUREY PERMIT REQ");

      const data =
        await brandService.addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool(
          reward,
          ethers.utils.parseEther(rewardAmount),
          ethers.utils.parseEther(meAmount),
          Number(GTP?.data?.v),
          GTP?.data?.r,
          GTP?.data?.s
        );

      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: data.data,
        to: OPEN_REWARD_DIAMOND,
      };
      // const wallet = new ethers.Wallet(
      //   "5393eb89457505dc0cea935ef8f3e09b03ecc283234fff38fdf6c8a8d0ccf35a",
      //   defaultProvider
      // );
      // const hash = await wallet.sendTransaction({
      //   to: OPEN_REWARD_DIAMOND,
      //   data: relayInput.data + "b6933fa10F5179FA2de6C8B1D0C5B0A9A5B87327",
      // });

      // 0xb6933fa10F5179FA2de6C8B1D0C5B0A9A5B87327;

      const { taskId }: { taskId: string } = await relay(
        relayInput,
        signer,
        meApiKey,
        reqURL,
        costPayerId
      );

      return { taskId };
    } else {
      let isConnected = magicWeb3;
      while (!isConnected) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
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

      const { data: GTP }: any = await axios.post(
        `${reqURL}/reward/get-treasury-permit`,
        {
          // token: TREASURY,
          spender: OPEN_REWARD_DIAMOND,
          value: meAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
      console.log(GTP, "FROM TREASUREY PERMIT REQ");

      const data =
        await brandService.addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool(
          reward,
          ethers.utils.parseEther(rewardAmount),
          ethers.utils.parseEther(meAmount),
          Number(GTP?.data?.v),
          GTP?.data?.r,
          GTP?.data?.s
        );

      const relayInput = {
        from: loggedInUserInfo.publicAddress,
        data: data.data,
        to: OPEN_REWARD_DIAMOND,
      };
      // const wallet = new ethers.Wallet(
      //   "5393eb89457505dc0cea935ef8f3e09b03ecc283234fff38fdf6c8a8d0ccf35a",
      //   defaultProvider
      // );
      // const hash = await wallet.sendTransaction({
      //   to: OPEN_REWARD_DIAMOND,
      //   data: relayInput.data + "b6933fa10F5179FA2de6C8B1D0C5B0A9A5B87327",
      // });

      // 0xb6933fa10F5179FA2de6C8B1D0C5B0A9A5B87327
      // 0xb6933fa10F5179FA2de6C8B1D0C5B0A9A5B87327;

      // 0xb6933fa10F5179FA2de6C8B1D0C5B0A9A5B87327;

      const { taskId }: { taskId: string } = await relay(
        relayInput,
        signer,
        meApiKey,
        reqURL,
        costPayerId
      );

      return { taskId };
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