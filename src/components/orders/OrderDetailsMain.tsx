'use client'

import mockOrders from "@/constants/mockOrders";
import { ROUTE } from "@/constants/routes";
import { ChevronRight } from "lucide-react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { IOrder } from "@/types/general";
import NoOrders from "./NoOrders";

export default function ProductDetailsMain() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id;
  const order: IOrder | undefined = mockOrders.find((o: IOrder) => o.id === orderId);

  if (!order) {
    return (
      <NoOrders
        title="No Order Details Found"
        message="The order you are looking for does not exist or has been removed."
        buttonLabel="Go Back to Orders"
        redirectTo={ROUTE.ORDERS}
      />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6 mt-1.5">
        <div className="flex items-center gap-2 cursor-default">
          <span
            className="text-muted-foreground cursor-pointer"
            onClick={() => router.push(ROUTE.ORDERS)}
          >
            Orders
          </span>
          <span className="text-muted-foreground">
            <ChevronRight size={12} />
          </span>
          <span className="text-foreground font-medium">{order.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-4">
          {/* Products */}
          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-base font-medium text-foreground">Products</h3>
            </div>
            <div className="px-4">
              <div className="space-y-0">
                {order.products.map((pro, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 pb-4"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={pro.product.images[0]}
                        alt={pro.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-section-border"
                        width={16}
                        height={16}
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-foreground">
                        {pro.product.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>Specifications</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right space-y-1">
                      <div className="text-sm text-muted-foreground">
                        {pro.quantity} * ₹
                        {pro.product.originalPrice.toFixed(2)}
                      </div>
                      <div className="font-semibold text-foreground">
                        ₹
                        {(
                          pro.quantity * pro.product.originalPrice
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-base font-medium text-foreground">
                Payment Summary
              </h3>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹xxxx</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">
                    -₹xxx
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹xx</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹xx</span>
                </div>
                <div className="my-3 h-[0.5px] w-full bg-border" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order Details */}
          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-base font-medium text-foreground">
                Order Details
              </h3>
            </div>
            <div className="px-4 pb-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {order.dateOfOrder}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RiMoneyRupeeCircleFill className="h-4.5 w-4.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium mb-0.5">Payment status</p>
                    <Badge variant={order.paymentStatus === "pending" ? "yellow" : "green"} className="flex items-center gap-1">
                      {order.paymentStatus === "pending" ? "Pending" : "Complete"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCartShopping className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Order status</p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-base font-medium text-foreground">
                Shipping Address
              </h3>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.houseName}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.district},{" "}
                    {order.shippingAddress.state} {order.shippingAddress.country}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.pincode}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};