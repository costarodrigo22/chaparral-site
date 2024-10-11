export const handleScroll = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    const offset = 90;
    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = sectionPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};