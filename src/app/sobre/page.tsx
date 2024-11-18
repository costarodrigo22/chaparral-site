import AboutHeader from './header/AboutHeader';
import Sustainability from './sustainabilitySection';
import Mission from './mission';
import AboutInstitutional from '@/components/sections/AboutInstitutional';

export default function Sobre() {
  return (
    <div className="w-full h-full">
      <AboutHeader />
      <Sustainability />
      <Mission />
      <AboutInstitutional />
    </div>
  );
}
