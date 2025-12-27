"use client";

import React, { useState, KeyboardEvent } from "react";
import { useOnBoardingStep } from "@/stores/useAuth";
import Guard from "@/components/Guard";
import Image from "next/image";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import Select from "@/components/Select";
import { Trash2, X } from "lucide-react";

const OnboardingPage = () => {
  // const step = useOnBoardingStep();
  const step = 3;

  return (
    <Guard>
      <section className="section-container">
        <Image
          className="mb-12 mt-7"
          src="/logo.svg"
          alt="Logo"
          width={220}
          height={59}
        />

        {/* add a load bar for a 3 steps on each step it fills the bar with the right amount */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h4>
              Step {step}/3:{" "}
              {step === 1
                ? "Basic Info"
                : step === 2
                ? "Experience"
                : "Rate & Availability"}
            </h4>
            <div className=" bg-gray-200 h-1.5 w-full rounded-3xl">
              <div
                className="bg-primary-teal h-1.5 rounded-3xl"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <h2 className=" text-4xl font-bold">
              Set Up Your Freelancer Profile
            </h2>
          </div>

          {/* Add your onboarding content here */}
          {step === 1 && <BasicInfoStep />}
          {step === 2 && <ExperienceStep />}
          {step === 3 && <RateAndAvailabilityStep />}
        </div>
      </section>
    </Guard>
  );
};

const BasicInfoStep = () => {
  return (
    <div className="space-y-12 mb-7">
      <div className="space-y-8">
        {/* upload your profile picture */}
        <label
          htmlFor="profile-picture"
          className="w-full h-96 border-2 border-dashed border-gray-300 rounded-2xl
                     flex flex-col items-center justify-center gap-4
                     cursor-pointer hover:border-primary-teal transition"
        >
          <Image
            src="/camera.svg"
            alt="Upload your profile picture"
            width={88}
            height={88}
          />
          <p className="text-2xl font-bold">Upload your profile picture</p>
          <p className="text-sm text-gray-400">
            Click or drag & drop (JPG, PNG)
          </p>
        </label>
        <input
          id="profile-picture"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="">Your Professional Title</label>
            <Input
              className="w-full "
              type="text"
              placeholder="e.g. Graphic Designer"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Short Bio</label>
            <Input
              className="w-full "
              type="text"
              placeholder="e.g. Graphic Designer"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <PrimaryButton className="w-[300px] h-14 font-bold text-xl ">
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

interface Language {
  id: string;
  language: string;
  proficiency: string;
}

const ExperienceStep = () => {
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [languages, setLanguages] = useState<Language[]>([
    { id: "1", language: "", proficiency: "" },
  ]);

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
  ];

  const proficiencyOptions = [
    { value: "BASIC", label: "Basic" },
    { value: "CONVERSATIONAL", label: "Conversational" },
    { value: "FLUENT", label: "Fluent" },
    { value: "NATIVE", label: "Native" },
  ];

  const addLanguage = () => {
    setLanguages([
      ...languages,
      { id: Date.now().toString(), language: "", proficiency: "" },
    ]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (
    id: string,
    field: "language" | "proficiency",
    value: string
  ) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-12 mb-7">
      <div className="space-y-8">
        {/* Skills section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-2xl">Your Skills</h3>
              <p className="text-gray-500 text-sm">
                Showcase your strengths. Add the skills clients will hire you
                for.
              </p>
            </div>
            <div className="w-full space-y-6">
              <Input
                className="w-full"
                type="text"
                placeholder="e.g. Graphic Design, UI/UX, Photoshop"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
              />
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#7BA4BA33]/60 text-primary-teal px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <span className="text-sm font-medium">{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="bg-[#7BA4BAB0]/70 hover:bg-[#7BA4BAB0]/80 rounded-full p-1.5 transition"
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-2xl">Experience Level</h3>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectetur. Eget etiam at nam
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={() => setExperienceLevel("BEGINNER")}
                className={`w-[412px] h-40 flex flex-col items-center justify-center gap-3.5 border-2 border-[#DADADA] rounded-2xl cursor-pointer hover:border-primary-teal transition ${
                  experienceLevel === "BEGINNER" ? "bg-primary-lime" : ""
                }`}
              >
                <Image
                  src="/Beginner.svg"
                  alt="Beginner"
                  width={48}
                  height={48}
                />
                <h4>Beginner</h4>
              </div>
              <div
                onClick={() => setExperienceLevel("INTERMEDIATE")}
                className={`w-[412px] h-40 flex flex-col items-center justify-center gap-3.5 border-2 border-[#DADADA] rounded-2xl cursor-pointer hover:border-primary-teal transition ${
                  experienceLevel === "INTERMEDIATE"
                    ? "bg-primary-lime border-primary-teal"
                    : ""
                }`}
              >
                <Image
                  src="/Intermediate.svg"
                  alt="Intermediate"
                  width={48}
                  height={48}
                />
                <h4>Intermediate</h4>
              </div>
              <div
                onClick={() => setExperienceLevel("EXPERT")}
                className={`w-[412px] h-40 flex flex-col items-center justify-center gap-3.5 border-2 border-[#DADADA] rounded-2xl cursor-pointer hover:border-primary-teal transition ${
                  experienceLevel === "EXPERT" ? "bg-primary-lime" : ""
                }`}
              >
                <Image src="/Expert.svg" alt="Expert" width={48} height={48} />
                <h4>Expert</h4>
              </div>
            </div>
          </div>
          {/** add languages using selectors section */}
          <div className="space-y-6">
            <div className="flex flex-col gap-6">
              <div className=" flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-2xl">Languages</h3>
                  <p className="text-gray-500 text-sm">
                    Select the languages you are proficient in
                  </p>
                </div>
                <div>
                  <button
                    onClick={addLanguage}
                    className="flex items-center gap-2 text-primary-teal hover:text-primary-teal/80 font-medium transition"
                  >
                    <Image src="/plus.svg" alt="Add" width={32} height={32} />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={lang.id} className="flex items-center gap-4">
                    <Select
                      options={languageOptions}
                      placeholder="Select a language"
                      className="w-[628px]"
                      value={lang.language}
                      onChange={(e) =>
                        updateLanguage(lang.id, "language", e.target.value)
                      }
                    />
                    <Select
                      options={proficiencyOptions}
                      placeholder="Select proficiency"
                      className="w-[628px]"
                      value={lang.proficiency}
                      onChange={(e) =>
                        updateLanguage(lang.id, "proficiency", e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        onClick={() => removeLanguage(lang.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        aria-label="Delete language"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <PrimaryButton className="w-[300px] h-14 font-bold text-xl ">
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

const RateAndAvailabilityStep = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [availability, setAvailability] = useState("");

  return (
    <div className="space-y-12 mb-7">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <div className="space-y-4">
            <h3 className="font-semibold text-2xl">Hourly Rate</h3>
            <Input
              type="text"
              placeholder="Enter your hourly rate"
              className="w-full"
            />
          </div>
          <p className="text-[#818181] text-[12px]">
            This can be adjusted per project.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-2xl">Availability</h3>
        <p className="text-gray-500 text-sm">
          Select your preferred working hours
        </p>
        <div className="flex items-center justify-between">
          <div
            onClick={() => setAvailability("full-time")}
            className={`w-[411px] h-[60px] flex flex-col items-center justify-center ${availability === "full-time" ? "bg-primary-lime text-primary-teal" : "text-gray-500"} border border-primary-teal rounded-2xl p-2`}
          >
            <p className="text-gray-500 text-xl ">Full-time</p>
          </div>
          <div
            onClick={() => setAvailability("part-time")}
            className={`w-[411px] h-[60px] flex flex-col items-center justify-center ${availability === "part-time" ? "bg-primary-lime text-primary-teal" : "text-gray-500"} border border-primary-teal rounded-2xl p-2`}
          >
            <p className="text-gray-500 text-xl ">Part-time</p>
          </div>
          <div
            onClick={() => setAvailability("as-needed")}
            className={`w-[411px] h-[60px] flex flex-col items-center justify-center ${availability === "as-needed" ? "bg-primary-lime text-primary-teal" : "text-gray-500"} border border-primary-teal rounded-2xl p-2`}
          >
            <p className="text-gray-500 text-xl ">As needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
