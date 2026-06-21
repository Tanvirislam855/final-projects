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

// Initial Mock Orders
const INITIAL_ORDERS = [
  {
    id: "8491",
    buyer: "John Doe",
    buyerEmail: "john.doe@gmail.com",
    productName: "Organic Cotton T-Shirt",
    price: 850,
    status: "processing",
    disputed: true,
    disputeReason: "Buyer claims packaging was open and product was stained",
    date: "2026-06-19",
  },
  {
    id: "8492",
    buyer: "Kyle Reese",
    buyerEmail: "kyle.reese@future.net",
    productName: "Minimalist Leather Wallet",
    price: 1200,
    status: "shipped",
    disputed: false,
    date: "2026-06-20",
  },
  {
    id: "8493",
    buyer: "Katherine Brewster",
    buyerEmail: "kate.b@vetclinic.org",
    productName: "Handmade Ceramic Mug",
    price: 450,
    status: "pending",
    disputed: false,
    date: "2026-06-21",
  },
  {
    id: "8494",
    buyer: "John Doe",
    buyerEmail: "john.doe@gmail.com",
    productName: "Wireless Mechanical Keyboard",
    price: 4800,
    status: "delivered",
    disputed: false,
    date: "2026-06-15",
  },
  {
    id: "8495",
    buyer: "Sarah Connor",
    buyerEmail: "sarah@cyberdyne.com",
    productName: "Scented Soy Wax Candle",
    price: 380,
    status: "cancelled",
    disputed: false,
    date: "2026-06-14",
  },
  {
    id: "8496",
    buyer: "Marcus Wright",
    buyerEmail: "marcus.w@projectangel.com",
    productName: "Wireless Mechanical Keyboard",
    price: 4800,
    status: "processing",
    disputed: true,
    disputeReason: "Seller has not updated shipping info for 5 days",
    date: "2026-06-18",
  },
];

export default function ManageOrders() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [disputedFilter, setDisputedFilter] = useState("all");

  // Selection states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filters logic
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.includes(searchTerm) ||
      ord.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || ord.status === statusFilter;
    
    const matchesDisputed =
      disputedFilter === "all" ||
      (disputedFilter === "disputed" && ord.disputed) ||
      (disputedFilter === "clean" && !ord.disputed);

    return matchesSearch && matchesStatus && matchesDisputed;
  });

  // Action: Update Order Status
  const handleUpdateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === id) {
          toast.success(`Order #${ord.id} status updated to ${newStatus.toUpperCase()}`);
          return { ...ord, status: newStatus };
        }
        return ord;
      })
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Action: Resolve Dispute
  const handleResolveDispute = (id) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === id) {
          toast.success(`Dispute for Order #${ord.id} has been marked as RESOLVED.`);
          return { ...ord, disputed: false, disputeReason: undefined };
        }
        return ord;
      })
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => ({ ...prev, disputed: false, disputeReason: undefined }));
    }
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
            Track customer deliveries, update order fulfillment status, and resolve marketplace disputes.
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => (
                  <TableRow key={ord.id} className="hover:bg-muted/10">
                    <TableCell className="font-semibold align-middle">#{ord.id}</TableCell>
                    <TableCell>
                      <div className="text-sm font-semibold">{ord.buyer}</div>
                      <div className="text-xs text-muted-foreground">{ord.buyerEmail}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium align-middle">{ord.productName}</TableCell>
                    <TableCell className="text-sm font-semibold align-middle">৳{ord.price.toLocaleString()}</TableCell>
                    <TableCell className="align-middle">{getStatusBadge(ord.status)}</TableCell>
                    <TableCell className="align-middle">
                      {ord.disputed ? (
                        <Badge variant="destructive" className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 flex items-center gap-1 w-fit dark:bg-red-950/30 dark:text-red-300">
                          <AlertOctagon className="h-3 w-3" />
                          Disputed
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      <div className="flex justify-end items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          title="View Details"
                          onClick={() => {
                            setSelectedOrder(ord);
                            setDetailsOpen(true);
                          }}
                        >
                          <Eye className="h-4.5 w-4.5 text-muted-foreground" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUpdateStatus(ord.id, "processing")}>
                              Mark Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(ord.id, "shipped")}>
                              Mark Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(ord.id, "delivered")}>
                              Mark Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(ord.id, "cancelled")}>
                              Cancel Order
                            </DropdownMenuItem>
                            {ord.disputed && (
                              <DropdownMenuItem
                                onClick={() => handleResolveDispute(ord.id)}
                                className="text-emerald-600 dark:text-emerald-400 font-semibold"
                              >
                                Resolve Dispute
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No orders matching search filter criteria.
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
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">Customer:</span>
                  <span className="font-semibold text-foreground">{selectedOrder.buyer}</span>
                  <span className="text-xs text-muted-foreground block mt-0.5">{selectedOrder.buyerEmail}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Order Date:</span>
                  <span className="font-semibold text-foreground">{selectedOrder.date}</span>
                </div>
              </div>

              <div className="border-y py-3 space-y-2">
                <span className="text-xs text-muted-foreground block">Purchased Item:</span>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">{selectedOrder.productName}</span>
                  <span className="font-semibold text-foreground">৳{selectedOrder.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Fulfillment Status:</span>
                </div>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              {selectedOrder.disputed && (
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-3.5 dark:bg-red-950/20">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-semibold text-xs uppercase tracking-wider">
                    <AlertOctagon className="h-4.5 w-4.5" />
                    <span>Dispute Open</span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1.5 leading-relaxed">
                    {selectedOrder.disputeReason}
                  </p>
                  <Button
                    size="sm"
                    className="w-full mt-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleResolveDispute(selectedOrder.id)}
                  >
                    Resolve Dispute & Refund / Complete
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-xs text-muted-foreground">Fulfillment Actions:</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "shipped")}
                    disabled={selectedOrder.status === "shipped" || selectedOrder.status === "delivered" || selectedOrder.status === "cancelled"}
                  >
                    Ship Order
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                    disabled={selectedOrder.status === "delivered" || selectedOrder.status === "cancelled"}
                  >
                    Deliver Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
