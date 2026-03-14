import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue>({ value: "", onValueChange: () => {} })

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("inline-flex items-center rounded-xl bg-gray-100 p-1", className)}
      {...props}
    />
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = React.useContext(TabsContext)
  const isActive = activeValue === value
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: activeValue } = React.useContext(TabsContext)
  if (activeValue !== value) return null
  return <div className={cn("mt-4", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
