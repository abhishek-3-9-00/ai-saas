"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Testimonials = [
  {
    name: "Abhishek",
    avatar: "A",
    title: "Software Engineer",
    description: "This is the best application ,I've used!",
  },
  {
    name: "Alice",
    avatar: "A",
    title: "Content Creator",
    description: "This tool has revolutionized my content production process!",
  },
  {
    name: "John",
    avatar: "J",
    title: "Digital Marketer",
    description:
      "I can't believe how much time and effort this AI tool saves me.",
  },
  {
    name: "Emily",
    avatar: "E",
    title: "Freelancer",
    description: "A game-changer for freelancers like me. Highly recommended!",
  },
  {
    name: "Michael",
    avatar: "M",
    title: "Blogger",
    description:
      "AI-powered content creation made my blogging life so much easier.",
  },
];
export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10 ">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
