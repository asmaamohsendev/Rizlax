import { useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline";

/* ================= Types ================= */
type PersonalInfo = {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  about: string;
};

type InfoItemProps = {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
};

/* ================= Component ================= */
const PersonalInfoCard = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [data, setData] = useState<PersonalInfo>({
    fullName: "Celia Hane",
    title: "Senior UI/UX Designer",
    phone: "+1 202 555 0198",
    email: "john.roberts@email.com",
    about:
      `I’m a passionate UI/UX designer with over 5 years of experience crafting user-centered web and mobile applications. ` +
      `I focus on clean design, accessibility, and usability to create seamless digital experiences that help businesses grow. ` +
      `I’m a passionate UI/UX designer with over 5 years of experience crafting user-centered web and mobile applications. ` +
      `I focus on clean design, accessibility, and usability to create seamless digital experiences that help businesses grow. ` +
      `I’m a passionate UI/UX designer with over 5 years of experience crafting user-centered web and mobile applications. ` +
      `I focus on clean design, accessibility, and usability to create seamless digital experiences that help businesses grow.`,
  });

  const handleChange = <K extends keyof PersonalInfo>(
    key: K,
    value: PersonalInfo[K]
  ) => {
    setData({ ...data, [key]: value });
  };

  return (
    <div className="rounded-2xl border bg-white p-6 w-[850px]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Personal Information</h2>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
        >
          {isEditing ? (
            <>
              <CheckIcon className="h-4 w-4" />
              Save
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4" />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Info Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoItem
          label="Full Name"
          value={data.fullName}
          isEditing={isEditing}
          onChange={(v) => handleChange("fullName", v)}
        />

        <InfoItem
          label="Title"
          value={data.title}
          isEditing={isEditing}
          onChange={(v) => handleChange("title", v)}
        />

        <InfoItem
          label="Phone Number"
          value={data.phone}
          isEditing={isEditing}
          onChange={(v) => handleChange("phone", v)}
        />

        <InfoItem
          label="Email Address"
          value={data.email}
          isEditing={isEditing}
          onChange={(v) => handleChange("email", v)}
        />
      </div>

      {/* About Me */}
      <div className="mt-8">
        <p className="mb-2 text-sm font-medium text-gray-500">About me</p>

        {isEditing ? (
          <textarea
            value={data.about}
            onChange={(e) => handleChange("about", e.target.value)}
            rows={6}
            className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        ) : (
          <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
            {data.about}
          </p>
        )}
      </div>
    </div>
  );
};

/* ================= InfoItem ================= */
function InfoItem({ label, value, isEditing, onChange }: InfoItemProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>

      {isEditing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
      ) : (
        <p className="mt-1 text-base font-semibold text-gray-900">{value}</p>
      )}
    </div>
  );
}

export default PersonalInfoCard;
