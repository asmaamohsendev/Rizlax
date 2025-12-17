const Milestone = ({ title }: { title: string }) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium mb-2">{title}</h4>

      <input
        type="text"
        placeholder="Description"
        className="w-full border rounded-lg p-2 text-sm mb-2"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Amount"
          className="border rounded-lg p-2 text-sm"
        />
        <input
          type="date"
          className="border rounded-lg p-2 text-sm"
        />
      </div>
    </div>
  );
};

export default Milestone;
