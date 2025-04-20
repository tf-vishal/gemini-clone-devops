"use client";
import React, { useEffect, useState } from "react";
import DevPopover from "../dev-components/dev-popover";
import DevButton from "../dev-components/dev-button";
import { SiGooglegemini } from "react-icons/si";
import DevInput from "../dev-components/dev-input";
import { IoMdArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import geminiZustand from "@/utils/gemini-zustand";

const CustomGeminiKey = () => {
  const [geminiApi, setGeminiApi] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const { setGeminiApiKey, setToast } = geminiZustand();

  useEffect(() => {
    const storedKey = localStorage.getItem("geminiApiKey");
    if (storedKey) {
      setGeminiApi(storedKey);
      setGeminiApiKey(storedKey);
      setHasKey(true);
    } else {
      setGeminiApiKey(process.env.NEXT_PUBLIC_API_KEY as string);
    }
  }, []);

  const handleAddGeminiKey = () => {
    if (geminiApi) {
      setGeminiApiKey(geminiApi);
      localStorage.setItem("geminiApiKey", geminiApi);
      setToast("API Key added successfully");
      setHasKey(true);
    }
  };

  const handleRemoveGeminiKey = () => {
    setGeminiApiKey(process.env.NEXT_PUBLIC_API_KEY as string);
    localStorage.removeItem("geminiApiKey");
    setToast("API Key removed successfully");
    setGeminiApi("");
    setHasKey(false);
  };

  return (
    <DevPopover
      contentClick={false}
      popButton={
        <DevButton variant="v1" className="gap-2 text-sm md:!flex !hidden">
          <SiGooglegemini className="text-lg text-[#D96570]" />
          Try Gemini Advanced
        </DevButton>
      }
    >
      <div className="w-60 h-fit p-2 space-y-2">
        <a
          className="text-sm opacity-80 hover:underline hover:text-accentBlue"
          target="_blank"
          href="https://aistudio.google.com/app/apikey"
        >
          Add Your API Key <MdArrowOutward className="inline text-lg" />
        </a>

        <div
          className="flex gap-2"
        >
          <DevInput
            type="password"
            placeholder="Enter Gemini API Key"
            rounded="md"
            size="sm"
            value={geminiApi}
          onKeyDown={(e) => e.key === "Enter" && handleAddGeminiKey()}
            onChange={(e) => setGeminiApi(e.target.value)}
            reverseIcon
            icon={
              <DevButton onClick={hasKey ? handleRemoveGeminiKey : handleAddGeminiKey} type="submit" variant="v1" asIcon>
                {hasKey ? (
                  <MdDelete className="text-red-500" />
                ) : (
                  <IoMdArrowForward />
                )}
              </DevButton>
            }
          />
        </div>
      </div>
    </DevPopover>
  );
};

export default CustomGeminiKey;
