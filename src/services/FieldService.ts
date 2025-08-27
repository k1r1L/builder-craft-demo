export type FieldPayload = {
    label: string;
    type: "multi-select";
    required: boolean;
    defaultValue: string;
    choices: string[];
    order: "alphabetical" | "as-entered";
  };
  
  const ENDPOINT = import.meta.env.VITE_POST_ENDPOINT as string;
  
  export async function postField(payload: FieldPayload) {
    if (!ENDPOINT) throw new Error("Missing VITE_POST_ENDPOINT");
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("POST payload:", payload);
    return res;
  }
  