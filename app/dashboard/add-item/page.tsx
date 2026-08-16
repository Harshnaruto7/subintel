"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addSubscription } from "@/lib/subscriptions";
import { getCategories, addCategory, Category } from "@/lib/categories";
import { CategoryIcon } from "@/components/category-icon";
import { ChevronDownIcon, Plus } from "lucide-react";
import { getServiceIconName } from "@/lib/service-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase-client";


const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];

export default function AddItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(() => getCategories());
   const { user } = useUser();
  const supabase = useSupabase();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [renewalDate, setRenewalDate] = useState("");
  const [notes, setNotes] = useState("");

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");

  function handleAddCategory() {
    if (!newCategoryLabel.trim()) return;
    const created = addCategory(newCategoryLabel.trim());
    setCategories(getCategories());
    setCategoryId(created.id);
    setNewCategoryLabel("");
    setAddingCategory(false);
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!name || !price || !categoryId || !user) return;

  const serviceIcon = getServiceIconName(name);

  await addSubscription(supabase, user.id, {
    name,
    categoryId,
    price: parseFloat(price),
    currency,
    billingCycle,
    renewalDate,
    notes,
    serviceIcon,
  });

  router.push("/dashboard");
}

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">Add Item</h1>
      <p className="text-gray-400 mb-6 text-center">Add a new subscription or app to track.</p>

      <Card>
        <CardHeader>
          <CardTitle>New Subscription</CardTitle>
          <CardDescription>Fill in the details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g. Netflix"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              {!addingCategory ? (
                <Select
                  value={categoryId}
                  onValueChange={(value) => setCategoryId(value ?? "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center gap-2">
                          <CategoryIcon categoryId={cat.id} className="h-4 w-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="New category name"
                    value={newCategoryLabel}
                    onChange={(e) => setNewCategoryLabel(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddCategory}>
                    Save
                  </Button>
                </div>
              )}
              {!addingCategory && (
                <button
                  type="button"
                  onClick={() => setAddingCategory(true)}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mt-1"
                >
                  <Plus className="h-3 w-3" /> Add new category
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 15.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <Label>Currency</Label>
                <Select
                  value={currency}
                  onValueChange={(value) => setCurrency(value ?? "USD")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label>Billing Cycle</Label>
                <Select
                  value={billingCycle}
                  onValueChange={(value) =>
                    setBillingCycle(value === "yearly" ? "yearly" : "monthly")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             <div className="flex flex-col gap-2 flex-1">
  <Label>Renewal Date</Label>

  <Popover>
    <PopoverTrigger
      render={
        <Button
          variant="outline"
          data-empty={!renewalDate}
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {renewalDate ? (
            format(new Date(renewalDate), "PPP")
          ) : (
            <span>Pick a date</span>
          )}

          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      }
    />

    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={renewalDate ? new Date(renewalDate) : undefined}
        onSelect={(date) => {
          setRenewalDate(date ? format(date, "yyyy-MM-dd") : "");
        }}
        defaultMonth={
          renewalDate ? new Date(renewalDate) : new Date()
        }
      />
    </PopoverContent>
  </Popover>
</div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any extra details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button type="submit" className="mt-2">
              Add Subscription
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}