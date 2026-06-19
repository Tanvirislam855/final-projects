"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pencil,
  Tag,
  Gauge,
  DollarSign,
  FileText,
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Gaming",
  "Home Appliances",
  "Musical Instruments",
  "Sports",
];

const conditions = ["Like New", "Good", "Fair"];

const statusStyles = {
  available: "bg-emerald-500",
  sold: "bg-zinc-400",
  pending: "bg-amber-500",
};

// Small reusable section label — keeps the green accent consistent
// across every field group without repeating classes inline.
function SectionLabel({ icon: Icon, children }) {
  return (
    <Label className="flex items-center gap-1.5 text-emerald-900/80 font-medium">
      <Icon className="h-3.5 w-3.5 text-emerald-600" />
      {children}
    </Label>
  );
}

export default function EditProductDialog({ product }) {
  const [category, setCategory] = useState(product.category);
  const [condition, setCondition] = useState(product.condition);
  const [status, setStatus] = useState(product.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedProduct = {
      title: formData.get("title"),
      category,
      condition,
      price: Number(formData.get("price")),
      description: formData.get("description"),
      status,
    };

    console.log(updatedProduct);

    // await serverMutation(`/api/products/${product._id}`, updatedProduct, "PATCH");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-1.5 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">
        {/* Accent header strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" />

        <form onSubmit={handleSubmit}>
          <DialogHeader className="px-6 pt-5 pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Pencil className="h-4.5 w-4.5 text-emerald-700" />
              </div>
              <div>
                <DialogTitle className="text-emerald-950">Edit Product</DialogTitle>
                <DialogDescription>
                  Update your product information. Images cannot be changed here.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="max-h-[65vh] overflow-y-auto px-6 py-6 space-y-7">
            {/* Product details */}
            <div className="space-y-5">
              <div className="space-y-2">
                <SectionLabel icon={Tag}>Product Title</SectionLabel>
                <Input
                  name="title"
                  defaultValue={product.title}
                  placeholder="Product title"
                  className="focus-visible:ring-emerald-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <SectionLabel icon={Tag}>Category</SectionLabel>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="focus:ring-emerald-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <SectionLabel icon={Gauge}>Condition</SectionLabel>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="focus:ring-emerald-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <SectionLabel icon={DollarSign}>Price</SectionLabel>
                  <Input
                    type="number"
                    name="price"
                    defaultValue={product.price}
                    placeholder="Price"
                    className="focus-visible:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <SectionLabel icon={Gauge}>Status</SectionLabel>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="focus:ring-emerald-500">
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${statusStyles[status]}`} />
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available
                        </span>
                      </SelectItem>
                      <SelectItem value="sold">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-zinc-400" /> Sold
                        </span>
                      </SelectItem>
                      <SelectItem value="pending">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-500" /> Pending
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <SectionLabel icon={FileText}>Description</SectionLabel>
                <Textarea
                  rows={5}
                  name="description"
                  defaultValue={product.description}
                  placeholder="Product description"
                  className="focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            {/* Seller info — visually separated as a read-only block */}
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-emerald-700">
                <Lock className="h-3 w-3" />
                Seller Information &middot; Read only
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3 w-3" /> Name
                  </Label>
                  <Input
                    name="sellerName"
                    defaultValue={product.sellerInfo.name}
                    disabled
                    className="bg-white/70"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" /> Email
                  </Label>
                  <Input
                    name="sellerEmail"
                    defaultValue={product.sellerInfo.email}
                    disabled
                    className="bg-white/70"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" /> Phone
                  </Label>
                  <Input
                    name="sellerPhone"
                    defaultValue={product.sellerInfo.phone}
                    disabled
                    className="bg-white/70"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-emerald-100 bg-emerald-50/30">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Update Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}