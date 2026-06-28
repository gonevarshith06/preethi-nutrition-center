"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Types
export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  weight?: string;
  height?: string;
  password?: string;
};

export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  healthGoal: string;
  reason: string;
  status: "Pending" | "Approved" | "Completed" | "Cancelled";
};

export type Post = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export type Blog = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  image: string;
  createdAt: string;
};

type GlobalContextType = {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const defaultBlogs: Blog[] = [
  {
    id: "nutrition-awareness-program",
    title: "Nutrition Awareness Program at Preethi Nutrition Center",
    excerpt: "Preethi Nutrition Center regularly conducts nutrition awareness programs, wellness seminars, and health education sessions to help individuals and families adopt healthier lifestyles through proper nutrition, fitness, and healthy habits.",
    content: `<div class="space-y-6">
  <p class="text-xl text-gray-700 italic border-l-4 border-pink-500 pl-4 py-2 bg-pink-50 rounded-r-lg">
    Preethi Nutrition Center regularly conducts nutrition awareness programs, wellness seminars, and health education sessions to help individuals and families adopt healthier lifestyles through proper nutrition, fitness, and healthy habits.
  </p>
  
  <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Event Highlights</h2>
  <ul class="list-disc pl-6 space-y-2 text-gray-700">
    <li><strong>Expert Speakers:</strong> Certified nutritionists and health experts sharing science-backed knowledge.</li>
    <li><strong>Interactive Q&A:</strong> Open sessions allowing attendees to clarify their doubts about diet myths.</li>
    <li><strong>Live Demonstrations:</strong> Showcasing easy-to-make, healthy, and nutrient-dense recipes.</li>
    <li><strong>Community Support:</strong> Connecting with like-minded individuals on similar health journeys.</li>
  </ul>

  <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Topics Discussed</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="font-bold text-pink-600 mb-2">Weight Management</h3>
      <p class="text-sm text-gray-600">Sustainable approaches to fat loss and muscle gain without extreme diets.</p>
    </div>
    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="font-bold text-pink-600 mb-2">Disease Prevention</h3>
      <p class="text-sm text-gray-600">Managing conditions like PCOS, Diabetes, and Thyroid issues through nutrition.</p>
    </div>
    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="font-bold text-pink-600 mb-2">Child Nutrition</h3>
      <p class="text-sm text-gray-600">Ensuring proper growth and immune support for kids.</p>
    </div>
    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="font-bold text-pink-600 mb-2">Everyday Fitness</h3>
      <p class="text-sm text-gray-600">Integrating movement into a busy lifestyle seamlessly.</p>
    </div>
  </div>

  <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why You Should Attend</h2>
  <p class="text-gray-700 leading-relaxed">
    Attending our workshops equips you with the necessary tools to make informed dietary choices. Education is the first step toward lasting transformation. By understanding the "why" behind nutrition rules, our clients find it much easier to stay consistent and achieve their health goals.
  </p>
</div>`,
    image: "https://res.cloudinary.com/dgveemazo/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-29_at_2.17.40_AM_p0clx9",
    createdAt: new Date().toLocaleDateString(),
  }
];

const defaultAdmin: User = {
  id: "admin-1",
  fullName: "Admin User",
  email: "admin@preethinutrition.com",
  phone: "N/A",
  role: "admin",
  // Hashed version of "Admin@123"
  password: "e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7"
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([defaultAdmin]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("pnc_currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));

    const storedUsers = localStorage.getItem("pnc_users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      const hasAdmin = parsedUsers.some((u: User) => u.role === "admin");
      setUsers(hasAdmin ? parsedUsers : [defaultAdmin, ...parsedUsers]);
    }

    const storedAppointments = localStorage.getItem("pnc_appointments");
    if (storedAppointments) setAppointments(JSON.parse(storedAppointments));

    const storedPosts = localStorage.getItem("pnc_posts");
    if (storedPosts) setPosts(JSON.parse(storedPosts));

    const storedProducts = localStorage.getItem("pnc_products");
    if (storedProducts) setProducts(JSON.parse(storedProducts));

    const storedBlogs = localStorage.getItem("pnc_blogs");
    if (storedBlogs) {
      let parsedBlogs = JSON.parse(storedBlogs);
      // Force update the old seminar image to the new one if they already have it saved
      parsedBlogs = parsedBlogs.map((b: Blog) => 
        b.id === "nutrition-awareness-program" && b.image === "/images/seminar.jpg"
          ? { ...b, image: "https://res.cloudinary.com/dgveemazo/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-29_at_2.17.40_AM_p0clx9" }
          : b
      );
      if (parsedBlogs.length > 0) {
        setBlogs(parsedBlogs);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pnc_currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pnc_users", JSON.stringify(users));
    }
  }, [users, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pnc_appointments", JSON.stringify(appointments));
    }
  }, [appointments, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pnc_posts", JSON.stringify(posts));
    }
  }, [posts, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pnc_products", JSON.stringify(products));
    }
  }, [products, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("pnc_blogs", JSON.stringify(blogs));
    }
  }, [blogs, isMounted]);

  const login = (user: User) => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  // Prevent hydration errors by not rendering children until mounted
  if (!isMounted) return null;

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        login,
        logout,
        users,
        setUsers,
        appointments,
        setAppointments,
        posts,
        setPosts,
        products,
        setProducts,
        blogs,
        setBlogs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
