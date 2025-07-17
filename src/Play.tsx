import AsyncCreatableSelect from "react-select/async-creatable";
import Plays from "./plays";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Selected, PlayInputs, Tournament, Reward } from "./Types";
import {
  loadTournaments,
  loadRewards,
  createTournament,
  postPlay,
} from "./API";
import CreatableSelect from "react-select/creatable";
export default function Play() {
  const [selectedTournament, setSelectedTournament] = useState<
    Selected[] | null
  >(null);
  const [selectedReward, setSelectedReward] = useState<Selected[] | null>(null);
  const [selectedPlay, setSelectedPlay] = useState<Selected | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayInputs>();
  const onSubmit: SubmitHandler<PlayInputs> = async (data) => {
    setIsSubmitting(true);
    if (!selectedPlay || !selectedTournament) {
      alert("اختار العرض و المهرجان");
      return;
    }
    let rewards: Reward[] | [] = [];
    if (selectedReward) {
      rewards = selectedReward.map((reward) => ({
        ID: reward.value,
        rname: reward.label,
      }));
    }
    const tournaments: Tournament[] = selectedTournament.map((tournament) => ({
      ID: tournament.value,
      tname: tournament.label,
    }));
    try {
      const response = await postPlay({
        ID: selectedPlay?.value ?? Math.random() + Date.now(),
        pname: selectedPlay?.label ?? "",
        pdate: new Date(data.Date),
        costumes: data.Costumes,
        decor: data.Decor,
        director_name: data.Director,
        lightning: data.Lightning,
        music: data.Music,
        Rewards: rewards,
        Tournaments: tournaments,
      });
      if (response.status === 201) {
        setIsSubmitting(true);
        alert("تم الحفظ بنجاح");
      }
    } catch (err) {
      console.log("Error Saving Play");
      alert("هذا العرض تم توثيقة من قبل");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      className="sm:space-y-4 sm:mt-6 space-y-3 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-4 box-border">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          اختار العرض الي حابب تساعد في توثيقه (ممكن تكتب اسمه لو مش موجود)
        </p>
        <CreatableSelect
          isClearable
          isSearchable={true}
          className="w-full mx-auto text-xs"
          placeholder="اختار اسم العرض"
          options={Plays}
          onChange={(option) => setSelectedPlay(option)}
          onCreateOption={(option) => {
            const newOption: Selected = {
              label: option,
              value: Date.now() + Math.random(),
            };
            setSelectedPlay(newOption);
          }}
          value={selectedPlay}
        />
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
        <AsyncCreatableSelect
          isMulti
          isSearchable
          defaultOptions
          cacheOptions={true}
          loadOptions={loadTournaments}
          onChange={(option) => setSelectedTournament(option as Selected[])}
          onCreateOption={async (inputValue) => {
            const created = await createTournament(inputValue);
            setSelectedTournament((prev) => [...(prev || []), created]);
          }}
          value={selectedTournament}
          className="w-full mx-auto text-xs"
          menuPlacement="top"
          placeholder="اختار المهرجان"
        />
      </div>
      <div className="px-4 box-border">
        <p className="text-right text-sm font-semibold font-serif pb-1">
          اختار الجوائز الي حصل عليها العرض في مختلف المهرجانات
        </p>
        <AsyncCreatableSelect
          isMulti
          isSearchable
          defaultOptions
          cacheOptions={true}
          loadOptions={loadRewards}
          onChange={(option) => setSelectedReward(option as Selected[])}
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
          className={`bg-[#021024] rounded-md py-2 text-[#C1E8FF] w-max px-4 justify-self-center cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-70 ${
            isSubmitting ? "animate-bounce" : ""
          }`}
        />
      </div>
    </form>
  );
}
