import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_MAINNET_RPC || "https://eth.llamarpc.com"),
});

export async function resolveENSName(name: string): Promise<string | null> {
  try {
    const normalized = normalize(name.trim());
    return await client.getEnsAddress({ name: normalized });
  } catch {
    return null;
  }
}

export async function lookupENSAddress(address: string): Promise<string | null> {
  try {
    return await client.getEnsName({ address: address as `0x${string}` });
  } catch {
    return null;
  }
}

export async function getENSAvatar(name: string): Promise<string | null> {
  try {
    const normalized = normalize(name.trim());
    return await client.getEnsAvatar({ name: normalized });
  } catch {
    return null;
  }
}
