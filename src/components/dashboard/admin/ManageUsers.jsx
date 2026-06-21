"use client";

import React, { useState } from "react";
import {
  Search,
  UserX,
  UserCheck,
  Trash2,
  Shield,
  User,
  ShoppingBag,
  MoreVertical,
  Plus,
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


export default function ManageUsers({ users: userData }) {
  const [users, setUsers] = useState(userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Deletion state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Search and filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Action: Toggle Block/Unblock Status
  const handleToggleBlock = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          const newStatus = user.status === "active" ? "blocked" : "active";
          toast.success(
            `User "${user.name}" has been ${newStatus === "active" ? "unblocked" : "blocked"
            } successfully.`
          );
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  // Action: Change User Role
  const handleChangeRole = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          toast.success(`Role for "${user.name}" changed to ${newRole.toUpperCase()}.`);
          return { ...user, role: newRole };
        }
        return user;
      })
    );
  };

  // Action: Confirm Delete Click
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  // Action: Execute Deletion
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
    toast.success(`Account for "${userToDelete.name}" has been permanently deleted.`);
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="space-y-6">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="mt-1 text-muted-foreground">
              Monitor platform registrations, assign privileges, and moderate user accounts.
            </p>
          </div>
        </div>
      </FadeUp>

      {/* Filters card */}
      <FadeUp delay={0.05}>
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-full bg-background"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="rounded-full border px-3 py-1.5 text-sm bg-background"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-full border px-3 py-1.5 text-sm bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </FadeUp>

      {/* Users table */}
      <FadeUp delay={0.1}>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user._id} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-foreground/80 border">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex items-center gap-1.5">
                        {user.role === "admin" && (
                          <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
                            <Shield className="h-3 w-3" />
                            Admin
                          </Badge>
                        )}
                        {user.role === "seller" && (
                          <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                            <ShoppingBag className="h-3 w-3" />
                            Seller
                          </Badge>
                        )}
                        {user.role === "buyer" && (
                          <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                            <User className="h-3 w-3" />
                            Buyer
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="align-middle">
                      {user.status === "active" ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none dark:bg-emerald-900/40 dark:text-emerald-300">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-none dark:bg-red-900/40 dark:text-red-300">
                          Blocked
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground align-middle">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleToggleBlock(user.id)} className="cursor-pointer">
                            {user.status === "active" ? (
                              <>
                                <UserX className="mr-2 h-4 w-4 text-red-600" />
                                <span className="text-red-600 font-medium">Block User</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4 text-emerald-600" />
                                <span className="text-emerald-600 font-medium">Unblock User</span>
                              </>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleChangeRole(user.id, user.role === "buyer" ? "seller" : "buyer")}
                            className="cursor-pointer"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Toggle Buyer/Seller
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => confirmDelete(user)} className="cursor-pointer text-red-600 dark:text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No users found matching the filter criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </FadeUp>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete User Account</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to permanently delete the account for{" "}
              <strong className="text-foreground">{userToDelete?.name}</strong> ({userToDelete?.email})?
              This action cannot be undone and will remove all their system history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" className="rounded-full" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="rounded-full bg-red-600 text-white" onClick={handleDeleteUser}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
