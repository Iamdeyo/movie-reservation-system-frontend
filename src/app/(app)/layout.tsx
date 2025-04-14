import LoginDialog from "@/components/login-dialog";
import Navbar from "@/components/navbar";
import { LoginDialogProvider } from "@/context/login-provider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#020700] min-h-svh flex">
      <div className="bg-main blur-[140px] md:blur-[200px] w-[240px] md:w-[448px] aspect-square rounded-full fixed top-0 -translate-y-[15%] right-0 translate-x-[30%] "></div>
      <div className="bg-main blur-[140px] md:blur-[200px] w-[240px] md:w-[448px] aspect-square rounded-full fixed bottom-0 translate-y-[15%] left-0 -translate-x-[30%] "></div>
      <main className="relative text-white px-5 pb-20 font-poppins flex-1 w-full">
        <LoginDialogProvider>
          <Navbar />
          {children}
          <LoginDialog />
        </LoginDialogProvider>
      </main>
    </div>
  );
}
