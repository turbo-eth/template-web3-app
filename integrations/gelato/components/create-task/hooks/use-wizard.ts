import { useMemo } from 'react'

import { AbiFunction } from 'abitype'
import { UseFormReturn } from 'react-hook-form'
import { Abi } from 'viem'

import { getAbiFunctions, getTotalInterval, inputsAreFilled } from '@/integrations/gelato/utils/helpers'

import { CreateTaskForm } from '../create-task'

export const useWizard = (form: UseFormReturn<CreateTaskForm>) => {
  const { watch } = form

  const [contractAddress, abi, func, predefinedInputs, inputDefinition, d, h, m, s, timeOption, name, resolverAbi, resolverFunc, resolverInputs] =
    watch([
      'contractAddress',
      'abi',
      'func',
      'predefinedInputs',
      'inputDefinition',
      'timeInterval.days',
      'timeInterval.hours',
      'timeInterval.minutes',
      'timeInterval.seconds',
      'timeOption',
      'name',
      'resolverAbi',
      'resolverFunc',
      'resolverInputs',
    ])

  const allPredefinedInputsAreFilled = useMemo(() => {
    if (!abi) return

    try {
      return inputsAreFilled(
        getAbiFunctions(JSON.parse(abi) as Abi).find((item) => item.name === func) as AbiFunction,
        predefinedInputs as NonNullable<typeof predefinedInputs>
      )
    } catch (e) {
      return false
    }
  }, [abi, func, predefinedInputs, inputDefinition])

  const allResolverInputsAreFilled = useMemo(() => {
    if (!resolverAbi) return

    try {
      return inputsAreFilled(
        getAbiFunctions(JSON.parse(resolverAbi) as Abi).find((item) => item.name === resolverFunc) as AbiFunction,
        resolverInputs as NonNullable<typeof resolverInputs>
      )
    } catch (e) {
      return false
    }
  }, [resolverAbi, resolverFunc, resolverInputs])

  const totalInterval = useMemo(() => getTotalInterval(d, h, m, s), [d, h, m, s])

  const shouldShowFunction = !!abi && !!contractAddress
  const shouldShowInputs = shouldShowFunction && !!func
  const shouldShowResolverInputs = shouldShowInputs && inputDefinition === 'resolver'
  const allInputsAreFilled = inputDefinition === 'resolver' ? allResolverInputsAreFilled : allPredefinedInputsAreFilled

  const shouldShowRestrictionInfo = shouldShowInputs && !!allInputsAreFilled
  const shouldShowIntervalInput = shouldShowRestrictionInfo && inputDefinition === 'predefined'

  const intervalIsValid = shouldShowIntervalInput ? totalInterval >= 25 : true

  const shouldShowPayment = shouldShowRestrictionInfo && (intervalIsValid || timeOption == 'whenever_possible')
  const isValid = shouldShowPayment && !!name

  return {
    shouldShowFunction,
    shouldShowInputs,
    shouldShowResolverInputs,
    shouldShowRestrictionInfo,
    shouldShowIntervalInput,
    shouldShowPayment,
    isValid,
  }
}
