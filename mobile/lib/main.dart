import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

Future<void> launchWebUrl(String url) async {
  final uri = Uri.parse(url);
  if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
    debugPrint('Could not launch $url');
  }
}

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProjetoFenixApp());
}

class ProjetoFenixApp extends StatelessWidget {
  const ProjetoFenixApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Refúgio & Recomeço',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFFAF8F5),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF292524),
          background: const Color(0xFFFAF8F5),
          primary: const Color(0xFF1C1917),
          surface: Colors.white,
        ),
        fontFamily: 'Roboto',
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    ComparatorScreen(),
    SimulatorScreen(),
    NotesScreen(),
    ChecklistScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white.withOpacity(0.85),
        elevation: 0,
        scrolledUnderElevation: 1,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              'Refúgio & Recomeço',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1C1917),
              ),
            ),
            Text(
              'Janela: 19 a 28 de Setembro • Retorno Itapeva',
              style: TextStyle(
                fontSize: 11,
                color: Color(0xFF78716C),
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.open_in_browser, color: Color(0xFF44403C)),
            tooltip: 'Abrir no Cloudflare',
            onPressed: () => launchWebUrl('https://projeto-fenix.jeffef.workers.dev'),
          ),
        ],
      ),
      body: _screens[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: Colors.white,
        indicatorColor: const Color(0xFFF5F2EB),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.compare_arrows_outlined),
            selectedIcon: Icon(Icons.compare_arrows, color: Color(0xFF1C1917)),
            label: 'Destinos',
          ),
          NavigationDestination(
            icon: Icon(Icons.tune_outlined),
            selectedIcon: Icon(Icons.tune, color: Color(0xFF1C1917)),
            label: 'Simulador',
          ),
          NavigationDestination(
            icon: Icon(Icons.edit_note_outlined),
            selectedIcon: Icon(Icons.edit_note, color: Color(0xFF1C1917)),
            label: 'Caderno',
          ),
          NavigationDestination(
            icon: Icon(Icons.checklist_outlined),
            selectedIcon: Icon(Icons.checklist, color: Color(0xFF1C1917)),
            label: 'Mala',
          ),
        ],
      ),
    );
  }
}

// ----------------------------------------------------
// 1. COMPARATOR SCREEN
// ----------------------------------------------------
class ComparatorScreen extends StatefulWidget {
  const ComparatorScreen({super.key});

  @override
  State<ComparatorScreen> createState() => _ComparatorScreenState();
}

class _ComparatorScreenState extends State<ComparatorScreen> {
  int _selectedDest = 0; // 0 = Floripa, 1 = Rio

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Destination Selector Pills
        Container(
          padding: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            color: const Color(0xFFF5F2EB),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () => setState(() => _selectedDest = 0),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      color: _selectedDest == 0 ? Colors.white : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: _selectedDest == 0
                          ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)]
                          : null,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '🌿 Florianópolis (SC)',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: _selectedDest == 0 ? FontWeight.bold : FontWeight.w500,
                        color: _selectedDest == 0 ? const Color(0xFF047857) : const Color(0xFF78716C),
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: GestureDetector(
                  onTap: () => setState(() => _selectedDest = 1),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      color: _selectedDest == 1 ? Colors.white : Colors.transparent,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: _selectedDest == 1
                          ? [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4)]
                          : null,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '🏖️ Rio de Janeiro (RJ)',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: _selectedDest == 1 ? FontWeight.bold : FontWeight.w500,
                        color: _selectedDest == 1 ? const Color(0xFFB45309) : const Color(0xFF78716C),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        if (_selectedDest == 0) _buildFloripaCard() else _buildRioCard(),
      ],
    );
  }

  Widget _buildFloripaCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFA7F3D0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                '🌿 Florianópolis, SC',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF1C1917)),
              ),
              Text(
                '~8h a 9h de ônibus',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF047857)),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'Território virgem • Zero lembranças do passado • Segurança alta',
            style: TextStyle(fontSize: 12, color: Color(0xFF047857), fontWeight: FontWeight.w500),
          ),
          const Divider(height: 24),

          _buildFeature('📷 Trilhas & Fotos Épicas', 'Pedra da Coroa (Lagoinha do Leste): foto monumental sobre a pedra suspensa com praia selvagem abaixo. Dunas da Joaquina e Trilha do Gravatá.'),
          const SizedBox(height: 12),
          _buildFeature('🌙 Noite Solo & Bares', 'Centrinho da Lagoa da Conceição: dezenas de barzinhos com mesas na calçada, fácil entrosar e sentar sozinho no balcão.'),
          const SizedBox(height: 12),
          _buildFeature('🏖️ Praias', 'Praia do Campeche (mar aberto e altinha) e Praia Mole (quiosques e point jovem).'),
          const SizedBox(height: 12),
          _buildFeature('🛏️ Quarto Privativo', 'Estúdio no Airbnb ou pousada na Lagoa da Conceição ou Campeche. Ar-condicionado, cama confortável e silêncio.'),
          const Divider(height: 24),

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => launchWebUrl('https://www.clickbus.com.br/onibus/curitiba-pr/florianopolis-todos-sc'),
                  style: OutlinedButton.styleFrom(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Ônibus Floripa ↗', style: TextStyle(fontSize: 12)),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton(
                  onPressed: () => launchWebUrl('https://www.airbnb.com.br/s/Lagoa-da-Concei%C3%A7%C3%A3o--Florian%C3%B3polis---SC/homes?room_types%5B%5D=Entire%20home%2Fapt'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1C1917),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Airbnb Lagoa ↗', style: TextStyle(fontSize: 12)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildRioCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFFDE68A)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                '🏖️ Rio de Janeiro, RJ',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF1C1917)),
              ),
              Text(
                '~10h de ônibus',
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFB45309)),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'O resgate da soberania • Nova narrativa • Zero nostalgia',
            style: TextStyle(fontSize: 12, color: Color(0xFFB45309), fontWeight: FontWeight.w500),
          ),
          const Divider(height: 24),

          _buildFeature('📷 Trilhas & Fotos Épicas', 'Morro Dois Irmãos (vista definitiva de Ipanema/Leblon), Voo Livre de Asa Delta na Pedra Bonita e Pôr do Sol no Arpoador.'),
          const SizedBox(height: 12),
          _buildFeature('🌙 Noite Solo & Bares', 'Baixo Botafogo (BotaSoho): rua Nelson Mandela cheia de mesas na calçada e dezenas de opções para conversar.'),
          const SizedBox(height: 12),
          _buildFeature('🏖️ Praias', 'Ipanema Posto 9 (social na areia) e Copacabana Posto 6 (mar calmo e caminhada).'),
          const SizedBox(height: 12),
          _buildFeature('🛏️ Quarto Privativo', 'Flat ou estúdio privativo em Botafogo (metrô perto) ou Copacabana a 2 quadras da praia.'),
          const Divider(height: 24),

          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => launchWebUrl('https://www.clickbus.com.br/onibus/sao-paulo-sp/rio-de-janeiro-todos-rj'),
                  style: OutlinedButton.styleFrom(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Ônibus Rio ↗', style: TextStyle(fontSize: 12)),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton(
                  onPressed: () => launchWebUrl('https://www.airbnb.com.br/s/Botafogo--Rio-de-Janeiro---RJ/homes?room_types%5B%5D=Entire%20home%2Fapt'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1C1917),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('Airbnb Botafogo ↗', style: TextStyle(fontSize: 12)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFeature(String title, String desc) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF292524))),
        const SizedBox(height: 2),
        Text(desc, style: const TextStyle(fontSize: 12, color: Color(0xFF78716C), height: 1.4)),
      ],
    );
  }
}

// ----------------------------------------------------
// 2. SIMULATOR SCREEN
// ----------------------------------------------------
class SimulatorScreen extends StatefulWidget {
  const SimulatorScreen({super.key});

  @override
  State<SimulatorScreen> createState() => _SimulatorScreenState();
}

class _SimulatorScreenState extends State<SimulatorScreen> {
  double _days = 6;
  int _roomRate = 180;
  int _foodRate = 130;
  int _busCost = 480;

  @override
  Widget build(BuildContext context) {
    final int daysInt = _days.round();
    final int nights = daysInt > 1 ? daysInt - 1 : 1;
    final int totalHotel = nights * _roomRate;
    final int totalFood = daysInt * _foodRate;
    final int grandTotal = totalHotel + totalFood + _busCost + 350;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: const Color(0xFFE7E2D7)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Estimativa Total', style: TextStyle(fontSize: 14, color: Color(0xFF78716C))),
                  Text('R\$ $grandTotal', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF1C1917))),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                'Duração: $daysInt Dias ($nights Noites de Quarto Privativo)',
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFB45309)),
              ),
              const SizedBox(height: 16),

              Slider(
                value: _days,
                min: 4,
                max: 9,
                divisions: 5,
                activeColor: const Color(0xFF1C1917),
                inactiveColor: const Color(0xFFE7E2D7),
                label: '$daysInt dias',
                onChanged: (v) => setState(() => _days = v),
              ),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text('4 dias', style: TextStyle(fontSize: 11, color: Color(0xFFA8A29E))),
                  Text('6 dias', style: TextStyle(fontSize: 11, color: Color(0xFFA8A29E))),
                  Text('9 dias', style: TextStyle(fontSize: 11, color: Color(0xFFA8A29E))),
                ],
              ),
              const Divider(height: 28),

              _buildInputRow('Diária Quarto Privativo (R\$)', _roomRate, (v) => setState(() => _roomRate = v), 'Subtotal: R\$ $totalHotel ($nights noites)'),
              const SizedBox(height: 12),
              _buildInputRow('Alimentação / Dia (R\$)', _foodRate, (v) => setState(() => _foodRate = v), 'Subtotal: R\$ $totalFood ($daysInt dias)'),
              const SizedBox(height: 12),
              _buildInputRow('Ônibus Ida + Volta (R\$)', _busCost, (v) => setState(() => _busCost = v), 'Leito confortável'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInputRow(String label, int val, ValueChanged<int> onChanged, String subtext) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF292524))),
            Text(subtext, style: const TextStyle(fontSize: 11, color: Color(0xFF78716C))),
          ],
        ),
        SizedBox(
          width: 90,
          height: 36,
          child: TextFormField(
            initialValue: val.toString(),
            keyboardType: TextInputType.number,
            textAlign: TextAlign.right,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            ),
            onChanged: (str) {
              final n = int.tryParse(str);
              if (n != null) onChanged(n);
            },
          ),
        ),
      ],
    );
  }
}

// ----------------------------------------------------
// 3. NOTES SCREEN (Brain Dump)
// ----------------------------------------------------
class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  late TextEditingController _controller;
  bool _saved = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
    _loadNotes();
  }

  Future<void> _loadNotes() async {
    final prefs = await SharedPreferences.getInstance();
    final text = prefs.getString('fenix_flutter_notes') ??
        'Minhas ideias para a viagem:\n\n'
        '- Quero quarto privativo (hotel ou Airbnb com ar-condicionado e silêncio).\n'
        '- Nada de rever o passado ou ir em lugares repetidos.\n'
        '- Quero praia para caminhar e respirar.\n'
        '- Trilhas com fotos de visual épico.\n'
        '- Um lugar seguro para sair à noite sozinho.\n'
        '- Volto para Itapeva dia 28/09.';
    setState(() {
      _controller.text = text;
    });
  }

  Future<void> _saveNotes(String text) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('fenix_flutter_notes', text);
    setState(() => _saved = true);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) setState(() => _saved = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Caderno Livre', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1C1917))),
              if (_saved)
                const Text('✓ Salvo', style: TextStyle(fontSize: 11, color: Color(0xFF047857), fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 4),
          const Text('Escreva pensamentos, dúvidas e sentimentos para esvaziar a mente.', style: TextStyle(fontSize: 12, color: Color(0xFF78716C))),
          const SizedBox(height: 12),
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE7E2D7)),
              ),
              child: TextField(
                controller: _controller,
                maxLines: null,
                expands: true,
                onChanged: _saveNotes,
                style: const TextStyle(fontSize: 13, height: 1.5, color: Color(0xFF292524)),
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Escreva livremente aqui...',
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ----------------------------------------------------
// 4. CHECKLIST SCREEN
// ----------------------------------------------------
class ChecklistScreen extends StatefulWidget {
  const ChecklistScreen({super.key});

  @override
  State<ChecklistScreen> createState() => _ChecklistScreenState();
}

class _ChecklistScreenState extends State<ChecklistScreen> {
  final List<Map<String, dynamic>> _items = [
    {'title': 'Tênis de trilha com boa aderência para pedras', 'done': false},
    {'title': 'Roupas leves esportivas e sunga para praia', 'done': false},
    {'title': 'Mochila de ataque leve (15-20L) para água e celular', 'done': false},
    {'title': 'Protetor solar FPS 50 e óculos escuros', 'done': false},
    {'title': 'Carregador portátil (powerbank) para bateria nas trilhas', 'done': false},
    {'title': 'Doleira fina para documentos e cartões', 'done': false},
    {'title': 'Toalha de secagem rápida (microfibra)', 'done': false},
  ];

  @override
  Widget build(BuildContext context) {
    final doneCount = _items.where((e) => e['done'] == true).length;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Mala Leve & Prática', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1C1917))),
            Text('$doneCount / ${_items.length} prontos', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF047857))),
          ],
        ),
        const SizedBox(height: 12),
        ..._items.map((item) => Container(
              margin: const EdgeInsets.only(bottom: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE7E2D7)),
              ),
              child: CheckboxListTile(
                value: item['done'] as bool,
                activeColor: const Color(0xFF1C1917),
                title: Text(
                  item['title'] as String,
                  style: TextStyle(
                    fontSize: 12,
                    color: (item['done'] as bool) ? const Color(0xFFA8A29E) : const Color(0xFF292524),
                    decoration: (item['done'] as bool) ? TextDecoration.lineThrough : null,
                  ),
                ),
                onChanged: (v) => setState(() => item['done'] = v ?? false),
              ),
            )),
      ],
    );
  }
}
