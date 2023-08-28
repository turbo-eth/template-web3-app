import Link from "next/link"
import { turboIntegrations } from "@/data/turbo-integrations"
import { LuBook } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LightDarkImage } from "@/components/light-dark-image"
import {
  PageHeader,
  PageHeaderCTA,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageSection } from "@/components/page-section"

export default function IntegrationPage() {
  return (
    <div className="container relative mt-20">
      <PageHeader className="pb-8">
        <LightDarkImage
          LightImage={turboIntegrations.starter.imgDark}
          DarkImage={turboIntegrations.starter.imgLight}
          alt="TurboETH Logo"
          width={100}
          height={100}
        />
        <PageHeaderHeading>Starter Template</PageHeaderHeading>
        <PageHeaderDescription>
          Use this template to get started building integrations with TurboETH.
        </PageHeaderDescription>
        <PageHeaderCTA>
          <Link
            href={turboIntegrations.starter.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LuBook className="mr-2 h-4 w-4" />
            Documentation
          </Link>
        </PageHeaderCTA>
      </PageHeader>
      <PageSection>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Let&apos;s BUIDL here!</CardTitle>
            <CardDescription>Jumpstart your next project.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Select>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="turbo">Turbo</SelectItem>
                  <SelectItem value="district">District</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write us a message..." />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="emerald">Send</Button>
          </CardFooter>
        </Card>
      </PageSection>
    </div>
  )
}
