"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import { formatNumberToK } from "@/utils";
import { ChartData } from "@/types";
import {
  extractDataFromStartToEnd,
  calculatePercentageDifference,
} from "@/utils";
import { getRewardData, getTotalRewards } from "@/lib/features/rewardSlice";
import { useSelector } from "react-redux";
export function Chart({ chartData }: { chartData: ChartData }) {
  const {labels, datasets } = useSelector(getRewardData)
  const totalRewards = useSelector(getTotalRewards)
  console.log('Total', totalRewards)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const data = {
    labels,
    datasets: datasets
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffff",
        bodyColor: "#000000",
        titleColor: "#000000",
        borderColor: "#dddddd",
        borderWidth: 1,
        displayColors: false,
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#A3AED0",
          padding: 10,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="px-8 py-5 border border-dark-200 rounded-[20px] flex flex-col gap-7">
      <div className="flex-between">
        <div className="flex-center bg-white text-dark-900 text-[13px] font-medium leading-6 tracking-[-0.02em] text-left py-2 px-4 w-max rounded-[7px] gap-1.5">
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={18}
            height={18}
          />
          <span>This month</span>
        </div>
        <div className="p-2.5 bg-white rounded-[10px]">
          <Image src="/icons/chart.svg" alt="chart" width={14} height={14} />
        </div>
      </div>
      <div className="flex-center">
        <div className="w-[25%]">
          <div>
            <h1 className="text-[34px] font-semibold leading-[42px] tracking-[-0.02em] text-left">
              ${formatNumberToK(totalRewards)}
            </h1>
            <span className="text-sm font-medium leading-6 tracking-[-0.02em] text-left text-[#A3AED0]">
              Total Rewards
              <span className="text-[#05CD99]">
              </span>
            </span>
          </div>
        </div>
        <div className="w-[75%] h-max self-end">
          <Line data={data} options={options as any} />
        </div>
      </div>
    </div>
  );
}
