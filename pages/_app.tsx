// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Asegúrate de que la ruta al store sea correcta

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Welcome to pop-ukraine-map!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default CustomApp;
