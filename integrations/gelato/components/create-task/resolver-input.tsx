import { GELATO_CONSTANTS } from "../../utils/constants"
import { ContractInput } from "./contract-input"
import { ExecutionValues } from "./execution-values"
import { FunctionInput } from "./function-input"

export function ResolverInput() {
  return (
    <div className="mx-auto mt-10 w-full !max-w-4xl !rounded-xl !border-none !px-10 py-8 dark:!bg-zinc-900">
      <div className="mb-10 flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold dark:opacity-70">When</h3>
      </div>
      <div>
        <div>
          Resolver Contracts allow you to define arbitrary conditions that
          should trigger an execution.
        </div>
        <div>
          <a
            className="text-indigo-400"
            href={GELATO_CONSTANTS.docs.resolver}
            target="_blank"
          >
            Read Resolver Documentation
          </a>
        </div>
        <div className="mt-5">
          <ContractInput
            abiFieldName="resolverAbi"
            contractFieldName="resolverContractAddress"
          />
          <FunctionInput
            abiFieldName="resolverAbi"
            funcFieldName="resolverFunc"
            inputsFieldName="resolverInputs"
          />
          <ExecutionValues
            abiFieldName="resolverAbi"
            funcFieldName="resolverFunc"
            inputFieldName="resolverInputs"
          />
        </div>
      </div>
    </div>
  )
}
