"use client";

import React, { useState } from "react";
import {
  Search,
  AlertOctagon,
  CheckCircle,
  Truck,
  PackageCheck,
  XCircle,
  MoreVertical,
  Clock,
  Eye,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeUp } from "@/components/shared/AnimatedDiv";
import { toast } from "react-hot-toast";
import { updateOrderStatusByAdmin } from "@/lib/actions/orders";


export default function ManageOrders({ orderData: orders }) {
  console.log('orders', orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [disputedFilter, setDisputedFilter] = useState("all");

  // Selection states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filters logic


  const filteredOrders = orders?.filter((ord) => {
    const matchesSearch =
      ord.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.buyerInfo.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ord.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Action: Update Order Status
  const handleUpdateStatus = async (id, newStatus) => {
    console.log(id, newStatus);
    
    const data = {
      id,
      data: newStatus
    }
    const res = await updateOrderStatusByAdmin(data)

    if (res.modifiedCount > 0) {
      toast.success(`Order marked as ${newStatus}`);
    }
    setDetailsOpen(false);


  };



  // Status badges mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none gap-1 dark:bg-yellow-950/30 dark:text-yellow-300">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none gap-1 dark:bg-blue-950/30 dark:text-blue-300">
            <Clock className="h-3 w-3 animate-pulse" />
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-none gap-1 dark:bg-purple-950/30 dark:text-purple-300">
            <Truck className="h-3 w-3" />
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none gap-1 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none gap-1 dark:bg-red-950/30 dark:text-red-300">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
          <p className="mt-1 text-muted-foreground">
            Track customer deliveries.
          </p>
        </div>
      </FadeUp>

      {/* Search and Filters card */}
      <FadeUp delay={0.05}>
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search order ID, buyer, or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-full bg-background"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-full border px-3 py-1.5 text-sm bg-background"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Disputes:</span>
                <select
                  value={disputedFilter}
                  onChange={(e) => setDisputedFilter(e.target.value)}
                  className="rounded-full border px-3 py-1.5 text-sm bg-background"
                >
                  <option value="all">All orders</option>
                  <option value="disputed">Disputed only</option>
                  <option value="clean">No disputes</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </FadeUp>

      {/* Orders Table */}
      <FadeUp delay={0.1}>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Buyer Details</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Flags</TableHead>
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.length > 0 ? (
                filteredOrders?.map((ord) => (
                  <TableRow key={ord._id}>
                    <TableCell className="font-medium">
                      {ord.transactionId.slice(-10)}
                    </TableCell>

                    <TableCell>
                      <div className="font-semibold">
                        {ord.buyerInfo.userName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {ord.buyerInfo.customerEmail}
                      </div>
                    </TableCell>

                    <TableCell>{ord.productName}</TableCell>

                    <TableCell>
                      ৳{ord.price.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      {getStatusBadge(ord.orderStatus)}
                    </TableCell>

                    <TableCell className="">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedOrder(ord);
                          setDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </FadeUp>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Order # {selectedOrder?.id} Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">

              <div>
                <p className="text-sm text-muted-foreground">
                  Buyer Name
                </p>
                <p className="font-medium">
                  {selectedOrder.buyerInfo.userName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Buyer Email
                </p>
                <p>
                  {selectedOrder.buyerInfo.customerEmail}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Product
                </p>
                <p>
                  {selectedOrder.productName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Price
                </p>
                <p className="font-semibold">
                  ৳{selectedOrder.price.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Payment Status
                </p>
                <Badge>
                  {selectedOrder.paymentStatus}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Order Status
                </p>
                {getStatusBadge(selectedOrder.orderStatus)}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Transaction ID
                </p>
                <p className="font-mono text-sm break-all">
                  {selectedOrder.transactionId}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Date
                </p>
                <p>
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() =>
                    handleUpdateStatus(selectedOrder._id, "shipped")
                  }
                >
                  Ship
                </Button>

                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() =>
                    handleUpdateStatus(selectedOrder._id, "delivered")
                  }
                >
                  Deliver
                </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    handleUpdateStatus(selectedOrder._id, "cancelled")
                  }
                >
                  Cancel
                </Button>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
