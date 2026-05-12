// "use client";

// import { useEffect, useState } from "react";
// import { CalendarIcon } from "lucide-react";
// import TimezoneSelect from "react-timezone-select";

// import { formatDate } from "@/lib/date";

// import { Calendar } from "@/components/ui/calendar";
// import { Field } from "@/components/ui/field";
// import { Button } from "@/components/ui/button";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export default function LocalizationSettings() {
//   const [selectedTimezone, setSelectedTimezone] =
//     useState(undefined);

//   const [date, setDate] = useState(new Date());

//   useEffect(() => {
//     setSelectedTimezone(
//       Intl.DateTimeFormat()
//         .resolvedOptions()
//         .timeZone
//     );
//   }, []);

//   return (
//     <div className="flex flex-col lg:flex-row gap-4 w-full">
//       <Field className="flex flex-col gap-2 flex-1">
//         <label className="text-sm font-semibold">
//           Timezone
//         </label>

//         <TimezoneSelect
//           value={selectedTimezone}
//           onChange={(timezone) =>
//             setSelectedTimezone(timezone.value)
//           }
//           styles={{
//             control: (base, state) => ({
//               ...base,
//               minHeight: "44px",
//               borderRadius: "0.5rem",
//               borderColor: state.isFocused
//                 ? "hsl(var(--ring))"
//                 : "hsl(var(--border))",
//               backgroundColor:
//                 "hsl(var(--background))",
//               boxShadow: "none",
//               fontSize: "14px",
//               "&:hover": {
//                 borderColor:
//                   "hsl(var(--border))",
//               },
//             }),

//             valueContainer: (base) => ({
//               ...base,
//               padding: "0 12px",
//             }),

//             input: (base) => ({
//               ...base,
//               margin: 0,
//               padding: 0,
//             }),

//             menu: (base) => ({
//               ...base,
//               borderRadius: "0.75rem",
//               overflow: "hidden",
//               zIndex: 50,
//             }),

//             menuList: (base) => ({
//               ...base,
//               maxHeight: "250px",
//             }),

//             option: (base, state) => ({
//               ...base,
//               fontSize: "14px",
//               backgroundColor:
//                 state.isFocused
//                   ? "hsl(var(--accent))"
//                   : "transparent",
//               color:
//                 "hsl(var(--foreground))",
//               cursor: "pointer",
//             }),

//             placeholder: (base) => ({
//               ...base,
//               color:
//                 "hsl(var(--muted-foreground))",
//             }),

//             singleValue: (base) => ({
//               ...base,
//               color:
//                 "hsl(var(--foreground))",
//             }),
//           }}
//         />
//       </Field>

//       <Field className="flex flex-col gap-2 flex-1">
//         <label className="text-sm font-semibold">
//           Date Format
//         </label>

//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               className="justify-between h-11 font-normal w-full"
//             >
//               {date
//                 ? formatDate(date)
//                 : "Select date"}

//               <CalendarIcon className="w-4 h-4 opacity-60" />
//             </Button>
//           </PopoverTrigger>

//           <PopoverContent
//             className="w-auto p-0"
//             align="start"
//           >
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={setDate}
//               timeZone={selectedTimezone}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       </Field>
//     </div>
//   );
// }