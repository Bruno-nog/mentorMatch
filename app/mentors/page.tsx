import { createClient } from "@/lib/supabase/server";
import RequestButton from "./RequestButton";

export default async function MentorsPage() {
  const supabase = await createClient();

  const { data: mentors } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "mentor");

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-black-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find a Mentor</h1>

        <div className="space-y-4">
          {mentors?.map((mentor) => (
            <div key={mentor.id} className="bg-black p-6 rounded-lg shadow flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{mentor.name}</h2>
                <p className="text-gray-600 mt-1">{mentor.bio}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {mentor.skills?.map((skill: string) => (
                    <span key={skill} className="bg-black-100 text-sm px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <RequestButton mentorId={mentor.id} menteeId={user?.id ?? null} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}