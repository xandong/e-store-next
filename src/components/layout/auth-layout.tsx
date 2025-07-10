export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-background flex justify-center items-center bg-[url(/background.png)]">
      <div className="py-6 bg-white p-6 shadow rounded-2xl">{children}</div>
    </div>
  )
}
