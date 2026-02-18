exports.handler = async (event) => {
  try {
    const datasetId = "d_e78db35440a41c0baff4e5f669532bd9";

    const upstream = new URL("https://data.gov.sg/api/action/datastore_search");
    upstream.searchParams.set("resource_id", datasetId);

    // forward query params (optional)
    const incoming = event.queryStringParameters || {};
    for (const [k, v] of Object.entries(incoming)) {
      if (v != null) upstream.searchParams.set(k, String(v));
    }

    const apiKey = process.env.TRAVEL_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing TRAVEL_API_KEY" }) };
    }

    const resp = await fetch(upstream.toString(), {
      headers: { "x-api-key": apiKey }
    });

    return {
      statusCode: resp.status,
      headers: { "content-type": resp.headers.get("content-type") || "application/json" },
      body: await resp.text()
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e?.message || "Function error" }) };
  }
};