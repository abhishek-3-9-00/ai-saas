import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    // Unauthorized if user not authenticated
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Fetch user's subscription status
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    // Handling Stripe session creation based on subscription status
    let stripeSession;
    if (userSubscription && userSubscription.stripeCustomerId) {
      stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
    } else {
      stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "INR",
              product_data: {
                name: "ImaginAI",
                description: "Unlimited AI Generations",
              },
              unit_amount: 5000,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        metadata: { userId },
      });
    }

    // Return the Stripe session URL
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    // Handle errors and return a response
    console.error("Error occurred:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
