import "../styles/globals.css";
import "../styles/scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div suppressHydrationWarning style={{ width: "100%", height: "100%" }}>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </div>
    </AuthProvider>
  );
}

export default MyApp;
