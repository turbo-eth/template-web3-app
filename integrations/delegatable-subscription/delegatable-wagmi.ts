import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseWriteContract,
} from "wagmi/codegen"

import { delegatableABI } from "./abis/delegatable-abi"
import { verifyingContractERC20PermitSubscriptionsABI } from "./abis/verifying-contract-erc20-permit-subscriptions-abi"

export const delegatableAbi = delegatableABI
export const verifyingContractAbi = verifyingContractERC20PermitSubscriptionsABI

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delegatable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatableAbi}__
 */
export const useReadDelegatable = /*#__PURE__*/ createUseReadContract({
  abi: delegatableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatableAbi}__ and `functionName` set to `"getNonce"`
 */
export const useReadDelegatableGetNonce = /*#__PURE__*/ createUseReadContract({
  abi: delegatableAbi,
  functionName: "getNonce",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatableAbi}__ and `functionName` set to `"verifyDelegationSignature"`
 */
export const useReadDelegatableVerifyDelegationSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatableAbi,
    functionName: "verifyDelegationSignature",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatableAbi}__ and `functionName` set to `"getDelegationTypedDataHash"`
 */
export const useReadDelegatableGetDelegationTypedDataHash =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatableAbi,
    functionName: "getDelegationTypedDataHash",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link delegatableAbi}__ and `functionName` set to `"getEIP712DomainHash"`
 */
export const useReadDelegatableGetEip712DomainHash =
  /*#__PURE__*/ createUseReadContract({
    abi: delegatableAbi,
    functionName: "getEIP712DomainHash",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatableAbi}__
 */
export const useWriteDelegatable = /*#__PURE__*/ createUseWriteContract({
  abi: delegatableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link delegatableAbi}__ and `functionName` set to `"invoke"`
 */
export const useWriteDelegatableInvoke = /*#__PURE__*/ createUseWriteContract({
  abi: delegatableAbi,
  functionName: "invoke",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatableAbi}__
 */
export const useSimulateDelegatable = /*#__PURE__*/ createUseSimulateContract({
  abi: delegatableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link delegatableAbi}__ and `functionName` set to `"invoke"`
 */
export const useSimulateDelegatableInvoke =
  /*#__PURE__*/ createUseSimulateContract({
    abi: delegatableAbi,
    functionName: "invoke",
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Verifying Contract Subscriptions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link verifyingContractAbi}__
 */
export const useReadVerifyingContract = /*#__PURE__*/ createUseReadContract({
  abi: verifyingContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"subToken"`
 */
export const useReadVerifyingContractSubToken =
  /*#__PURE__*/ createUseReadContract({
    abi: verifyingContractAbi,
    functionName: "subToken",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"subAmount"`
 */
export const useReadVerifyingContractSubAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: verifyingContractAbi,
    functionName: "subAmount",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"subPeriod"`
 */
export const useReadVerifyingContractSubPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: verifyingContractAbi,
    functionName: "subPeriod",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"getSubPeriod"`
 */
export const useReadVerifyingContractGetSubPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: verifyingContractAbi,
    functionName: "getSubPeriod",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link verifyingContractAbi}__
 */
export const useWriteVerifyingContract = /*#__PURE__*/ createUseWriteContract({
  abi: verifyingContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"approveSubscription"`
 */
export const useWriteVerifyingContractApproveSubscription =
  /*#__PURE__*/ createUseWriteContract({
    abi: verifyingContractAbi,
    functionName: "approveSubscription",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"paySubscription"`
 */
export const useWriteVerifyingContractPaySubscription =
  /*#__PURE__*/ createUseWriteContract({
    abi: verifyingContractAbi,
    functionName: "paySubscription",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"invoke"`
 */
export const useWriteVerifyingContractInvoke =
  /*#__PURE__*/ createUseWriteContract({
    abi: verifyingContractAbi,
    functionName: "invoke",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link verifyingContractAbi}__
 */
export const useSimulateVerifyingContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: verifyingContractAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link verifyingContractAbi}__ and `functionName` set to `"invoke"`
 */
export const useSimulateVerifyingContractInvoke =
  /*#__PURE__*/ createUseSimulateContract({
    abi: verifyingContractAbi,
    functionName: "invoke",
  })
