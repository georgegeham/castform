export default function Right() {
  return (
    <section className="flex-1 flex justify-center items-center  overflow-hidden rounded-r-lg relative box-border min-h-[25vh]">
      <img
        src="./cover.jpg"
        alt="pic"
        className="h-full object-cover w-full absolute inset-0 transform transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="absolute inset-0 w-full h-full bg-[#5483B3] opacity-0 pointer-events-none"></div>
    </section>
  );
}
