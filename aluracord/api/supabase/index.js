import { createClient } from "@supabase/supabase-js";
import authConfig from '../../auth-config.json';

const supabaseClient = createClient(
    authConfig.supabase.url,
    authConfig.supabase.ANON_KEY
);

export async function fetchMessages() {
  const response = await supabaseClient.from("messages")
    .select("*")
    .order('created_at', { ascending: false });  
  if (!response.status == 200) throw new Error(response.status);
  return response.body;
}

export async function saveMessage(message) {
  const response = await supabaseClient.from("messages").insert(message);
  if (!response.status == 200) throw new Error(response.status);
  return response.body;
}

export async function deleteMessage(messageId) {
  const response = await supabaseClient.from('messages').delete().match({id: messageId});
  if (!response.status == 200) throw new Error(response.status);
  return response.body;
}
