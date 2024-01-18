import { Chart } from "@/components/pages/rewards/Chart";
import React from "react";
import { dummyChartData } from "@/constants";
import Rewards from "@/components/pages/rewards/Rewards";
import { dummyUserRewards } from "@/constants";

const page = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          Overview
        </h3>
        <Chart chartData={dummyChartData} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium leading-10 tracking-[-0.02em] text-left text-dark-200">
          Rewards
        </h3>
        <Rewards data={dummyUserRewards} />
      </div>
    </div>
  );
};

export default page;
