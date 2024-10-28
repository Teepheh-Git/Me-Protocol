import { brandService } from "@developeruche/protocol-core";
import { BrandDetailsProps, GetBrandDetailsProps } from "../lib/types";
export async function getBrandDetailsFN({
  email,
  magic,
  getOnlyId = false,
  setLoading,
  setError,
  OPEN_REWARD_DIAMOND,
  JSON_RPC_URL,
}: GetBrandDetailsProps): Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined> {
  setLoading(true);
  try {
    if (!(await magic.user.isLoggedIn())) {
      await magic.auth.loginWithEmailOTP({ email });
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
      const brandDetails: BrandDetailsProps = await brandService.getBrandConfigByAddress(
        loggedInUserInfo.publicAddress,
        JSON_RPC_URL,
        OPEN_REWARD_DIAMOND
      );
      if (getOnlyId) {
        return { brandId: brandDetails.brandId };
      } else {
        return { brandDetails };
      }
    } else {
      const loggedInUserInfo = await magic.user.getInfo().then((info: any) => info);
      const brandDetails: BrandDetailsProps = await brandService.getBrandConfigByAddress(
        loggedInUserInfo.publicAddress,
        JSON_RPC_URL,
        OPEN_REWARD_DIAMOND
      );
      if (getOnlyId) {
        return { brandId: brandDetails.brandId };
      } else {
        return { brandDetails };
      }
    }
  } catch (error) {
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}
