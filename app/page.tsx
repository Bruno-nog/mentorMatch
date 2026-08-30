import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">MentorMatch</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Connect with mentors who can help guide your career. Browse profiles and send a mentorship request in seconds.
      </p>
      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-black text-white px-6 py-3 rounded font-medium"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="border border-black px-6 py-3 rounded font-medium"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}