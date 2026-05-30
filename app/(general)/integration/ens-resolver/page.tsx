"use client";

import { turboIntegrations } from "@/data/turbo-integrations";
import { WalletConnect } from "@/components/blockchain/wallet-connect";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import { IsWalletConnected } from "@/components/shared/is-wallet-connected";
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected";
import { ENSLookup } from "@/integrations/ens-resolver/components/ens-lookup";

export default function ENSResolverPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <PageHeaderHeading>ENS Resolver</PageHeaderHeading>
        <PageHeaderDescription>
          Resolve Ethereum Name Service (ENS) names to addresses and vice versa.
        </PageHeaderDescription>
      </PageHeader>
      <PageSection>
        <IsWalletConnected>
          <ENSLookup />
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
      </PageSection>
    </div>
  );
}
