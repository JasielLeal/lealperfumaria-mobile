import { StatusBar } from 'react-native';
import { Home } from './src/pages/home/home';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#121214"} />
      <Home />
    </>
  );
}

