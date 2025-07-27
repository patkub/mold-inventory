"use client"

import * as React from "react"
import * as Toast from "@radix-ui/react-toast"
import { X } from "lucide-react"

interface ToastData {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, "id">) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const toast = React.useCallback((data: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...data, id }

    setToasts((prev) => [...prev, newToast])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        {toasts.map((toastData) => (
          <Toast.Root
            key={toastData.id}
            className={`
              group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all
              data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full
              ${
                toastData.variant === "destructive"
                  ? "destructive border-red-500/50 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-900 dark:text-red-50"
                  : "border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
              }
            `}
            duration={5000}
          >
            <div className="grid gap-1">
              <Toast.Title className="text-sm font-semibold">{toastData.title}</Toast.Title>
              {toastData.description && (
                <Toast.Description className="text-sm opacity-90">{toastData.description}</Toast.Description>
              )}
            </div>
            <Toast.Close
              className="absolute right-2 top-2 rounded-md p-1 text-gray-950/50 opacity-0 transition-opacity hover:text-gray-950 focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50 focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600 dark:text-gray-50/50 dark:hover:text-gray-50"
              onClick={() => removeToast(toastData.id)}
            >
              <X className="h-4 w-4" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}
