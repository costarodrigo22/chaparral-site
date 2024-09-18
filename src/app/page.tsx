import Footer from './components/Footer';
import Header from './components/Header';
import IfoodService from './components/IfoodService';

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Header />
      <IfoodService />
      <div className=" lg:mx-8">
        <Footer />
      </div>
    </div>
  );
}
