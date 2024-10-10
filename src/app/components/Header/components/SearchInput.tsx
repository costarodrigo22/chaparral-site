import Image from 'next/image';

export default function SearchInput() {
  return (
    <div className=" bg-[#00000033] hidden lg:flex lg:ml-10 rounded-[59px] w-[326px] h-[50px] gap-2 items-center">
      <Image
        className="ml-7"
        alt="Icone do input de busca"
        width={18}
        height={18}
        src={'/searchIcon.svg'}
      />
      <input
        className=" bg-transparent w-full  text-white text-center focus:text-left placeholder:text-white outline-none"
        type="text"
        placeholder="Pesquisar"
      />
    </div>
  );
}
