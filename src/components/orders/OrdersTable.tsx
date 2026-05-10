'use client'

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IOrder } from "@/types/general";
import { ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface OrderTableProps {
  orders: IOrder[];
}

export const OrderTable = ({ orders }: OrderTableProps) => {
  const router = useRouter();

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-center w-32 p-2 px-4 text-sm font-medium text-muted-foreground">
                Order ID
              </TableHead>
              <TableHead className="text-left p-2 px-4 text-sm font-medium text-muted-foreground">
                Products
              </TableHead>
              <TableHead className="text-center w-32 p-2 px-4 text-sm font-medium text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="text-center w-32 p-2 px-4 text-sm font-medium text-muted-foreground">
                Order Status
              </TableHead>
              <TableHead className="text-center w-32 p-2 px-4 text-sm font-medium text-muted-foreground">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-b border-border last:border-b-0 cursor-pointer hover:bg-muted/50 transition-all duration-200 ease-in-out"
                onClick={() => router.push(ROUTE.ORDER_DETAILS(order.id))}
              >
                <TableCell className="p-4 text-center text-sm font-medium text-foreground">
                  {order.id}
                </TableCell>

                <TableCell className="p-4 text-left">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-sm" data-slot="avatar">
                      <AvatarImage
                        src={order.products[0].product.images[0]}
                        alt={order.products[0].product.name}
                      />
                      <AvatarFallback className="rounded-sm">1</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground line-clamp-1">
                        {order.products[0].product.name}
                      </span>
                      {order.products.length > 1 && (
                        <Badge variant="yellow" className="text-xs">
                          +{order.products.length - 1} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="p-4 text-center text-sm text-muted-foreground">
                  {order.dateOfOrder}
                </TableCell>
                <TableCell className="p-4 text-center">
                  <Badge
                    variant={
                      order.fulfillmentStatus === 'Delivered' ? 'green' :
                        order.fulfillmentStatus === 'Shipped' ? 'blue' :
                          order.fulfillmentStatus === 'Processing' ? 'orange' :
                            order.fulfillmentStatus === 'Cancelled' ? 'red' :
                              'yellow'
                    }
                    className="whitespace-nowrap w-fit"
                  >
                    {order.fulfillmentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="p-4 text-center text-sm font-medium">
                  ₹{order.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};