import { ChartData } from "@/types";

export function shortenAddress(address: string, length: number = 6): string {
  if (address.length <= length * 2) {
    return address;
  }

  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function formatNumberToK(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
}

export function extractDataFromStartToEnd(data: ChartData) {
  const labels: string[] = [];
  const dataValues: number[] = [];

  // Start from the first entry (month) and go to the last entry
  for (const entry of data.data) {
    labels.push(entry.month);
    dataValues.push(entry.volume);
  }

  return { labels, dataValues };
}

export function calculatePercentageDifference(chartData: ChartData): string {
  if (chartData.data.length < 2) {
    throw new Error("Not enough data to calculate percentage difference");
  }

  const lastMonthData = chartData.data[chartData.data.length - 1];
  const monthBeforeLastData = chartData.data[chartData.data.length - 2];

  const difference = lastMonthData.volume - monthBeforeLastData.volume;
  const percentageDifference =
    (difference / Math.abs(monthBeforeLastData.volume)) * 100;

  return percentageDifference > 0
    ? `+${percentageDifference.toFixed(2)}%`
    : `${percentageDifference.toFixed(2)}%`;
}

export function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}
