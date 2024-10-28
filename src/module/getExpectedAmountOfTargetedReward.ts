import { ethers } from "ethers";
import { secretoryService } from "@developeruche/protocol-core";
import { GetExpectedAmountOfTargetedRewardProps } from "../lib/types";

export async function getExpectedAmountOfTargetedRewardFN({
  inputRewardAddress,
  outPutRewardAddress,
  amount,
  setLoading,
  returnAsFormatted,
  setError,
  JSON_RPC_URL,
  OPEN_REWARD_DIAMOND,
}: GetExpectedAmountOfTargetedRewardProps) {
  setLoading(true);

  try {
    const neededAmount = await secretoryService.getAmountIn(
      inputRewardAddress.trim(),
      outPutRewardAddress.trim(),
      ethers.utils.parseEther(amount.toString()),
      JSON_RPC_URL,
      OPEN_REWARD_DIAMOND
    );

    if (returnAsFormatted) {
      return ethers.utils.formatUnits(neededAmount, 18);
    } else {
      return neededAmount;
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
