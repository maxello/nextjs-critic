import React, {ReactNode} from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const layout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Header />
      <main className="root-container flex-1 py-6 bg-background text-foreground">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default layout