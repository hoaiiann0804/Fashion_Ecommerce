import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import {clsx} from "clsx";
export const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={clsx("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center mt-1">
            {trend && (
              <span
                className={clsx(
                  "text-xs font-medium mr-1",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};