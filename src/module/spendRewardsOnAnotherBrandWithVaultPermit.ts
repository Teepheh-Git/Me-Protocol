import { BigNumber, ethers } from "ethers";
import { VaultPermitParams, usersServiceWithPermit } from "@developeruche/protocol-core";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";
import { relay } from "@developeruche/protocol-core";
import { sendTransactionData, spend_reward_magic } from "@developeruche/runtime-sdk";
import axios from "axios";
import { SpendRewardsOnAnotherBrandWithVaultPermitProps } from "../lib/types";
export async function spendRewardsOnAnotherBrandWithVaultPermitFN({
  email,
  magic,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
  rewardId,
  setError,
  meApiKey,
  reqURL,
  costPayerId,
  RUNTIME_URL,
  GELATO_API_KEY,
  debug,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
  CHAIN_ID,
  orderId,
}: SpendRewardsOnAnotherBrandWithVaultPermitProps) {
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
      const spendInfo = {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      };
      const {
        data: spend_reward_magic_data,
        from,
        hash,
        nonce,
        r,
        s,
        v,
      }: sendTransactionData = await spend_reward_magic(
        spendInfo.rewardAtHand,
        spendInfo.amountOfRewardAtHand as BigNumber,
        OPEN_REWARD_DIAMOND,
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

      setSpendingSteps(1);
      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data: spend_reward_magic_data,
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

      let vaultParams: VaultPermitParams = {
        owner: spendData?.data?.owner,
        count: spendData?.data?.count,
        globalHash: spendData?.data?.globalHash,
        prefixedHash: spendData?.data?.prefixedHash,
        r: spendData?.data?.sig?.r,
        s: spendData?.data?.sig?.s,
        v: spendData?.data?.sig?.v,
        reward: spendData?.data?.reward,
        spender: spendData?.data?.spender,
        value: spendData?.data?.value,
      };

      setSpendingSteps(2);

      try {
        const datum: any = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithVaultPermit(
          spendInfo,
          vaultParams,
          OPEN_REWARD_DIAMOND,
          JSON_RPC_URL
        );

        const relayInput = {
          from: loggedInUserInfo.publicAddress,
          data: datum.data,
          to: OPEN_REWARD_DIAMOND,
        };

        setSpendingSteps(3);

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
        return { taskId, spendData };
      } catch (error) {
        return { taskId: "0x0000000000000000000000000000000000000000000000000000000000000000", spendData };
      }
      // .then(async (res) => {
      //   const relayInput = {
      //     from: loggedInUserInfo.publicAddress,
      //     data: datum.data,
      //     to: OPEN_REWARD_DIAMOND,
      //   };

      //   setSpendingSteps(3);

      //   const { taskId }: { taskId: string } = await relay(relayInput, signer, meApiKey, reqURL, GELATO_API_KEY, costPayerId, debug);
      //   return { taskId, spendData };
      // })
      // .catch((err) => {
      //   if (err) return { taskId: "0x0000000000000000000000000000000000000000000000000000000000000000", spendData };
      // });
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
        const spendInfo = {
          rewardAtHand,
          targettedReward,
          amountOfRewardAtHand,
          expectedAmountOfTargetedReward,
        };
        const {
          data: spend_reward_magic_data,
          from,
          hash,
          nonce,
          r,
          s,
          v,
        }: sendTransactionData = await spend_reward_magic(
          spendInfo.rewardAtHand,
          spendInfo.amountOfRewardAtHand as BigNumber,
          OPEN_REWARD_DIAMOND,
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

        setSpendingSteps(1);

        const { data: spendData }: any = await axios.post(
          `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
          {
            params: {
              from,
              nonce,
              data: spend_reward_magic_data,
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

        let vaultParams: VaultPermitParams = {
          owner: spendData?.data?.owner,
          count: spendData?.data?.count,
          globalHash: spendData?.data?.globalHash,
          prefixedHash: spendData?.data?.prefixedHash,
          r: spendData?.data?.sig?.r,
          s: spendData?.data?.sig?.s,
          v: spendData?.data?.sig?.v,
          reward: spendData?.data?.reward,
          spender: spendData?.data?.spender,
          value: spendData?.data?.value,
        };

        setSpendingSteps(2);

        try {
          const datum: any = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithVaultPermit(
            spendInfo,
            vaultParams,
            OPEN_REWARD_DIAMOND,
            JSON_RPC_URL
          );

          const relayInput = {
            from: loggedInUserInfo.publicAddress,
            data: datum.data,
            to: OPEN_REWARD_DIAMOND,
          };

          setSpendingSteps(3);

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
          return { taskId, spendData };
        } catch (error) {
          return { taskId: "0x0000000000000000000000000000000000000000000000000000000000000000", spendData };
        }

        // const datum: any = await usersServiceWithPermit
        //   .spendRewardsOnAnotherBrandWithVaultPermit(spendInfo, vaultParams)
        //   .then(async (res) => {
        //     const relayInput = {
        //       from: loggedInUserInfo.publicAddress,
        //       data: datum.data,
        //       to: OPEN_REWARD_DIAMOND,
        //     };

        //     setSpendingSteps(3);

        //     const { taskId }: { taskId: string } = await relay(relayInput, signer, meApiKey, reqURL, GELATO_API_KEY, costPayerId, debug);
        //     return { taskId, spendData };
        //   })
        //   .catch((err) => {
        //     if (err) return { taskId: "0x0000000000000000000000000000000000000000000000000000000000000000", spendData };
        //   });
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

      setSpendLoading(true);
      const spendInfo = {
        rewardAtHand,
        targettedReward,
        amountOfRewardAtHand,
        expectedAmountOfTargetedReward,
      };
      const {
        data: spend_reward_magic_data,
        from,
        hash,
        nonce,
        r,
        s,
        v,
      }: sendTransactionData = await spend_reward_magic(
        spendInfo.rewardAtHand,
        spendInfo.amountOfRewardAtHand as BigNumber,
        OPEN_REWARD_DIAMOND,
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

      setSpendingSteps(1);
      const { data: spendData }: any = await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data: spend_reward_magic_data,
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

      let vaultParams: VaultPermitParams = {
        owner: spendData?.data?.owner,
        count: spendData?.data?.count,
        globalHash: spendData?.data?.globalHash,
        prefixedHash: spendData?.data?.prefixedHash,
        r: spendData?.data?.sig?.r,
        s: spendData?.data?.sig?.s,
        v: spendData?.data?.sig?.v,
        reward: spendData?.data?.reward,
        spender: spendData?.data?.spender,
        value: spendData?.data?.value,
      };

      setSpendingSteps(2);

      try {
        const datum: any = await usersServiceWithPermit.spendRewardsOnAnotherBrandWithVaultPermit(
          spendInfo,
          vaultParams,
          OPEN_REWARD_DIAMOND,
          JSON_RPC_URL
        );

        const relayInput = {
          from: loggedInUserInfo.publicAddress,
          data: datum.data,
          to: OPEN_REWARD_DIAMOND,
        };

        setSpendingSteps(3);

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
        return { taskId, spendData };
      } catch (error) {
        return { taskId: "0x0000000000000000000000000000000000000000000000000000000000000000", spendData };
      }

      // .then(async (res) => {
      //   const relayInput = {
      //     from: loggedInUserInfo.publicAddress,
      //     data: datum.data,
      //     to: OPEN_REWARD_DIAMOND,
      //   };

      //   setSpendingSteps(3);

      //   const { taskId }: { taskId: string } = await relay(relayInput, signer, meApiKey, reqURL, GELATO_API_KEY, costPayerId, debug);
      //   return { taskId, spendData };
      // })
      // .catch((err) => {
      //   if (err) return { taskId: "0x0000000000000000000000000000000000000000000000000000000000000000", spendData };
      // });
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
