"use client";

import React, { useState } from "react";
import {
  Search,
  Check,
  X,
  Trash2,
  AlertTriangle,
  Eye,
  ExternalLink,
  Filter,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeUp } from "@/components/shared/AnimatedDiv";
import { toast } from "react-hot-toast";

// Initial Mock Products
const INITIAL_PRODUCTS = [
  {
    id: "p1",
    name: "Handmade Ceramic Mug",
    seller: "CeramicStudio",
    category: "Home & Living",
    price: 450,
    status: "pending",
    reports: 0,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=80&q=80",
  },
  {
    id: "p2",
    name: "Organic Cotton T-Shirt",
    seller: "EcoGrow",
    category: "Clothing",
    price: 850,
    status: "reported",
    reports: 3,
    reportReason: "Inappropriate description & misleading materials list",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=80&q=80",
  },
  {
    id: "p3",
    name: "Minimalist Leather Wallet",
    seller: "HideAndSeek",
    category: "Accessories",
    price: 1200,
    status: "approved",
    reports: 0,
    imageUrl: "https://images.unsplash.com/photo-1627124765135-562a0487000d?w=80&q=80",
  },
  {
    id: "p4",
    name: "Wireless Mechanical Keyboard",
    seller: "KeyTechs",
    category: "Electronics",
    price: 4800,
    status: "approved",
    reports: 0,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&q=80",
  },
  {
    id: "p5",
    name: "Scented Soy Wax Candle",
    seller: "EcoGrow",
    category: "Home & Living",
    price: 380,
    status: "pending",
    reports: 0,
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=80&q=80",
  },
  {
    id: "p6",
    name: "Designer Fake Watches",
    seller: "SuperTime",
    category: "Accessories",
    price: 9500,
    status: "reported",
    reports: 8,
    reportReason: "Counterfeit trademark infringement",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80",
  },
  {
    id: "p7",
    name: "Premium Bamboo Toothbrush Pack",
    seller: "GreenLife",
    category: "Personal Care",
    price: 250,
    status: "rejected",
    reports: 0,
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=80&q=80",
  },
];

export default function ManageProducts() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog and details viewing states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Filters logic
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      prod.status === statusFilter ||
      (statusFilter === "reported" && prod.status === "reported");

    return matchesSearch && matchesStatus;
  });

  // Action: Approve Product
  const handleApprove = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          toast.success(`Product "${p.name}" has been approved and listed!`);
          return { ...p, status: "approved", reports: 0 };
        }
        return p;
      })
    );
    if (selectedProduct?.id === id) {
      setSelectedProduct(prev => ({ ...prev, status: "approved" }));
    }
  };

  // Action: Reject Product
  const handleReject = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          toast.error(`Product "${p.name}" has been rejected/unlisted.`);
          return { ...p, status: "rejected" };
        }
        return p;
      })
    );
    if (selectedProduct?.id === id) {
      setSelectedProduct(prev => ({ ...prev, status: "rejected" }));
    }
  };

  // Action: Prompt Deletion
  const confirmDelete = (prod) => {
    setProductToDelete(prod);
    setDeleteOpen(true);
  };

  // Action: Execute Deletion
  const handleDelete = () => {
    if (!productToDelete) return;
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    toast.success(`Product "${productToDelete.name}" has been permanently deleted.`);
    setDeleteOpen(false);
    setProductToDelete(null);
    if (selectedProduct?.id === productToDelete.id) {
      setDetailsOpen(false);
    }
  };

  // Action: Open product detail dialog
  const handleViewDetails = (prod) => {
    setSelectedProduct(prod);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moderate Products</h1>
          <p className="mt-1 text-muted-foreground">
            Review listing requests, check reported complaints, and manage the marketplace catalog.
          </p>
        </div>
      </FadeUp>

      {/* Filter and search controls */}
      <FadeUp delay={0.05}>
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search product, seller, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-full bg-background"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-full border px-3 py-1.5 text-sm bg-background w-full sm:w-auto"
              >
                <option value="all">All listings</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="reported">Reported</option>
              </select>
            </div>
          </div>
        </Card>
      </FadeUp>

      {/* Products table */}
      <FadeUp delay={0.1}>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Product Image & Name</TableHead>
                <TableHead>Seller / Shop</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <TableRow key={prod.id} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="flex items-center gap-3.5">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="h-11 w-11 rounded-lg object-cover border"
                        />
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-1.5">
                            {prod.name}
                            {prod.status === "reported" && (
                              <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 gap-1 text-[10px] px-1.5 py-0">
                                <AlertTriangle className="h-3 w-3" />
                                {prod.reports} reports
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">ID: #{prod.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium align-middle">{prod.seller}</TableCell>
                    <TableCell className="text-sm text-muted-foreground align-middle">{prod.category}</TableCell>
                    <TableCell className="text-sm font-semibold align-middle">৳{prod.price}</TableCell>
                    <TableCell className="align-middle">
                      {prod.status === "approved" && (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none dark:bg-emerald-900/40 dark:text-emerald-300">
                          Approved
                        </Badge>
                      )}
                      {prod.status === "pending" && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-none dark:bg-purple-900/40 dark:text-purple-300">
                          Pending
                        </Badge>
                      )}
                      {prod.status === "rejected" && (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none dark:bg-gray-800 dark:text-gray-300">
                          Rejected
                        </Badge>
                      )}
                      {prod.status === "reported" && (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-none dark:bg-red-900/40 dark:text-red-300">
                          Reported
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          title="View Details"
                          onClick={() => handleViewDetails(prod)}
                        >
                          <Eye className="h-4.5 w-4.5 text-muted-foreground" />
                        </Button>

                        {prod.status !== "approved" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20"
                            title="Approve Listing"
                            onClick={() => handleApprove(prod.id)}
                          >
                            <Check className="h-4.5 w-4.5 text-emerald-600" />
                          </Button>
                        )}

                        {prod.status !== "rejected" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/20"
                            title="Reject/Unlist"
                            onClick={() => handleReject(prod.id)}
                          >
                            <X className="h-4.5 w-4.5 text-orange-600" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                          title="Delete Listing"
                          onClick={() => confirmDelete(prod)}
                        >
                          <Trash2 className="h-4.5 w-4.5 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No products found matching filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </FadeUp>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Product Review Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="h-28 w-28 rounded-lg object-cover border"
                />
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base">{selectedProduct.name}</h3>
                  <p className="text-xs text-muted-foreground">ID: #{selectedProduct.id}</p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Price: ৳{selectedProduct.price}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                    <Badge variant="secondary">Seller: {selectedProduct.seller}</Badge>
                  </div>
                </div>
              </div>

              {selectedProduct.status === "reported" && (
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-3.5 dark:bg-red-950/20">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-semibold text-sm">
                    <AlertTriangle className="h-4.5 w-4.5" />
                    <span>Report Details ({selectedProduct.reports} user reports)</span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1.5 leading-relaxed">
                    {selectedProduct.reportReason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  Current Status:
                  <span className="font-semibold uppercase text-foreground">{selectedProduct.status}</span>
                </div>
                <div className="flex gap-2">
                  {selectedProduct.status !== "approved" && (
                    <Button
                      size="sm"
                      className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                      onClick={() => handleApprove(selectedProduct.id)}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  )}
                  {selectedProduct.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-orange-600 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20 gap-1"
                      onClick={() => handleReject(selectedProduct.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-full bg-red-600 hover:bg-red-700 text-white gap-1"
                    onClick={() => confirmDelete(selectedProduct)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Product Listing</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to permanently delete the product{" "}
              <strong className="text-foreground">{productToDelete?.name}</strong>? This listing will
              be completely removed from all marketplace catalogs and search indexes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" className="rounded-full" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="rounded-full bg-red-600 text-white" onClick={handleDelete}>
              Delete Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
