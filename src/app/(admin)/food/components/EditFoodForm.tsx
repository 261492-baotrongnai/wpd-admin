"use client";
import React from "react";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { Food } from "@/types/food.types";

interface EditProps {
  food: Food;
}

export default function EditFoodForm({ food }: EditProps) {
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
  };
  return (
    

        <form className="">
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            Edit Food Item: {food.name}
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>Name</Label>
              <Input type="text" placeholder={food.name} />
            </div>

            <div className="col-span-1">
              <Label>Description</Label>
              <Input type="text" placeholder={food.description} />
            </div>

            
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </form>

  );
}
