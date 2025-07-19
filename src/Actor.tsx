import { useForm, SubmitHandler } from "react-hook-form";
import AsyncCreatableSelect from "react-select/async-creatable";
import { ActorInputs, Selected, ACTOR } from "./Types";
import { MultiValue } from "react-select";
import { useState } from "react";
import {
  createReward,
  loadPlays,
  loadRewards,
  postActor,
  uploadImageToImgbb,
} from "./API";
import AsyncSelect from "react-select/async";
export default function Actor() {
  const [selectedReward, setSelectedReward] = useState<Selected[] | null>(null);
  const [selectedPlay, setSelectedPlay] = useState<MultiValue<Selected>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [number, setNumber] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActorInputs>();
  const onSubmit: SubmitHandler<ActorInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const file = data.ImageURL[0];
      const imageUrl: string = await uploadImageToImgbb(file);
      const payload: ACTOR = {
        name: data.name,
        mobile: data.mobile,
        email: data.email ?? null,
        bdate: data.bdate,
        DateOfEntrance: data.dateOfEntrance,
        NoPlays: number.toString(),
        ImgURL: imageUrl,
        Plays:
          selectedPlay?.map((p) => ({
            pname: p.label,
            ID: p.value,
          })) ?? [],
        Rewards:
          selectedReward?.map((r) => ({
            rname: r.label,
            ID: r.value,
          })) ?? [],
      };

      const result = await postActor(payload);
      if (result.status === 201) {
        setIsSubmitting(false);
        alert("تم تسجيلك بنجاح");
      }
    } catch (err) {
      alert("في مشكلة حاول مرة تانية");
      console.error("❌ Upload failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="sm:space-y-4 sm:mt-8 space-y-3 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="name"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">🎭</span>Name
          <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF]"
          {...register("name", {
            required: true,
            maxLength: 50,
            pattern: /^[A-Za-z\s]+$/i,
            validate: (value) =>
              value.trim().split(/\s+/).length === 2 || "دخل الاسم ثنائي معلش",
          })}
        />
        {errors.name && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            دخل الاسم ثنائي معلش
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="mobile"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">📱</span>Mobile
          <span className="text-red-600">*</span>
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
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            مش كفاية لعب بقي ولا ايه؟
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="email"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">📧</span>Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("email", {
            required: false,
            maxLength: 100,
            pattern: /^\S+@\S+\.\S+$/i,
          })}
        />
        {errors.email && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            بدأت ازهق بجد منك
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label htmlFor="bdate" className="text-lg text-[#021024] items-center">
          <span className="mr-2">🎂</span>BirthDate
          <span className="text-red-600">*</span>
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
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            ارحمنيييييييييييي بقييييييييي
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="dateOfEntrance"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">🎭</span>Date of Joining
          <span className="text-red-600">*</span>
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
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            هشتمك مهما تكن مين
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="noPlays"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2 opacity-55">🎭</span>No of Plays
        </label>
        <input
          type="text"
          id="noPlays"
          value={number}
          placeholder="Enter Number of Plays..."
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] opacity-55"
          {...register("noPlays", {
            required: true,
            maxLength: 2,
            pattern: /^[0-9]{1,2}$/i,
          })}
          readOnly
        />
        {errors.noPlays && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            يارب الموقع يضرب في وشك
          </span>
        )}
      </div>
      <div className="space-x-2 grid grid-cols-2 place-content-center px-4">
        <label
          htmlFor="Image"
          className="text-lg text-[#021024] flex items-center"
        >
          <span className="mr-2">🎭</span>Image
          <span className="text-red-600">*</span>
        </label>
        <input
          type="file"
          id="Image"
          className="rounded-md bg-[#021024] outline-none text-sm p-2 text-[#C1E8FF] "
          {...register("ImageURL", {
            required: true,
          })}
        />
        {errors.noPlays && (
          <span className="text-[#021024] text-sm col-span-2 text-right pr-1 font-semibold">
            يارب الموقع يضرب في وشك
          </span>
        )}
      </div>
      <div className="px-4 ">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          اختار العروض الي شاركت فيها (ممكن تكتب اسم العرض لو مش موجود)
        </p>
        <AsyncSelect
          isClearable
          isMulti
          defaultOptions
          isSearchable={true}
          className="w-full mx-auto text-xs"
          placeholder="اختار اسم العرض"
          loadOptions={loadPlays}
          menuPlacement="top"
          onChange={(option) => {
            setSelectedPlay(option);
            setNumber(option ? option.length : 0);
          }}
          value={selectedPlay}
        />
      </div>
      <div className="px-4">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          اختار الجوائز الي حصلت عليها (ممكن تكتب اسم الجائزة لو مش موجودة)
        </p>
        <AsyncCreatableSelect
          isMulti
          isSearchable
          defaultOptions
          cacheOptions={true}
          loadOptions={loadRewards}
          onChange={(option) => setSelectedReward(option as Selected[])}
          onCreateOption={async (inputValue) => {
            const created = await createReward(inputValue);
            setSelectedReward((prev) => [...(prev || []), created]);
          }}
          value={selectedReward}
          placeholder="اختار الجوائز في مختلف المهرجانات"
          menuPlacement="top"
          className="w-full mx-auto text-xs"
        />
      </div>
      <div className="space-x-2 grid grid-cols-1 px-4 ">
        <input
          type="submit"
          value={isSubmitting ? "..." : "Save"}
          className={`bg-[#0b0c0c] rounded-md py-2 text-[#C1E8FF] w-max px-4 justify-self-center cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70 ${
            isSubmitting ? "animate-bounce" : ""
          }`}
        />
      </div>
    </form>
  );
}
