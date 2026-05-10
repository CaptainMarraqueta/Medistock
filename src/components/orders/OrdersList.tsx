'use client'

import { OrderListHeader } from "./OrderListHeader"
import { OrderTable } from "./OrdersTable";
import { IOrder } from "@/types/general";
import mockOrders from "@/constants/mockOrders";
import NoOrders from "./NoOrders";
import { ROUTE } from "@/constants/routes";

export default function OrdersList() {
  const orders: IOrder[] = mockOrders;

  return (
    <div className="container p-4 md:p-8 space-y-4">
      <OrderListHeader />

      {!orders.length ? (
        <NoOrders
          title="No Orders Found"
          message="You don&apos;t have any orders yet. Once you place an order, it will show up here."
          buttonLabel="Start Shopping"
          redirectTo={ROUTE.ALL_PRODUCTS}
        />
      ) : (
        <OrderTable orders={orders} />
      )}

    </div>
  );
};