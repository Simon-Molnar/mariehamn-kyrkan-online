

# Mariehamns katolska församling – Webbplats

## Design
- **Färgschema**: Vitt/ljust med varm guldton (#C5A355) som accent
- **Typografi**: Serif (Playfair Display) för rubriker, sans-serif (Inter) för brödtext
- **Stil**: Modern, minimalistisk, luftig layout

## Sidor

### 1. Startsida (/)
Hero med platshållarbild, församlingens namn och välkomsttext. Nästa gudstjänst visas dynamiskt från databasen. Snabblänkar till gudstjänster, sakrament, kontakt m.fl.

### 2. Gudstjänster (/gudstjanster)
Ordinarie mässtider + kalendervy med kommande gudstjänster. Filtrering per kategori (söndagsmässa, vardagsmässa, andakt, högtid). Data från Lovable Cloud.

### 3. Sakrament (/sakrament)
De sju sakramenten med kort beskrivning och kontaktuppmaning.

### 4. Verksamhet (/verksamhet)
Aktiviteter: söndagsskola, ungdomsgrupp, bibelstudium, kyrkkaffe, kyrkokör, diakoni.

### 5. Butik (/butik)
Platshållarsida: "Butiken öppnar snart".

### 6. Om oss (/om-oss)
Historia, koppling till Helsingfors katolska stift, uppdrag och gemenskap.

### 7. Kontakt (/kontakt)
Kontaktuppgifter, öppettider, inbäddad Google Maps.

### 8. Bli katolik (/bli-katolik)
RCIA-processen: förkatekumenat, katekumenat, reningsperiod, mystgogi.

### 9. Nyheter (/nyheter)
Nyhetslista med titel, datum och text från databasen.

### 10. Admin (/admin)
Inloggning med e-post/lösenord. CRUD för gudstjänster och nyheter. Skyddad med autentisering och admin-roll.

## Gemensamma komponenter
- **Header**: Församlingsnamn + "S:t Görans kyrka", navigation, hamburgarmeny på mobil
- **Footer**: Kontaktuppgifter, kort text, länk till katolinen.fi

## Databas (Lovable Cloud)
- **gudstjanster**: id, datum, tid, typ, kategori (enum), celebrant, notering, created_at
- **nyheter**: id, titel, innehall, publicerad, created_at
- **user_roles**: id, user_id, role (admin)
- Exempeldata: Söndagsmässor, vardagsmässor och påskhögtider jan–apr 2026. Två exempelnyheter.

## Autentisering
Admin-inloggning via Supabase Auth. Roller i separat user_roles-tabell. Inga profiler behövs utöver rollhantering.

