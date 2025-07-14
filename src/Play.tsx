import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Plays from "./plays";
import { useForm, SubmitHandler } from "react-hook-form";
import Tournaments from "./Tournaments";
import { PlayRewards } from "./Rewards";
type Inputs = {
  Director: string;
  Decor: string;
  Lightning: string;
  Costumes: string;
  Music: string;
  Date: string;
};
export default function Play() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form
      className="sm:space-y-4 sm:mt-6 space-y-3 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-4 box-border">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          اختار العرض الي حابب تساعد في توثيقه (ممكن تكتب اسمه لو مش موجود)
        </p>
        <Select isSearchable={true} options={Plays} />
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="Director"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">😎</span>Director
          <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="Director"
          placeholder="Enter Director..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("Director", {
            required: true,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/i,
          })}
        />
        {errors.Director && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            مش كفاية لعب بقي ولا ايه؟
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="Decor"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">⚒️</span>Decor
        </label>
        <input
          type="text"
          id="Decor"
          placeholder="Enter Decor..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("Decor", {
            required: false,
            maxLength: 100,
            pattern: /^[A-Za-z\s]+$/i,
          })}
        />
        {errors.Decor && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            بدأت ازهق بجد منك
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="Lightning"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">🔦</span>Lightning
        </label>
        <input
          type="text"
          id="Lightning"
          placeholder="Enter Lightning..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("Lightning", {
            required: false,
            maxLength: 100,
            pattern: /^[A-Za-z\s]+$/i,
          })}
        />
        {errors.Lightning && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            ارحمنيييييييييييي بقييييييييي
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="Costumes"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">🥻</span>Costumes
        </label>
        <input
          type="text"
          id="Costumes"
          placeholder="Enter Costumes..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("Costumes", {
            required: false,
            maxLength: 100,
            pattern: /^[A-Za-z\s]+$/i,
          })}
        />
        {errors.Costumes && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            هشتمك مهما تكن مين
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="music"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">🎼</span>Music
        </label>
        <input
          type="text"
          id="music"
          placeholder="Enter Music..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("Music", {
            required: false,
            maxLength: 100,
            pattern: /^[A-Za-z\s]+$/i,
          })}
        />
        {errors.Music && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            يارب الموقع يضرب في وشك
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="Date"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">⌛</span>Date
          <span className="text-red-600">*</span>
        </label>
        <input
          type="Date"
          id="Date"
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("Date", {
            required: true,
            maxLength: 12,
            pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i,
          })}
        />
        {errors.Date && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            يارب الموقع يضرب في وشك
          </span>
        )}
      </div>
      <div className="px-4 box-border">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          <span className="text-red-600">*</span> اختار المهرجانات الي شارك فيها
          العرض (ممكن تكتب اسم المهرجان)
        </p>
        <CreatableSelect
          isMulti
          options={Tournaments}
          className="w-full mx-auto text-xs"
          menuPlacement="top"
          placeholder="اختار المهرجان"
        />
      </div>
      <div className="px-4 box-border">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          <span className="text-red-600">*</span>اختار الجوائز الي حصل عليها
          العرض في مختلف المهرجانات
        </p>
        <CreatableSelect
          isMulti
          options={PlayRewards}
          placeholder="اختار الجوائز في مختلف المهرجانات"
          menuPlacement="top"
          className="w-full mx-auto text-xs"
        />
      </div>
      <div className="space-x-2 grid grid-cols-1 px-4 ">
        <input
          type="submit"
          className="bg-[#021024] rounded-md py-2 text-[#C1E8FF] w-max px-4 justify-self-center cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70"
        />
      </div>
    </form>
  );
}
