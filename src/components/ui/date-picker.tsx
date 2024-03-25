import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import React from "react";
import * as Picker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
import "./date-picker.css";
import { Button } from "./button";

type Props = {
  value: Date;
  onChange: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
};
function DatePicker({ value, onChange, maxDate, minDate }: Props) {
  return (
    <Picker.DatePicker
      onChange={(date) => onChange(date as Date)}
      value={value}
      maxDate={maxDate}
      minDate={minDate}
      calendarClassName={
        "rounded-md w-[300px] space-y-5 shadow-md p-2 bg-background"
      }
      className={"rounded-md"}
      tileClassName={"p-2 text-sm text-gray-800"}
      next2Label={
        <Button variant={"outline"} className="h-7 w-7 " size={"icon"}>
          <ChevronsRight size={18} className="text-gray-400" />
        </Button>
      }
      prev2Label={
        <Button variant={"outline"} className="h-7 w-7 " size={"icon"}>
          <ChevronsLeft size={18} className="text-gray-400" />
        </Button>
      }
      nextLabel={
        <Button variant={"outline"} className="h-7 w-7 " size={"icon"}>
          <ChevronRight size={18} className="text-gray-400" />
        </Button>
      }
      prevLabel={
        <Button variant={"outline"} className="h-7 w-7 " size={"icon"}>
          <ChevronLeft size={18} className="text-gray-400" />
        </Button>
      }
    />
  );
}

export default DatePicker;
