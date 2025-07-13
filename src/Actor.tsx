import { useForm, SubmitHandler } from "react-hook-form";
import CreateableSelect from "react-select/creatable";
import Plays from "./plays";
type Inputs = {
  name: string;
  mobile: string;
  email: string;
  bdate: string;
  dateOfEntrance: string;
  noPlays: string;
};
export default function Actor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form
      className="sm:space-y-5 sm:mt-12 space-y-3 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="name" className="text-lg text-[#021024]">
          <span className="mr-2">🎭</span>Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF]"
          {...register("name", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z\s]+$/i,
          })}
        />
        {errors.name && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1">
            انا ملسم الموقع اكتب عدل بقي
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="mobile" className="text-lg text-[#021024]">
          <span className="mr-2">📱</span>Mobile
        </label>
        <input
          type="text"
          id="mobile"
          placeholder="Enter Your Mobile..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("mobile", {
            required: true,
            maxLength: 11,
            pattern: /^0[0-9]{10}$/i,
          })}
        />
        {errors.mobile && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1">
            مش كفاية لعب بقي ولا ايه؟
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="email" className="text-lg text-[#021024]">
          <span className="mr-2">📧</span>Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("email", {
            required: false,
            maxLength: 50,
            pattern: /^\S+@\S+\.\S+$/i,
          })}
        />
        {errors.email && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1">
            بدأت ازهق بجد منك
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="bdate" className="text-lg text-[#021024]">
          <span className="mr-2">🎂</span>BirthDate
        </label>
        <input
          type="date"
          id="bdate"
          placeholder="Enter Your Name..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("bdate", {
            required: true,
            maxLength: 20,
            pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i,
          })}
        />
        {errors.bdate && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1">
            ارحمنيييييييييييي بقييييييييي
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="dateOfEntrance" className="text-lg text-[#021024]">
          <span className="mr-2">🎭</span>Date of Joining
        </label>
        <input
          type="date"
          id="dateOfEntrance"
          placeholder="Enter Date of Joining..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("dateOfEntrance", {
            required: true,
            maxLength: 15,
            pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i,
          })}
        />
        {errors.dateOfEntrance && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1">
            هشتمك مهما تكن مين
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="noPlays" className="text-lg text-[#021024]">
          <span className="mr-2">🎭</span>No of Plays
        </label>
        <input
          type="text"
          id="noPlays"
          placeholder="Enter Number of Plays..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("noPlays", {
            required: true,
            maxLength: 2,
            pattern: /^[0-9]{1,2}$/i,
          })}
        />
        {errors.noPlays && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1">
            يارب الموقع يضرب في وشك
          </span>
        )}
      </div>
      <CreateableSelect
        isMulti
        options={Plays}
        className="w-full mx-auto text-xs px-4 transform translate-y-5 z-10"
      />
      <div className="space-x-2 grid grid-cols-1 px-4 pt-20 ">
        <input
          type="submit"
          className="bg-[#021024] rounded-md py-2 text-[#C1E8FF] w-max px-4 justify-self-center cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70"
        />
      </div>
    </form>
  );
}
