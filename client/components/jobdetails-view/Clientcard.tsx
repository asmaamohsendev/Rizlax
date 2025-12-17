const ClientCard = () => {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="font-semibold mb-4">About the Client</h2>

      <div className="flex items-center gap-3 mb-4">
        <img
          src="./profile.jpg"
          alt="Client"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-medium">Celia Hane</p>
          <p className="text-sm text-gray-500">⭐ 4.9 / 5</p>
        </div>
      </div>

      <ul className="space-y-2 text-sm text-gray-600 mb-4">
        <li className="flex items-center gap-2 text-green-600">
          ✔ Payment Method Verified
        </li>
        <li className="flex items-center gap-2 text-green-600">
          ✔ Phone Number Verified
        </li>
      </ul>

      <div className="text-sm space-y-2">
        <Info label="Location" value="Dubai, UAE" />
        <Info label="Member Since" value="March 2024" />
        <Info label="Jobs Posted" value="15" />
        <Info label="Hire Rate" value="80%" />
        <Info label="Total Spent" value="$12,000" />
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <p className="flex justify-between text-gray-600">
    <span>{label}:</span>
    <span className="font-medium text-gray-800">{value}</span>
  </p>
);

export default ClientCard;
