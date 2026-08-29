import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'
import { districtERC20PermitSubscriptionsEnforcerABI } from './abis/district-erc20-permit-subscriptions-enforcer-abi'

export const districtErc20PermitSubscriptionsEnforcerAbi =
  districtERC20PermitSubscriptionsEnforcerABI

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DistrictERC20PermitSubscriptionsEnforcer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcer =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"isCanceled"`
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcerIsCanceled =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'isCanceled',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"lastTimestamp"`
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcerLastTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'lastTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"encodeTerms"`
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcerEncodeTerms =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'encodeTerms',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"verifyExternalDelegationSignature"`
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcerVerifyExternalDelegationSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'verifyExternalDelegationSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"getExternalDelegationTypedDataHash"`
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcerGetExternalDelegationTypedDataHash =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'getExternalDelegationTypedDataHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"getEIP712DomainHash"`
 */
export const useReadDistrictErc20PermitSubscriptionsEnforcerGetEip712DomainHash =
  /*#__PURE__*/ createUseReadContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'getEIP712DomainHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__
 */
export const useWriteDistrictErc20PermitSubscriptionsEnforcer =
  /*#__PURE__*/ createUseWriteContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"cancelSubscription"`
 */
export const useWriteDistrictErc20PermitSubscriptionsEnforcerCancelSubscription =
  /*#__PURE__*/ createUseWriteContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'cancelSubscription',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"enforceCaveat"`
 */
export const useWriteDistrictErc20PermitSubscriptionsEnforcerEnforceCaveat =
  /*#__PURE__*/ createUseWriteContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'enforceCaveat',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__
 */
export const useSimulateDistrictErc20PermitSubscriptionsEnforcer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link districtErc20PermitSubscriptionsEnforcerAbi}__ and `functionName` set to `"cancelSubscription"`
 */
export const useSimulateDistrictErc20PermitSubscriptionsEnforcerCancelSubscription =
  /*#__PURE__*/ createUseSimulateContract({
    abi: districtErc20PermitSubscriptionsEnforcerAbi,
    functionName: 'cancelSubscription',
  })
