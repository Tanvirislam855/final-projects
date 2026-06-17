import Navbar from "@/components/shared/Navbar";

export default function MainLayout({ children }) {
  return (
    
      <div className="min-h-full flex flex-col">
        <Navbar />
        <main>
          {children}
        </main>

      </div>
   
  );
}
