import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";
import { same_brand_reward_redeption_magic, sendTransactionData } from "@developeruche/runtime-sdk";
import axios from "axios";
import { spendRewardsOnIssuingBrandWithVaultPermitProps } from "../lib/types";
export async function spendRewardsOnIssuingBrandWithVaultPermitFN({
  email,
  magic,
  reward_amount,
  reward_address,
  rewardId,
  setError,
  reqURL,
  meApiKey,
  costPayerId,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  RUNTIME_URL,
  orderId,
}: spendRewardsOnIssuingBrandWithVaultPermitProps) {
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
      //=============================================== DO THE REST HERE==========================================================
      setSpendLoading(true);
      setSpendingSteps(1);

      const { data, from, hash, nonce, r, s, v }: sendTransactionData = await same_brand_reward_redeption_magic(
        reward_address,
        reward_amount,
        signer,
        RUNTIME_URL
      );

      const { data: couponData } = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/order/coupon`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
      // console.log(data, from, hash, nonce, r, s, v, "from rsv");
      setSpendingSteps(2);

      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data,
            r,
            s,
            v,
            hash,
          },
          rewardId,
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
      setSpendingSteps(3);

      return { taskId: hash };
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
        //=============================================== DO THE REST HERE==========================================================
        setSpendLoading(true);
        setSpendingSteps(1);

        const { data, from, hash, nonce, r, s, v }: sendTransactionData = await same_brand_reward_redeption_magic(
          reward_address,
          reward_amount,
          signer,
          RUNTIME_URL
        );

        const { data: couponData } = await axios.post(
          `${reqURL.replace("/cost/request/in-app", "")}/order/coupon`,
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${meApiKey}`,
            },
          }
        );
        // console.log(data, from, hash, nonce, r, s, v, "from rsv");
        setSpendingSteps(2);

        const { data: spendData }: any = await axios.post(
          `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
          {
            params: {
              from,
              nonce,
              data,
              r,
              s,
              v,
              hash,
            },
            rewardId,
          },
          {
            headers: {
              Authorization: `Bearer ${meApiKey}`,
            },
          }
        );
        setSpendingSteps(3);

        return { taskId: hash };
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

      //=================================================== DO THE REST HERE=====================================================
      setSpendLoading(true);
      setSpendingSteps(1);

      const { data, from, hash, nonce, r, s, v }: sendTransactionData = await same_brand_reward_redeption_magic(
        reward_address,
        reward_amount,
        signer,
        RUNTIME_URL
      );

      const { data: couponData } = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/order/coupon`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
      // console.log(data, from, hash, nonce, r, s, v, "from rsv");
      setSpendingSteps(2);

      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data,
            r,
            s,
            v,
            hash,
          },
          rewardId,
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
      setSpendingSteps(3);

      return { taskId: hash };
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
    setSpendLoading(false);
    setSpendingSteps(0);
    magic.user.logout();
  }
}
