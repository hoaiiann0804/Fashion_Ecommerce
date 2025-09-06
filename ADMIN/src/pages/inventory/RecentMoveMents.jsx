import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/Button";

const RecentMovements = ({ movements }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biến động gần đây</CardTitle>
        <CardDescription>Lịch sử nhập xuất kho mới nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {movements.map((movement) => (
            <div key={movement.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${movement.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {movement.type === 'in' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium text-sm">{movement.product}</div>
                  <div className="text-sm text-gray-500">
                    {movement.type === 'in' ? 'Nhập' : 'Xuất'} {movement.quantity} sản phẩm
                    {movement.supplier && ` từ ${movement.supplier}`}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{movement.date}</div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">Xem tất cả biến động</Button>
      </CardContent>
    </Card>
  );
};

export default RecentMovements;