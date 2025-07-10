import { Header } from "./header"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-background flex flex-col items-center">
      <Header />

      <main className="flex-1 flex w-full max-w-7xl">{children}</main>
    </div>
  )
}
