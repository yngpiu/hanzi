import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Dictionary } from "@/components/dictionary/Dictionary"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
            <Dictionary />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

