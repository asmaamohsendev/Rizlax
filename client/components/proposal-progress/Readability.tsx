import { Clock, Briefcase, DollarSign, BarChart2, CheckCircle } from "lucide-react";

const skills = [
    "React",
    "JavaScript",
    "Tailwind",
    "UI Design",
    "UI Design",
    "Tailwind",
];

const Readability = () => {
    return (
        <div className="w-[850px]  bg-white rounded-2xl border p-6 space-y-8">

            {/* Header */}
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Front-End Developer for E-commerce Website
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Clock size={16} /> Posted: 3 Hours Ago
                    </span>
                    <span className="flex items-center gap-1">
                        <Briefcase size={16} /> Fixed Price
                    </span>
                    <span className="flex items-center gap-1">
                        <DollarSign size={16} /> $800 – $1000
                    </span>
                    <span className="flex items-center gap-1">
                        <BarChart2 size={16} /> Intermediate
                    </span>
                </div>
            </div>

            <hr />

            {/* Job Description */}
            <div className="space-y-2 w-[850px] ">
                <h2 className="font-semibold text-[20px] text-gray-900">Job Description</h2>
                <p className="text-gray-600 text-[14px] leading-relaxed">
                    We are looking for a skilled front-end developer to redesign our existing e-commerce website. The goal is to <br />improve user experience, optimize performance, and ensure full responsiveness across all devices.We are <br /> looking for a skilled front-end developer to redesign our existing e-commerce website. The goal is to improve <br /> user experience, optimize performance, and ensure full responsiveness across all devices.We are looking for <br /> a skilled front-end developer to redesign our existing e-commerce website. The goal is to improve user <br /> experience, optimize performance, and ensure full responsiveness across all devices.We are looking for a skilled <br /> front-end developer to redesign our existing e-commerce website. The goal is to improve user experience,<br /> optimize performance, and ensure full responsiveness across all devices.We are looking for a skilled front-end <br /> developer to redesign our existing e-commerce website. The goal is to improve user experience, optimize <br /> performance, and ensure full responsiveness across all devices.We are looking for a skilled front-end developer <br /> to redesign our existing e-commerce website. The goal is to improve user experience, optimize performance,<br /> and ensure full responsiveness across all devices.We are looking for a skilled front-end developer to redesign <br />our existing e-commerce website. The goal is to improve user experience, optimize performance, and ensure full <br /> responsiveness across all devices.We are looking for a skilled front-end developer to redesign our existing e- <br />commerce website. The goal is to improve user experience, optimize performance, and ensure full <br /> responsiveness across all devices.We are looking for a skilled front-end developer to redesign our existing e- <br />commerce website. The goal is to improve user experience, optimize performance, and ensure full <br /> responsiveness across all devices.
                </p>
            </div>

            {/* Required Skills */}
            <div className="space-y-3">
                <h2 className="font-semibold text-[20px] text-gray-900">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <hr />

            {/* Project Details */}
            <div className="space-y-4">
                <h2 className="font-semibold text-[20px] text-gray-900">Project Details</h2>

                <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                        <p className="text-gray-400">Expected Duration</p>
                        <p className=" text-[15px] text-gray-700 font-medium">2–3 weeks</p>
                    </div>

                    <div>
                        <p className="text-gray-400">Start Date</p>
                        <p className="text-gray-700 text[15px] font-medium">November 15, 2025</p>
                    </div>

                    <div>
                        <p className="text-gray-400 font-medium text[15px]">Location</p>
                        <p className="text-gray-700 font-medium text[15px]">Remote</p>
                    </div>

                    <div>
                        <p className="text-gray-400">Proposals Sent</p>
                        <p className="text-gray-700">25 – 40</p>
                    </div>
                </div>
            </div>

            <hr />

            {/* Footer */}
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle size={18} />
                Verified
            </div>
        </div>
    );
};

export default Readability;
