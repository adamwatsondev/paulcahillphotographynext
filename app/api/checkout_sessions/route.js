import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { line_items, total } = await req.json();

    if (!line_items || !total) {
      return new Response(
        JSON.stringify({ error: "Missing line_items or total" }),
        {
          status: 400,
        }
      );
    }

    console.log(line_items);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      payment_method_types: ["card"],
      line_items: line_items.map((item) => ({
        price_data: {
          currency: "gbp",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
          },
        },
        quantity: item.quantity,
      })),
      return_url: `${req.headers.get("origin")}/checkout/success`,
    });

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return new Response(JSON.stringify({ error: "Session ID is required" }), {
      status: 400,
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return new Response(
      JSON.stringify({
        status: session.status,
        customer_email: session.customer_details?.email,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}
