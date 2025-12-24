import { FileText } from "lucide-react";

const Proposaldetails = () => {
  return (
    <div className=" flex flex-col gap-4 w-[850px] h-[924px] bg-white rounded-2xl border p-6 ">

      {/* Title */}
      <h1 className="text-[32px] font-semibold text-gray-900">
        Your Proposal
      </h1>

      {/* Cover Letter */}
      <div className="space-y-3">
        <h2 className="font-semibold text-[20px] text-gray-900">
          Cover Letter
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
                  We are looking for a skilled front-end developer to redesign our existing e-commerce website. The goal is to <br />improve user experience, optimize performance, and ensure full responsiveness across all devices.We are <br /> looking for a skilled front-end developer to redesign our existing e-commerce website. The goal is to improve <br /> user experience, optimize performance, and ensure full responsiveness across all devices.We are looking for <br /> a skilled front-end developer to redesign our existing e-commerce website. The goal is to improve user <br /> experience, optimize performance, and ensure full responsiveness across all devices.We are looking for a skilled <br/> front-end developer to redesign our existing e-commerce website. The goal is to improve user experience,<br/> optimize performance, and ensure full responsiveness across all devices.We are looking for a skilled front-end <br/> developer to redesign our existing e-commerce website. The goal is to improve user experience, optimize <br/> performance, and ensure full responsiveness across all devices.We are looking for a skilled front-end developer <br/> to redesign our existing e-commerce website. The goal is to improve user experience, optimize performance,<br/> and ensure full responsiveness across all devices.We are looking for a skilled front-end developer to redesign <br/>our existing e-commerce website. The goal is to improve user experience, optimize performance, and ensure full <br/> responsiveness across all devices.We are looking for a skilled front-end developer to redesign our existing e- <br/>commerce website. The goal is to improve user experience, optimize performance, and ensure full <br/> responsiveness across all devices.We are looking for a skilled front-end developer to redesign our existing e- <br/>commerce website. The goal is to improve user experience, optimize performance, and ensure full <br/> responsiveness across all devices.

        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-6 text-sm">
        <div>
          <p className="text-gray-400">Proposed paid</p>
          <p className="text-gray-900 font-medium">$1000</p>
        </div>

        <div>
          <p className="text-gray-400">Estimated Duration</p>
          <p className="text-gray-900 font-medium">Less than 1 month</p>
        </div>

        <div>
          <p className="text-gray-400">Link</p>
          <a
            href="https://delicious-finisher.org"
            className="text-blue-600 hover:underline break-all"
          >
            https://delicious-finisher.org
          </a>
        </div>

        <div>
          <p className="text-gray-400">Payment Type</p>
          <p className="text-gray-900 font-medium">Milestone</p>
        </div>
      </div>

      {/* Attachments */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">
          Attachments
        </h2>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between p-4 border rounded-xl bg-[#F8F8F8] w-[789px] h-[83px]"
          >
            <div className="flex items-center gap-3 ">
              <FileText className="text-gray-500 ]" size={20} />
              <span className="text-sm text-gray-700">
                Portfolio_ux_designer_pdf
              </span>
            </div>

            <button className="text-sm font-medium text-blue-600 hover:underline">
              DOWNLOAD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposaldetails;
