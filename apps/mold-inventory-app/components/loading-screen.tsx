export function LoadingScreen() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        <p className="text-foreground font-medium">Loading...</p>
      </div>
    </div>
  )
}
