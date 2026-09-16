# SYSTEM PROMPT / CONTEXT FOR AI SITE BUILDER

**Role:** You are an expert Frontend Developer and UI/UX Designer. 
**Task:** Build an interactive, mobile-responsive travel dashboard / web application for a personal trip to Rio de Janeiro.

## 1. Project Overview & Vibe
- **Project Title:** Projeto Fênix - O Resgate da Soberania no RJ
- **Dates:** September 22 to 28, 2026 (7 Days)
- **Vibe & Core Theme:** Independence, nature, sports, self-discovery, and zero alcohol. This is a "comeback" trip focused on health, adrenaline, and authentic connections. The design should feel energetic, empowering, and organized.

## 2. UI/UX Requirements
- **Color Palette:** Inspired by Rio de Janeiro.
  - Vibrant Greens (forest/Mata Atlântica)
  - Deep and Aqua Blues (ocean and sky)
  - Sunset Orange/Gold (Arpoador sunset vibes)
- **Typography:** Clean, modern, and readable sans-serif (e.g., Inter, Roboto, or Poppins).
- **Layout:** Dashboard style, highly readable on mobile (since it will be used during the trip). Use cards, collapsible sections (accordions), and clear typography.

## 3. Expected Features & Interactivity
- **Interactive Timeline:** A visually appealing chronological itinerary. Users should be able to check off days or activities.
- **Budget Tracker:** A dynamic visual component (like a pie chart or progress bar) showing estimated vs. actual costs based on the budget framework.
- **Link Saver / Resource Hub:** A dedicated section to paste and save URLs (bus tickets, hostel reservations, tour guides).
- **Survival Checklist:** Interactive checkboxes for pre-trip and packing items (e.g., waterproof phone case, money belt, hiking shoes).

## 4. The 7-Day Itinerary Data
Please build a timeline component using this data:

- **Day 1 (Sept 22) - Chegada & Reconhecimento:** 
  - Arrive via bus (Novo Rio), check-in at Social Hostel (Ipanema/Botafogo). 
  - Sunset at Pedra do Arpoador.
- **Day 2 (Sept 23) - O Grande Marco:** 
  - Morning: Voo Livre (Asa Delta) from Pedra Bonita landing in São Conrado. 
  - Afternoon: Bike ride around Lagoa Rodrigo de Freitas.
- **Day 3 (Sept 24) - Visual & Cultura:** 
  - Morning: Trilha do Morro da Urca (via Pista Claudio Coutinho). 
  - Night: Cultural night at Pedra do Sal (enjoying the samba, zero alcohol vibe).
- **Day 4 (Sept 25) - Esporte & Cartão Postal:** 
  - Sunrise: Mirante Dona Marta. 
  - Morning: Swim/Run at Copacabana (Posto 6).
- **Day 5 (Sept 26) - A Foto Épica:** 
  - Morning: Trilha do Morro Dois Irmãos (take mototáxi from Vidigal base). 
  - Afternoon: Relax at Leblon beach.
- **Day 6 (Sept 27) - O Desafio Final:** 
  - Morning: Trilha da Pedra da Gávea (Requires hired guide). 
  - Afternoon/Night: Rest and recovery.
- **Day 7 (Sept 28) - Retorno Triunfal:** 
  - Morning: Final beach walk. 
  - Afternoon: Check-out and bus back home to Itapeva.

## 5. Budget Breakdown Framework
Please build a budget visualization using these estimated categories (in BRL - R$):
- **Passagens (Ônibus SP-RJ):** R$ 500
- **Hospedagem (6 noites em Hostel):** R$ 480
- **Alimentação (Saudável/PFs):** R$ 910
- **Transporte Local (App/Metrô):** R$ 200
- **Passeios / Extras:** R$ 350
- **Asa Delta (Voo Livre):** R$ 900
- **Guia (Pedra da Gávea):** R$ 150
- **Total Estimated:** ~ R$ 3.490

**Instructions for the AI:** Render this as a fully functional single-page React/HTML application. Include mock states for the checkboxes and budget tracker so I can test the interactivity immediately.