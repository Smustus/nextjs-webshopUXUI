import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavigationBar />
      <main className="flex flex-col min-h-screen items-center p-4 sm:p-6 pt-36 sm:pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
