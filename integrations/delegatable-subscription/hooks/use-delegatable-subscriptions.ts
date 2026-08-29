import { useLiveQuery } from "dexie-react-hooks"
import { db, type StoredSubscription } from "../database"

export const useDelegatableSubscriptions = () => {
  const subscriptions = useLiveQuery(() => db.subscriptions.toArray(), [])

  const getStoredSubscription = async (id: string) => {
    return db.subscriptions.get(id)
  }

  const addSubscription = async (subscription: StoredSubscription) => {
    await db.subscriptions.put(subscription)
    return subscription
  }

  const updateSubscription = async (
    id: string,
    changes: Partial<StoredSubscription>
  ) => {
    await db.subscriptions.update(id, changes)
  }

  const deleteSubscription = async (id: string) => {
    await db.subscriptions.delete(id)
  }

  const clearAllSubscriptions = async () => {
    await db.subscriptions.clear()
  }

  const activeSubscriptions = (subscriptions || []).filter(
    (sub) => sub.status === "active"
  )

  return {
    subscriptions,
    activeSubscriptions,
    getStoredSubscription,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    clearAllSubscriptions,
  }
}
