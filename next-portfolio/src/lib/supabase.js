import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient;

function getBrowserClient() {
	if (!browserClient) {
		browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
	}

	return browserClient;
}

export const supabase =
	typeof window === "undefined"
		? createClient(supabaseUrl, supabaseAnonKey)
		: getBrowserClient();
