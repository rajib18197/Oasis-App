import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filters =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy");
  const [field, direction] = sortByRaw?.split("-") || [];

  const sort = field ? { field, direction } : null;

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { bookings, count } = {},
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sort, page],
    queryFn: () => getBookings({ filters, sort, page }),
  });

  const pageSize = Math.ceil(count / 10);

  if (page < pageSize) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page + 1],
      queryFn: () => getBookings({ filters, sort, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page - 1],
      queryFn: () => getBookings({ filters, sort, page: page - 1 }),
    });
  }

  return { bookings, isPending, isError, error, count };
}

// প্রফেশনালভাবে কোড লেখা শেখার কয়েকটা উপায় -
// ⭕ আপনার যদি কোনো সিনিয়র বড় ভাই থাকে যে অলরেডি একজন দক্ষ এবং অভিজ্ঞ ডেভেলপার তাহলে তার সাথে লেগে থাকুন। যদি নিজের আপন বা পরিচিত ভাই না থাকে তাহলে কমিউনিটি থেকে একজন খুঁজে বের করুন। অভিজ্ঞ বড় ভাইয়েরা টেকনিক্যাল আড্ডা দেওয়ার মতো ভালো সঙ্গ পায় না। এরকম কোনো বড় ভাইয়ের সাথে যদি আপনার সম্পর্ক হয় তাহলে তার দশ বছরের অভিজ্ঞতা আপনি ১ বছরে শিখতে পারবেন।
// ⭕ যদি কোনো অভিজ্ঞ বড় ভাই না পাওয়া যায় তাহলে ওপেন সোর্স প্রজেক্ট একটা বড় ভরসা। প্রথম প্রথম বুঝতে অসুবিধা হলেও লেগে থাকতে হবে। তাদের কোডিং গাইডলাইন পড়ুন, কন্ট্রিবিউশন গাইডলাইন পড়ুন, ইস্যু - পিআর টেমপ্লেট দেখুন, কি কি টুলস ব্যবহার করেছে সেটা দেখুন, কিভাবে কোড স্ট্রাকচার করেছে সেটা বোঝার চেষ্টা করুন। কি কোড করেছে, কেন করেছে, কিভাবে করেছে বোঝার চেষ্টা করুন। কমিট হিস্টোরি ধরে ধরে চেঞ্জেস গুলো বোঝার চেষ্টা করুন। যা শিখছেন তা নিজের প্রজেক্টে প্রাক্টিস করুন, অল্প অল্প করে কন্ট্রিবিউট করার চেষ্টা করুন। Cal dot com একটা সুন্দর ওপেন সোর্স প্রজেক্ট।
// ⭕ কিছুই করার দরকার নেই। মোটামোটি কাজ শিখে একটা জব খুঁজুন। ভালো একটা টিমে যদি জব পেয়ে যান তাহলে আপনার টিম থেকেই সব কিছু শিখতে পারবেন। আর যদি ভালো কোম্পানিতে জব না হয় তাহলেও শিখতে পারবেন, তবে ঠেকে শিখতে হবে। নিজের করা ভুল গুলো যখন নিজেকেই রিফ্যাক্টর করতে হবে, ম্যানেজ করতে হবে, তখন তখন আস্তে আস্তে সব কিছু শিখে যাবেন।
// বিজয় দিবসের শুভেচ্ছা ❤️
