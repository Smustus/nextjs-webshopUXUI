import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import NavigationBarPhone from "../components/NavigationBarPhone";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavigationBar />
      <main className="flex flex-col min-h-screen max-w-screen-2xl items-center px-4 sm:p-6 xl:px-16 pt-6 sm:pt-24">
        {children}
      </main>
      <NavigationBarPhone />
      <Footer />
    </>
  );
}

export default Layout;
