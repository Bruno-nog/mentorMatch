"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RequestButton({
  mentorId,
  menteeId,
}: {
  mentorId: string;
  menteeId: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleSend() {
    if (!menteeId) {
      alert("You need to be logged in to request mentorship.");
      return;
    }

    const { error } = await supabase.from("mentorship_requests").insert({
      mentor_id: mentorId,
      mentee_id: menteeId,
      message,
    });

    if (error) {
      alert("Error sending request: " + error.message);
      return;
    }

    setSent(true);
    setOpen(false);
  }

  if (sent) {
    return <span className="text-green-600 text-sm font-medium">Request sent!</span>;
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white text-sm px-4 py-2 rounded whitespace-nowrap"
      >
        Request Mentorship
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-56">
      <textarea
        placeholder="Your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded p-2 text-sm"
        rows={3}
      />
      <button onClick={handleSend} className="bg-black text-white text-sm px-3 py-1 rounded">
        Send
      </button>
    </div>
  );
}