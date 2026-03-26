# Practice-Final-Appretince-Test
Test Fagprøve i IT-Utviklerfag 

Den lokale turguiden

Dette prosjektet er en webapplikasjon hvor brukere kan utforske turstier, lese anmeldelser og legge inn egne anmeldelser når de er logget inn.

Applikasjonen er laget med Next.js, TypeScript, Sanity og Supabase, og er utviklet som en del av prøve/fagprøve i IT-utviklerfaget.

Teknologier
Next.js
TypeScript
Tailwind CSS
Shadcn
Sanity
Supabase
Kom i gang
1. Klon prosjektet
git clone <repo-url>
cd <prosjektnavn>
2. Installer avhengigheter
pnpm install
3. Sett opp miljøvariabler

Opprett en .env.local-fil i prosjektet og legg inn nødvendige miljøvariabler for Supabase og Sanity.

Eksempel:

NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
NEXT_PUBLIC_SANITY_PROJECT_ID=ditt_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

Hvis prosjektet bruker flere miljøvariabler, må disse også legges inn.

4. Start utviklingsserveren
pnpm dev

Applikasjonen vil da være tilgjengelig lokalt på:

http://localhost:3000
Bygg for produksjon
pnpm build
pnpm start
Funksjonalitet  
Se oversikt over turstier
Åpne detaljside for tur  
Lese anmeldelser
Registrere bruker og logge inn
Legge inn anmeldelse som innlogget bruker
Filtrere turstier
Kommentar

For at prosjektet skal fungere som forventet, må både Supabase og Sanity være satt opp med riktig struktur og miljøvariabler.
