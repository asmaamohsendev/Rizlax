import React from "react";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
const WalletEarnings = () => {
  return (
    <div className="w-[414px] h-[627px] p-6 rounded-4xl border border-green-200 bg-white">
      {/* العنوان */}
      <h2 className="text-[32px] font-bold mb-6">Wallet & Earnings</h2>

      {/* البطاقات الصغيرة */}
      <div className="flex flex-col gap-4 mb-6">
        {/* بطاقة الرصيد المتاح */}
        <div className="bg-[#F3FFEE]  p-4 w-[366px] h-[87px] rounded-3xl">
          <p className="text-xl font-semibold">$250</p>
          <p className="text-xs text-[#999999]">Available Balance</p>
        </div>

        {/* بطاقة المبلغ المصروف */}
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xl font-semibold">$38,500</p>
          <p className="text-xs text-[#999999]">Total Spent</p>
        </div>

        {/* بطاقة المدفوعات المعلقة */}
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xl font-semibold">$450</p>
          <p className="text-xs text-[#999999]">Pending Payments</p>
        </div>
      </div>

      {/* زر السحب */}
      <PrimaryButton className="w-full py-3 mb-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 text-[#D1EE9C] font-semibold hover:brightness-110 transition">
        WITHDRAW FUNDS
      </PrimaryButton>

      {/* أزرار الإجراء */}
      <div className="flex flex-col gap-3">
        <SecondaryButton className="w-full py-2 rounded-full border border-gray-400 bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D] bg-clip-text text-transparent font-semibold hover:bg-gray-100 transition">
          VIEW TRANSACTIONS
        </SecondaryButton>
        <SecondaryButton className="w-full py-2 rounded-full border border-gray-400 bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D] bg-clip-text text-transparent font-semibold hover:bg-gray-100 transition">
          ADD PAYMENT METHOD
        </SecondaryButton>
      </div>
    </div>
  );
};

export default WalletEarnings;
