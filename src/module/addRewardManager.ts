import { ethers } from "ethers";
import { createWeb3 } from "../lib/web3";
import { delay } from "../helpers/delay";
import { sendTransactionData, add_reward_manager_magic } from "@developeruche/runtime-sdk";
import axios from "axios";
import { AddRewardMagicProps } from "../lib/types";
export async function addRewardManagerFN({
  email,
  magic,
  setLoading,
  setSpendLoading,
  setSpendingSteps,
  brand_id,
  // reward_address,
  reward_manager,
  role_id,
  setError,
  meApiKey,
  reqURL,
  persist,
  RUNTIME_URL,
}: AddRewardMagicProps) {
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
        return "no accounts found";
      }
      const userAccount = accounts[0];
      // console.log(userAccount, "user account is this");
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);

      //=============================================== DO THE REST HERE==========================================================
      setSpendLoading(true);
      const {
        data: add_reward_magic_data,
        from,
        hash,
        nonce,
        r,
        s,
        v,
      }: sendTransactionData = await add_reward_manager_magic(
        brand_id,
        // reward_address,
        reward_manager,
        role_id,
        signer,
        RUNTIME_URL
      );

      return await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data: add_reward_magic_data,
            r,
            s,
            v,
            hash,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
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
          return "no accounts found";
        }
        const userAccount = accounts[0];
        // console.log(userAccount, "user account is this");
        const provider = await magic.wallet.getProvider();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner(userAccount);

        //=============================================== DO THE REST HERE==========================================================
        setSpendLoading(true);
        const {
          data: add_reward_magic_data,
          from,
          hash,
          nonce,
          r,
          s,
          v,
        }: sendTransactionData = await add_reward_manager_magic(
          brand_id,
          // reward_address,
          reward_manager,
          role_id,
          signer,
          RUNTIME_URL
        );

        return await axios.post(
          `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
          {
            params: {
              from,
              nonce,
              data: add_reward_magic_data,
              r,
              s,
              v,
              hash,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${meApiKey}`,
            },
          }
        );
      }
      const accounts = await magicWeb3.eth.getAccounts();
      if (accounts.length === 0) {
        return "no accounts found";
      }
      const userAccount = accounts[0];
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(userAccount);

      setSpendLoading(true);
      const {
        data: add_reward_magic_data,
        from,
        hash,
        nonce,
        r,
        s,
        v,
      }: sendTransactionData = await add_reward_manager_magic(
        brand_id,
        // reward_address,
        reward_manager,
        role_id,
        signer,
        RUNTIME_URL
      );

      return await axios.post(
        `${reqURL.replace("/cost/request/in-app", "")}/reward/push-transaction`,
        {
          params: {
            from,
            nonce,
            data: add_reward_magic_data,
            r,
            s,
            v,
            hash,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${meApiKey}`,
          },
        }
      );
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
    setSpendLoading(false);
    setSpendingSteps(0);
    if (!persist) {
      magic.user.logout();
    }
  }
}
