import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const plans = [
    {
      name: "Free Plan",
      description: "Perfect for getting started",
      price: "₹0",
      features: [
        "Boost engagement with target responses",
        "Automate comment replies to enhance audience interaction",
        "Turn followers into customers with targeted messaging",
      ],
      cta: "Get Started",
    },
    {
      name: "Smart AI Plan",
      description: "Advanced features for power users",
      price: "₹999",
      features: [
        "All features from Free Plan",
        "AI-powered response generation",
        "Advanced analytics and insights",
        "Priority customer support",
        "Custom branding options",
      ],
      cta: "Upgrade Now",
    },
  ];

  return (
    <main>
      <section className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative">
          <div className="container px-2 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/Slide.png"
                  alt="Slide Logo"
                  width={160}
                  height={40}
                  className="object-contain"
                />
              </div>
              <nav className="hidden space-x-6 text-sm text-blue-200 md:block">
                <Link href="#features">Features</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#about">About</Link>
              </nav>
              <Button className="bg-white text-primary hover:bg-violet-100">
                <Link href="/dashboard">Login</Link>
              </Button>
            </div>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Supercharge Your Instagram Engagement with Slide
              </h1>

              <p className="mt-6 text-lg text-blue-200">
                Slide transforms the way businesses engage with their Instagram
                audience. By automating responses convert conversations into
                valuable business opportunities.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 hover:bg-blue-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-40 md:h-80 w-full mt-10">
              <Image
                src="/Ig-creators.png"
                alt="Community member"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container w-full py-4 md:py-8 lg:py-12 bg-dot-pattern relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-background z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              Discover how Slide helps you maximize your engagement on Instagram
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Smart Responses</CardTitle>
                <CardDescription>AI-powered comment management</CardDescription>
              </CardHeader>
              <CardContent>
                Automatically generate contextual responses to comments using
                advanced AI technology.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track your performance</CardDescription>
              </CardHeader>
              <CardContent>
                Get detailed insights into your engagement metrics and audience
                interaction patterns.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Custom Rules</CardTitle>
                <CardDescription>Tailored automation</CardDescription>
              </CardHeader>
              <CardContent>
                Create custom response rules based on keywords, user profiles,
                and comment types.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="container w-full py-4 md:py-8 lg:py-12 bg-dot-pattern relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-background z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your Plan
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              Select the perfect plan to boost your Instagram engagement
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{plan.cta}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="container w-full py-4 md:py-8 lg:py-12 bg-dot-pattern relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-background z-0"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              About Slide
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              We&apos;re on a mission to help creators and businesses build
              meaningful connections on Instagram
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Our Story</h3>
              <p className="text-muted-foreground">
                Slide was born from a simple idea: make Instagram engagement
                more meaningful and manageable. We understand the challenges
                creators face in maintaining authentic connections with their
                growing audience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground">
                We&apos;re dedicated to providing tools that help you maintain
                authentic relationships with your followers while saving time
                through intelligent automation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
