from services.db import supabase

response = supabase.table("reports").select("*").limit(1).execute()

print("Supabase connected successfully!")
print(response.data)