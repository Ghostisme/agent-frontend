import React, { useState } from 'react'
import { cn } from "../../../lib/utils";
import type { ReactNode } from "react"

export type LayoutMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  route?: string;
  roles?: string[];
  active?: boolean;
  onClick?: () => void;
  children?: LayoutMenuItem[];
};

export type TwoPaneLayoutSchema = {
  sidebar?: {
    visible?: boolean;
    width?: number;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    menu?: LayoutMenuItem[];
    header?: ReactNode;
    footer?: ReactNode;
  };
  header?: {
    visible?: boolean;
    content?: ReactNode;
  };
  footer?: {
    visible?: boolean;
    content?: ReactNode;
  };
  maxWidth?: "lg" | "xl" | "full";
};

export type TwoPaneLayoutProps = {
  className?: string;
  schema?: TwoPaneLayoutSchema;
  children?: ReactNode;
  canAccess?: (roles?: string[]) => boolean;
  onMenuClick?: (item: LayoutMenuItem) => void;
};

const TwoLayout = ({ className, schema, children, canAccess = () => true, onMenuClick }: TwoPaneLayoutProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(!!schema?.sidebar?.defaultCollapsed);
  const sidebarWidth = schema?.sidebar?.width ?? 256;
  const showSidebar = schema?.sidebar?.visible ?? true;
  const showHeader = schema?.header?.visible ?? true;
  const showFooter = schema?.footer?.visible ?? false;

  const renderMenu = (items?: LayoutMenuItem[], level = 0) => {
    if (!items?.length) return null;
    return (
      <ul className={cn(level > 0 ? "pl-2" : "")}>
        {items.map(item => {
          if (!canAccess(item.roles)) return null;
          const hasChildren = !!item.children?.length;
          const itemNode = (
            <li key={item.id}>
              <button
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-primary/10",
                  item.active ? "bg-primary/10 text-primary" : "text-foreground"
                )}
                onClick={() => (item.onClick ? item.onClick() : onMenuClick?.(item))}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
              {hasChildren && !collapsed && renderMenu(item.children, level + 1)}
            </li>
          );
          return itemNode;
        })}
      </ul>
    );
  };

  return (
    <div className={cn("h-screen w-full bg-background text-foreground", className)}>
      {showHeader && (
        <div className="h-12 border-b flex items-center px-4 shrink-0">
          {schema?.header?.content}
        </div>
      )}

      <div className="flex h-[calc(100vh-3rem)]">
        {showSidebar && (
          <aside
            style={{ width: collapsed ? 64 : sidebarWidth }}
            className={cn(
              "h-full border-r shrink-0 transition-[width] duration-200 ease-in-out flex flex-col"
            )}
          >
            <div className="p-2">{schema?.sidebar?.header}</div>
            <nav className="px-2 overflow-auto flex-1">{renderMenu(schema?.sidebar?.menu)}</nav>
            <div className="p-2">{schema?.sidebar?.footer}</div>
            {schema?.sidebar?.collapsible && (
              <div className="p-2">
                <button
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setCollapsed(v => !v)}
                >
                  {collapsed ? "展开" : "收起"}
                </button>
              </div>
            )}
          </aside>
        )}

        <main
          className={cn(
            "flex-1 h-full overflow-auto",
            schema?.maxWidth === "lg" && "max-w-screen-lg mx-auto",
            schema?.maxWidth === "xl" && "max-w-screen-xl mx-auto"
          )}
        >
          {children}
        </main>
      </div>

      {showFooter && (
        <div className="h-10 border-t flex items-center px-4 shrink-0">
          {schema?.footer?.content}
        </div>
      )}
    </div>
  )
}

export default TwoLayout