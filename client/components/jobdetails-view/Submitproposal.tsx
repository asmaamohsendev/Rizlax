import PaymentStructure from '@/components/jobdetails-view/Paymentstructure'
import Milestone from '@/components/jobdetails-view/Milestone'

const SubmitProposal = () => {
  return (
    <div className="bg-white rounded-2xl border p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-6">Submit Your Proposal</h2>

      {/* Cover Letter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Cover Letter
        </label>
        <textarea
          placeholder="Briefly describe why you are the best fit for this job..."
          className="w-full h-28 border rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Budget & Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input label="Proposed Budget" placeholder="eg. $500" />
        <Input label="Estimated Delivery Time" placeholder="eg. 3 months" />
      </div>

      {/* Payment Structure */}
      <PaymentStructure />

      {/* Milestones */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h3 className="font-medium mb-4">Milestone Details</h3>

        <Milestone title="Milestone 1" />
        <Milestone title="Milestone 2" />

        <div className="flex justify-between text-sm font-medium mt-4">
          <span>Milestone Details</span>
          <span>Proposed Budget</span>
        </div>

        <div className="flex justify-between text-sm mt-1">
          <span>$6,500.00</span>
          <span>$6,500.00</span>
        </div>

        <p className="text-xs text-green-600 mt-2">
          ✔ Total amount matches the proposed budget.
        </p>
      </div>

      {/* Attachment */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Attachments <span className="text-gray-400">(Optional)</span>
        </label>

        <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-400">
          📎 Click to upload or drag and drop <br />
          PNG, JPG, PDF (Max 5MB)
        </div>
      </div>

      {/* Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Link <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="url"
          placeholder="http://your-link.com"
          className="w-full border rounded-lg p-3 text-sm"
        />
      </div>

      {/* Button */}
      <button className="w-full bg-gray-800 text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900">
        SEND PROPOSAL
      </button>
    </div>
  );
};

interface InputProps {
  label: string;
  placeholder: string;
}

const Input = ({ label, placeholder }: InputProps) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border rounded-lg p-3 text-sm"
    />
  </div>
);

export default SubmitProposal;
