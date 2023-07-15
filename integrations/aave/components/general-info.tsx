export const GeneralInfo = () => {
  return (
    <div className="mb-4 flex items-center justify-between bg-gray-200 p-4 dark:bg-gray-700 dark:text-white">
      <span>
        Current Chain: <strong>Ethereum</strong>
      </span>
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
        Switch Chain
      </button>
    </div>
  )
}
