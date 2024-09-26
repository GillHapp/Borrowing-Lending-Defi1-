import "../styles/globals.css";
import LendState from "../context/LendState";

function MyApp({ Component, pageProps }) {
  return (
    <main className="">
      <LendState>
        <Component {...pageProps} />
      </LendState>
    </main>
  );
}

export default MyApp;
