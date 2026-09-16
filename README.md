# 🦅 Projeto Fênix - O Resgate da Soberania no RJ

Dashboard interativo, responsivo e *mobile-first* para planejamento, controle financeiro e execução da viagem ao Rio de Janeiro (22 a 28 de Setembro de 2026).

---

## 🌴 Sobre a Viagem
- **Datas:** 22 a 28 de Setembro de 2026 (7 Dias / 6 Noites)
- **Origem / Destino:** Itapeva, SP ➡️ Rio de Janeiro, RJ
- **Vibe:** Independência, natureza exuberante, trilhas, adrenalina e **zero álcool**.

---

## ⚡ Funcionalidades
1. **🗓️ Linha do Tempo dos 7 Dias:**
   - Atividades detalhadas por período (Amanhecer, Manhã, Tarde, Noite).
   - Checkboxes interativos com persistência em `localStorage`.
   - Destaques épicos: Asa Delta na Pedra Bonita, Samba na Pedra do Sal, Nascer do sol no Mirante Dona Marta, Trilha dos Morro Dois Irmãos e Desafio da Pedra da Gávea.
   - Alertas de segurança nas trilhas.

2. **💰 Controle de Orçamento (Budget Tracker):**
   - Comparativo entre orçamento estimado (R$ 3.490 total / R$ 2.440 essencial) e gastos reais.
   - Campo para inserção do valor real pago por categoria.
   - Barra de progresso dinâmica e cálculo de economia ou saldo restante.
   - Alternância de cenário (com e sem Asa Delta / Guia da Gávea).

3. **🎒 Checklist de Sobrevivência:**
   - Itens cruciais (Doleira, capinha à prova d'água, tênis de trilha, roupas leves, mapas offline).
   - Progresso percentual da bagagem.
   - Permite adicionar novos itens e categorias personalizadas.

4. **🔗 Central de Links & Reservas:**
   - Salve e acesse diretamente os links de bilhetes de ônibus, hostel, instrutor de voo livre e guia da Gávea.
   - Dicas e protocolos de segurança para curtir o Rio com tranquilidade.

5. **📱 Portabilidade & Modo Offline:**
   - Inclui versão independente `standalone.html` para abrir diretamente no navegador com duplo clique sem precisar de servidor Node.

---

## 🚀 Como Executar

### Opção 1: Via Node.js / Vite (Recomendado para desenvolvimento)
Na pasta do projeto:
```bash
npm install
npm run dev
```
O servidor iniciará em `http://localhost:3000`.

Para gerar o build de produção:
```bash
npm run build
```

### Opção 2: Visualização Direta (Sem Node.js)
Basta dar um duplo clique no arquivo `standalone.html` para abrir diretamente no seu navegador (Chrome, Edge, Safari, etc.).

---

## 📁 Documentos Originais
Os arquivos de especificação e roteiro originais estão guardados em [`docs/`](file:///C:/Users/jeffe/.gemini/antigravity/scratch/projeto-fenix-rj/docs/).
