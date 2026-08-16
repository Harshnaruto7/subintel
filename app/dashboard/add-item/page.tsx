"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { ChevronDownIcon, Plus, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { addSubscription } from "@/lib/subscriptions";

import {
  getCategories,
  addCategory,
  Category,
} from "@/lib/categories";

import { CategoryIcon } from "@/components/category-icon";

import {
  getServiceIcon,
  getServiceIconName,
} from "@/lib/service-icons";

import { useSupabase } from "@/lib/supabase-client";

const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "AUD",
  "CAD",
];

export default function AddItemPage() {
  const router = useRouter();
  const { user } = useUser();
  const supabase = useSupabase();

  const [categories, setCategories] = useState<Category[]>(() =>
    getCategories()
  );

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");

  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "yearly"
  >("monthly");

  const [renewalDate, setRenewalDate] = useState("");
  const [notes, setNotes] = useState("");

  const [sendNotification, setSendNotification] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const [previousEmails, setPreviousEmails] = useState<string[]>([]);

  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");

  const detectedService = getServiceIcon(name);

  const accountEmail =
    user?.primaryEmailAddress?.emailAddress || "";

  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function loadPreviousEmails() {
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("notification_email")
          .eq("user_id", userId)
          .not("notification_email", "is", null);

        if (cancelled) return;

        if (error) {
          console.error(
            "Failed to load previous emails:",
            error
          );
          return;
        }

        const emails = Array.from(
          new Set(
            (data ?? [])
              .map((item) =>
                item.notification_email?.trim()
              )
              .filter(
                (email): email is string =>
                  Boolean(email)
              )
          )
        );

        setPreviousEmails(emails);
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to load previous emails:",
            error
          );
        }
      }
    }

    loadPreviousEmails();

    return () => {
      cancelled = true;
    };
  }, [userId, supabase]);

  function handleAddCategory() {
    if (!newCategoryLabel.trim()) {
      return;
    }

    const created = addCategory(
      newCategoryLabel.trim()
    );

    setCategories(getCategories());
    setCategoryId(created.id);
    setNewCategoryLabel("");
    setAddingCategory(false);
  }

  function openEmailDialog() {
    setNewEmail("");
    setEmailDialogOpen(true);
  }

  function closeEmailDialog() {
    setEmailDialogOpen(false);
  }

  function selectExistingEmail(email: string) {
    setSelectedEmail(email);
    setSendNotification(true);
    setEmailDialogOpen(false);
  }

  function selectNewEmail() {
    const email = newEmail.trim();

    if (
      !email ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      toast.add({
        title: "Invalid email",
        description:
          "Please enter a valid email address.",
        type: "warning",
      });

      return;
    }

    setSelectedEmail(email);
    setSendNotification(true);
    setEmailDialogOpen(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !price || !categoryId || !user) {
      toast.add({
        title: "Missing information",
        description:
          "Please fill in all required subscription details.",
        type: "warning",
      });

      return;
    }

    const notificationEmail: string | null =
      sendNotification
        ? selectedEmail.trim()
        : null;

    if (
      sendNotification &&
      (!notificationEmail ||
        !notificationEmail.includes("@") ||
        !notificationEmail.includes("."))
    ) {
      toast.add({
        title: "Email required",
        description:
          "Please choose or enter a valid notification email.",
        type: "warning",
      });

      return;
    }

    const serviceIcon = getServiceIconName(name);

    try {
      await addSubscription(
        supabase,
        user.id,
        {
          name,
          categoryId,
          price: parseFloat(price),
          currency,
          billingCycle,
          renewalDate,
          notes,
          serviceIcon,
          notificationEmail,
        }
      );

      toast.add({
        title: "Subscription added",
        description: `${name} was added successfully.`,
        type: "success",
      });

      if (sendNotification && notificationEmail) {
        const response = await fetch(
          "/api/subscriptions/created",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              price,
              currency,
              billingCycle,
              renewalDate,
              email: notificationEmail,
              serviceIcon,
            }),
          }
        );

        if (!response.ok) {
          let errorData;

          try {
            errorData = await response.json();
          } catch {
            errorData = {
              message: "Email request failed",
            };
          }

          console.error(
            "Subscription email failed:",
            errorData
          );

          toast.add({
            title: "Subscription added",
            description:
              "The subscription was added, but the notification email could not be sent.",
            type: "warning",
          });
        }
      }
    } catch (error) {
      console.error(
        "Failed to add subscription:",
        error
      );

      toast.add({
        title: "Could not add subscription",
        description:
          "Something went wrong while adding the subscription.",
        type: "error",
      });

      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">
        Add Item
      </h1>

      <p className="text-gray-400 mb-6 text-center">
        Add a new subscription or app to track.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>New Subscription</CardTitle>

          <CardDescription>
            Fill in the details below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                Name
              </Label>

              <div className="flex items-center gap-2">
                <Input
                  id="name"
                  placeholder="e.g. Netflix"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="flex-1"
                />

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted/40">
                  {(() => {
                    const Icon =
                      detectedService.icon;

                    return (
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color:
                            detectedService.color,
                        }}
                      />
                    );
                  })()}
                </div>
              </div>

              {detectedService && (
                <p className="text-xs text-muted-foreground">
                  Detected: {name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Category</Label>

              {!addingCategory ? (
                <Select
                  value={categoryId}
                  onValueChange={(value) =>
                    setCategoryId(value ?? "")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={cat.id}
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon
                            categoryId={cat.id}
                            className="h-4 w-4"
                          />

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
                    onChange={(e) =>
                      setNewCategoryLabel(
                        e.target.value
                      )
                    }
                  />

                  <Button
                    type="button"
                    onClick={handleAddCategory}
                  >
                    Save
                  </Button>
                </div>
              )}

              {!addingCategory && (
                <button
                  type="button"
                  onClick={() =>
                    setAddingCategory(true)
                  }
                  className="mt-1 flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                >
                  <Plus className="h-3 w-3" />
                  Add new category
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="price">
                  Price
                </Label>

                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 15.99"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  required
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label>Currency</Label>

                <Select
                  value={currency}
                  onValueChange={(value) =>
                    setCurrency(value ?? "USD")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <Label>Billing Cycle</Label>

                <Select
                  value={billingCycle}
                  onValueChange={(value) =>
                    setBillingCycle(
                      value === "yearly"
                        ? "yearly"
                        : "monthly"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="monthly">
                      Monthly
                    </SelectItem>

                    <SelectItem value="yearly">
                      Yearly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-1 flex-col gap-2">
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
                          format(
                            new Date(renewalDate),
                            "PPP"
                          )
                        ) : (
                          <span>
                            Pick a date
                          </span>
                        )}

                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />

                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        renewalDate
                          ? new Date(
                              renewalDate
                            )
                          : undefined
                      }
                      onSelect={(date) => {
                        setRenewalDate(
                          date
                            ? format(
                                date,
                                "yyyy-MM-dd"
                              )
                            : ""
                        );
                      }}
                      defaultMonth={
                        renewalDate
                          ? new Date(
                              renewalDate
                            )
                          : new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">
                Notes (optional)
              </Label>

              <Textarea
                id="notes"
                placeholder="Any extra details..."
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="email-notification"
                checked={sendNotification}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    openEmailDialog();
                  } else {
                    setSendNotification(false);
                    setSelectedEmail("");
                  }
                }}
              />

              <Label
                htmlFor="email-notification"
                className="cursor-pointer"
              >
                Send email notification
              </Label>

              {sendNotification &&
                selectedEmail && (
                  <span className="ml-auto max-w-[180px] truncate text-xs text-muted-foreground">
                    {selectedEmail}
                  </span>
                )}
            </div>

            <Button
              type="submit"
              className="mt-2"
            >
              Add Subscription
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={emailDialogOpen}
        onOpenChange={(open) => {
          setEmailDialogOpen(open);

          if (!open && !selectedEmail) {
            setSendNotification(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Email notification
            </DialogTitle>

            <DialogDescription>
              Choose where you want to receive the
              subscription notification.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-2">
            {accountEmail && (
              <button
                type="button"
                onClick={() =>
                  selectExistingEmail(
                    accountEmail
                  )
                }
                className={`flex items-center gap-3 rounded-lg border p-3 text-left transition hover:bg-muted/50 ${
                  selectedEmail === accountEmail
                    ? "border-primary bg-muted/40"
                    : "border-border"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {accountEmail}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Suggested · Account email
                  </p>
                </div>
              </button>
            )}

            {previousEmails.filter(
              (email) =>
                email !== accountEmail
            ).length > 0 && (
              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Previously used
                </p>

                <div className="flex flex-col gap-2">
                  {previousEmails
                    .filter(
                      (email) =>
                        email !==
                        accountEmail
                    )
                    .map((email) => (
                      <button
                        key={email}
                        type="button"
                        onClick={() =>
                          selectExistingEmail(
                            email
                          )
                        }
                        className={`flex items-center gap-3 rounded-lg border p-3 text-left transition hover:bg-muted/50 ${
                          selectedEmail === email
                            ? "border-primary bg-muted/40"
                            : "border-border"
                        }`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                          <Mail className="h-4 w-4" />
                        </div>

                        <span className="truncate text-sm">
                          {email}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Use another email
              </p>

              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={newEmail}
                  onChange={(e) =>
                    setNewEmail(
                      e.target.value
                    )
                  }
                />

                <Button
                  type="button"
                  onClick={selectNewEmail}
                >
                  Use
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                closeEmailDialog();
                setSendNotification(false);
                setSelectedEmail("");
                setNewEmail("");
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}