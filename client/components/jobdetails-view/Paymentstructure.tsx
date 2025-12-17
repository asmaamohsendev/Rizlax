const options = [
  "Single Payment at the End",
  "Two Milestones",
  "Three Milestones",
];

const PaymentStructure = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Payment Structure
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm cursor-pointer"
          >
            <input
              type="radio"
              name="payment"
              defaultChecked={index === 1}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentStructure;
