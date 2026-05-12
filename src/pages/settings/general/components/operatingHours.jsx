"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialHours = [
  {
    day: "Monday",
    enabled: true,
    open: "08:00",
    close: "20:00",
  },
  {
    day: "Tuesday",
    enabled: true,
    open: "08:00",
    close: "20:00",
  },
  {
    day: "Wednesday",
    enabled: true,
    open: "08:00",
    close: "20:00",
  },
  {
    day: "Thursday",
    enabled: true,
    open: "08:00",
    close: "20:00",
  },
  {
    day: "Friday",
    enabled: true,
    open: "08:00",
    close: "20:00",
  },
  {
    day: "Saturday",
    enabled: true,
    open: "09:00",
    close: "15:00",
  },
  {
    day: "Sunday",
    enabled: false,
    open: "08:00",
    close: "20:00",
  },
];

export default function OperatingHours() {
  const [hours, setHours] = useState(initialHours);

  const toggleDay = (index) => {
    const updated = [...hours];

    updated[index].enabled = !updated[index].enabled;

    setHours(updated);
  };

  const updateTime = (index, field, value) => {
    const updated = [...hours];

    updated[index][field] = value;

    setHours(updated);
  };

  const copyPreviousDay = (index) => {
    if (index === 0) return;

    const updated = [...hours];

    updated[index] = {
      ...updated[index],
      open: updated[index - 1].open,
      close: updated[index - 1].close,
      enabled: updated[index - 1].enabled,
    };

    setHours(updated);
  };

  return (
    <Card className="shadow-md border border-gray-300">
      <CardHeader className="border-b border-gray-300">
        <h3 className="text-lg font-semibold">Operating Hours</h3>

        <span className="text-xs text-muted-foreground">
          Used by the chatbot to answer availability inquiries.
        </span>
      </CardHeader>

      <CardContent className="-mt-6">
        {hours.map((item, index) => (
          <div
            key={item.day}
            className="flex items-center justify-between px-6 py-4 border-b border-gray-300  last:border-b-0"
          >
            <div className="flex items-center gap-4 min-w-[180px]">
              <Switch
                checked={item.enabled}
                onCheckedChange={() => toggleDay(index)}
              />

              <span className="font-medium text-sm w-[90px]">{item.day}</span>
            </div>

            <div className="flex items-center gap-4 flex-1">
              {item.enabled ? (
                <>
                  <Input
                    type="time"
                    value={item.open}
                    onChange={(e) => updateTime(index, "open", e.target.value)}
                    className="
    w-[130px]
    h-10
    rounded-lg
    border-gray-300
    text-sm
    shadow-md
    px-3
    [&::-webkit-calendar-picker-indicator]:opacity-100
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
    [&::-webkit-calendar-picker-indicator]:invert
  "
                  />
                  <span className="text-sm">to</span>

                  <Input
                    type="time"
                    value={item.close}
                    onChange={(e) => updateTime(index, "close", e.target.value)}
                    className="
    w-[130px]
    h-10
    rounded-lg
    border-gray-300
    shadow-md
    text-sm
    px-3
    [&::-webkit-calendar-picker-indicator]:opacity-100
    [&::-webkit-calendar-picker-indicator]:cursor-pointer
    [&::-webkit-calendar-picker-indicator]:invert
  "
                  />
                </>
              ) : (
                <span className="italic text-muted-foreground text-sm">
                  Closed
                </span>
              )}
            </div>

            <Button
              variant="ghost"
              className="shadow-sm cursor-pointer"
              size="icon"
              onClick={() => copyPreviousDay(index)}
              disabled={index === 0}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
