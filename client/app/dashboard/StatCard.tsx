import { LucideIcon } from "lucide-react";
import React, { JSX } from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col md:row-span-1 xl:row-span-2 bg-surface col-span-1 shadow-md rounded-2xl justify-between  transition-colors duration-300">
      {/* header */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-foreground">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr className="border-border-main" />
      </div>

      {/* body */}
      <div className="flex mb-2 items-center justify-around gap-4 px-5 overflow-y-auto">
        <div className="rounded-full p-5 bg-blue-50 dark:bg-blue-900/20 border-sky-300 dark:border-sky-800 border">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                <span className="text-gray-500 dark:text-gray-400">
                  {detail.title}
                </span>
                <span className="font-bold text-foreground">
                  {detail.amount}
                </span>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`size-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />

                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && (
                <hr className="border-border-main" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
