import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import * as React from "react";
import { Navbar } from "@components/navbar";
import { RootSidebar } from "@components/sidebar";
import { SidebarLayout } from "@components/sidebar-layout";

export const Route = createRootRoute({
  component: RouteLayout,
});

function RouteLayout() {
  const location = useRouterState({ select: (s) => s.location });
  const isPortal = location.pathname === "/portal";
  return (
    <React.Fragment>
      <SidebarLayout sidebar={<RootSidebar />} navbar={<Navbar />}>
        {isPortal ? (
          <Outlet />
        ) : (
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </div>
        )}
      </SidebarLayout>
    </React.Fragment>
  );
}
