import { ReactNode } from "react";
import { Head, Link } from "blitz";

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Midikaos</title>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0193GBL6XD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0193GBL6XD');`,
          }}
        ></script>
      </Head>

      <div className="container mx-auto py-5 text-gray-900">
        <div className="ml-5 flex flex-row">
          <a href="/">
            <img src="circuit.svg" className="h-8" alt="logo" />
          </a>
          <h1 className="ml-4 text-3xl font-bold tracking-wider font-mono">
            <a href="/">Midikaos</a>
          </h1>
          <span className="sm:visible invisible mt-2 ml-3 text-gray-700">
            A Standard MIDI Files Library
          </span>
        </div>

        {children}
        <div className="flex justify-center mt-5 text-gray-700">
          <Link href="/about">
            <a className="link-pink mr-1">About</a>
          </Link>
          -
          <a
            className="link-pink ml-1"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/rap2hpoutre/midikaos"
          >
            Source code
          </a>
        </div>
      </div>
    </>
  );
};

export default Layout;
