import AboutHeader from './header/AboutHeader';
import Sustainability from './sustainabilitySection';
import Mission from './mission';
import AboutInstitutional from '@/components/sections/AboutInstitutional';
import api from '@/lib/axiosInstance';
// import WhatsAppBtn from '@/components/ui/WhatsAppBtn';

export default async function Sobre() {
  // const linkData = await api.get('/api/without/company_profile/get');

  const aboutHeaderData = await api.get('/api/without/about_header/get');

  const sustainabilityData = await api.get('/api/without/about_sub_header/get');

  const missionData = await api.get(
    '/api/without/about_mission_and_values/get'
  );

  const aboutInstitutionalInfosData = await api.get(
    '/api/without/home_institutional_section/index'
  );

  const aboutInstitucionalImageData = await api.get(
    '/api/without/home_institutional_section/display_image'
  );

  return (
    <div className="w-full h-full">
      <AboutHeader
        base64={aboutHeaderData.data.data.base64}
        title={aboutHeaderData.data.data.title}
        description={aboutHeaderData.data.data.description}
      />
      <Sustainability
        base64={sustainabilityData.data.data.base64}
        title={sustainabilityData.data.data.title}
        description={sustainabilityData.data.data.description}
      />
      <Mission
        featuredDescription={missionData.data.data.featured_description}
        missionDescription={missionData.data.data.mission_description}
        valuesDescription={missionData.data.data.values_description}
      />
      <AboutInstitutional
        infos={{
          link: aboutInstitutionalInfosData.data.data[0].link,
          title: aboutInstitutionalInfosData.data.data[0].title,
          description: aboutInstitutionalInfosData.data.data[0].description,
        }}
        image={aboutInstitucionalImageData.data}
      />
      {/* <WhatsAppBtn link={linkData.data.data.whatsapp} /> */}
    </div>
  );
}
