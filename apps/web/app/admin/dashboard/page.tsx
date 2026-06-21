import { AppSidebar } from "@/components/admin/dashboard/app-sidebar"
import { ChartAreaInteractive } from "@/components/admin/dashboard/chart-area-interactive"
import { DataTable } from "@/components/admin/dashboard/data-table"
import { SectionCards } from "@/components/admin/dashboard/section-cards"
import { SiteHeader } from "@/components/admin/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"

import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--sidebar-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
