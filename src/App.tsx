import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Truck, 
  Heart, 
  Palmtree, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Phone, 
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Upload,
  ExternalLink,
  ClipboardList,
  Settings,
  Camera,
  Edit2,
  Home,
  ShoppingCart,
  Mail,
  Sparkles,
  Baby,
  User,
  BarChart3,
  PieChart,
  Music
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { cn } from './types';
import type { Supplier, Guest, HoneymoonItem, DecorationItem, ChecklistItem, WeddingConfig, HomeItem, Invitation, Child, FinanceItem, MusicItem } from './types';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'cover' | 'wedding' | 'suppliers' | 'guests' | 'honeymoon' | 'decoration' | 'checklist' | 'settings' | 'homeItems' | 'invitations' | 'finances' | 'music'>('cover');
  
  // State for data
  const [weddingConfig, setWeddingConfig] = useState<WeddingConfig>(() => {
    const defaultConfig = {
      brideName: 'Márcia',
      groomName: 'Carlos',
      weddingDate: '2026-04-01',
      weddingStyle: '',
      titleFont: 'font-script',
      checklistPeriods: [
        '12+ meses antes',
        '10-12 meses antes',
        '8-10 meses antes',
        '6-8 meses antes',
        '4-6 meses antes',
        '2-4 meses antes',
        '1-2 meses antes',
        '1 semana antes',
        'No dia!'
      ],
      financeCategories: [
        'Buffet', 'Decoração', 'Vestuário', 'Fotografia/Vídeo', 'Música', 'Espaço', 
        'Convites', 'Lembrancinhas', 'Assessoria', 'Beleza', 'Outros'
      ],
      supplierCategories: [
        "Local da Cerimônia",
        "Local da Recepção",
        "Buffet / Gastronomia",
        "Fotografia e Vídeo",
        "Decoração e Flores",
        "Música (DJ/Banda)",
        "Convites e Papelaria",
        "Bolo e Doces",
        "Trajes (Noiva/Noivo)",
        "Beleza (Cabelo/Maquiagem)",
        "Assessoria e Cerimonial",
        "Lembrancinhas",
        "Outros"
      ],
      homeCategories: ['Cozinha', 'Quarto', 'Sala', 'Banheiro', 'Lavanderia', 'Geral'],
      weddingStyles: [
        'Tropical', 'Clássico', 'Vintage', 'Rústico', 'Minimalista', 
        'Romântico', 'Mini Wedding', 'Boho', 'Praiano', 'Luxo'
      ],
      tabNames: {
        cover: 'Capa',
        wedding: 'Casamento',
        finances: 'Financeiro',
        checklist: 'Checklist',
        suppliers: 'Fornecedores',
        guests: 'Convidados',
        music: 'Músicas',
        invitations: 'Convites',
        honeymoon: 'Lua de Mel',
        homeItems: 'Casa',
        decoration: 'Ornamentação',
        settings: 'Ajustes'
      }
    };

    return defaultConfig;
  });

  const [finances, setFinances] = useState<FinanceItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [honeymoon, setHoneymoon] = useState<HoneymoonItem[]>([]);
  const [decoration, setDecoration] = useState<DecorationItem[]>([]);

  const [music, setMusic] = useState<MusicItem[]>(() => {
    return [
      { id: '1', moment: 'Entrada do Noivo', songTitle: '', artist: '' },
      { id: '2', moment: 'Entrada das Damas e Pajens', songTitle: '', artist: '' },
      { id: '3', moment: 'Entrada dos Padrinhos', songTitle: '', artist: '' },
      { id: '4', moment: 'Entrada da Noiva', songTitle: '', artist: '' },
      { id: '5', moment: 'Entrada das Alianças', songTitle: '', artist: '' },
      { id: '6', moment: 'Saída dos Noivos', songTitle: '', artist: '' },
      { id: '7', moment: 'Saída dos Padrinhos', songTitle: '', artist: '' },
      { id: '8', moment: 'Saída dos Pais', songTitle: '', artist: '' }
    ];
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    // Detailed checklist items from the PDF
    const tasks: ChecklistItem[] = [
      // 12+ meses
      { id: 'pdf-1', month: '12+ meses antes', task: 'Escolher a data do casamento', completed: false },
      { id: 'pdf-2', month: '12+ meses antes', task: 'Conferir se a data não é feriado ou compromisso importante', completed: false },
      { id: 'pdf-3', month: '12+ meses antes', task: 'Definir local da cerimônia (Igreja ou outro)', completed: false },
      { id: 'pdf-4', month: '12+ meses antes', task: 'Definir o orçamento total', completed: false },
      { id: 'pdf-5', month: '12+ meses antes', task: 'Definir estilo, horário e tamanho da festa (Tropical, 16h, médio)', completed: false },
      { id: 'pdf-6', month: '12+ meses antes', task: 'Começar pré-lista de convidados', completed: false },
      { id: 'pdf-7', month: '12+ meses antes', task: 'Criar pasta para papeladas e contratos (Kaju)', completed: false },
      { id: 'pdf-8', month: '12+ meses antes', task: 'Selecionar fornecedores para visitar', completed: false },
      { id: 'pdf-9', month: '12+ meses antes', task: 'Entrevistar pelo menos 3 assessoras', completed: false },
      { id: 'pdf-10', month: '12+ meses antes', task: 'Reservar data na igreja', completed: false },
      { id: 'pdf-11', month: '12+ meses antes', task: 'Verificar restrições da igreja/local', completed: false },
      { id: 'pdf-12', month: '12+ meses antes', task: 'Pesquisar fotógrafos e cinegrafistas', completed: false },
      { id: 'pdf-13', month: '12+ meses antes', task: 'Pesquisar DJs e Bandas', completed: false },
      { id: 'pdf-14', month: '12+ meses antes', task: 'Planejar festa de noivado', completed: false },

      // 11 meses
      { id: 'pdf-15', month: '11 meses antes', task: 'Pesquisar vestido de noiva e biotipo', completed: false },
      { id: 'pdf-16', month: '11 meses antes', task: 'Pensar em acessórios, penteados e sapatos', completed: false },
      { id: 'pdf-17', month: '11 meses antes', task: 'Definir cardápio e tipo de buffet (Churrasco)', completed: false },
      { id: 'pdf-18', month: '11 meses antes', task: 'Definir entretenimento (Banda ou DJ)', completed: false },
      { id: 'pdf-19', month: '11 meses antes', task: 'Pesquisar referências de decoração', completed: false },
      { id: 'pdf-20', month: '11 meses antes', task: 'Finalizar pré-lista de convidados', completed: false },

      // 10 meses
      { id: 'pdf-21', month: '10 meses antes', task: 'Contratar decorador e florista', completed: false },
      { id: 'pdf-22', month: '10 meses antes', task: 'Verificar disponibilidade de móveis no local', completed: false },
      { id: 'pdf-23', month: '10 meses antes', task: 'Escolher tipo de buffet (Francês, Americano ou Coquetel)', completed: false },
      { id: 'pdf-24', month: '10 meses antes', task: 'Degustação do cardápio', completed: false },
      { id: 'pdf-25', month: '10 meses antes', task: 'Contratar buffet', completed: false },
      { id: 'pdf-26', month: '10 meses antes', task: 'Pesquisar bar de casamento', completed: false },
      { id: 'pdf-27', month: '10 meses antes', task: 'Contratar entretenimento (DJ, Banda, etc)', completed: false },
      { id: 'pdf-28', month: '10 meses antes', task: 'Contratar iluminação e pista de dança', completed: false },
      { id: 'pdf-29', month: '10 meses antes', task: 'Contratar coral para cerimônia', completed: false },
      { id: 'pdf-30', month: '10 meses antes', task: 'Contratar empresa de convites e Save the Date', completed: false },

      // 9 meses
      { id: 'pdf-31', month: '9 meses antes', task: 'Pesquisar documentos para casamento civil', completed: false },
      { id: 'pdf-32', month: '9 meses antes', task: 'Decidir regime de bens (Universal)', completed: false },
      { id: 'pdf-33', month: '9 meses antes', task: 'Finalizar lista de convidados com endereços', completed: false },

      // 8 meses
      { id: 'pdf-34', month: '8 meses antes', task: 'Convidar padrinhos formalmente', completed: false },
      { id: 'pdf-35', month: '8 meses antes', task: 'Pesquisar modelos e cores de convites', completed: false },
      { id: 'pdf-36', month: '8 meses antes', task: 'Criar site de casamento e lista de presentes', completed: false },
      { id: 'pdf-37', month: '8 meses antes', task: 'Escolher o vestido de noiva', completed: false },
      { id: 'pdf-38', month: '8 meses antes', task: 'Anunciar Save the Date', completed: false },
      { id: 'pdf-39', month: '8 meses antes', task: 'Pesquisar doces e bolos', completed: false },
      { id: 'pdf-40', month: '8 meses antes', task: 'Definir cores dos vestidos das mães', completed: false },
      { id: 'pdf-41', month: '8 meses antes', task: 'Marcar exames pré-nupciais', completed: false },

      // 7 meses
      { id: 'pdf-42', month: '7 meses antes', task: 'Definir cardápio completo da recepção', completed: false },
      { id: 'pdf-43', month: '7 meses antes', task: 'Encomendar bolo e doces', completed: false },
      { id: 'pdf-44', month: '7 meses antes', task: 'Contratar bar de casamento', completed: false },
      { id: 'pdf-45', month: '7 meses antes', task: 'Emitir passagens da lua de mel', completed: false },
      { id: 'pdf-46', month: '7 meses antes', task: 'Pesquisar cabelo e maquiagem', completed: false },

      // 6 meses
      { id: 'pdf-47', month: '6 meses antes', task: 'Pesquisar local para noite de núpcias', completed: false },
      { id: 'pdf-48', month: '6 meses antes', task: 'Contratar convites', completed: false },
      { id: 'pdf-49', month: '6 meses antes', task: 'Escolher lembrancinhas', completed: false },
      { id: 'pdf-50', month: '6 meses antes', task: 'Definir traje do noivo e padrinhos', completed: false },

      // 5 meses
      { id: 'pdf-51', month: '5 meses antes', task: 'Comprar alianças', completed: false },
      { id: 'pdf-52', month: '5 meses antes', task: 'Definir decoração da igreja', completed: false },

      // 4 meses
      { id: 'pdf-53', month: '4 meses antes', task: 'Escolher buquê de noiva', completed: false },
      { id: 'pdf-54', month: '4 meses antes', task: 'Iniciar entrega dos convites', completed: false },
      { id: 'pdf-55', month: '4 meses antes', task: 'Escolher sapato da noiva e noivo', completed: false },

      // 3 meses
      { id: 'pdf-56', month: '3 meses antes', task: 'Ensaios fotográficos pré-wedding', completed: false },
      { id: 'pdf-57', month: '3 meses antes', task: 'Definir música da primeira dança', completed: false },

      // 2 meses
      { id: 'pdf-58', month: '2 meses antes', task: 'Última degustação do buffet', completed: false },
      { id: 'pdf-59', month: '2 meses antes', task: 'Confirmar quantidade de convidados', completed: false },

      // 1 mês
      { id: 'pdf-60', month: '1 mês antes', task: 'Escrever votos de casamento', completed: false },
      { id: 'pdf-61', month: '1 mês antes', task: 'Revisar RSVP', completed: false },
      { id: 'pdf-62', month: '1 mês antes', task: 'Última prova do vestido', completed: false },

      // 1 semana
      { id: 'pdf-63', month: '1 semana antes', task: 'Confirmar pagamentos de fornecedores', completed: false },
      { id: 'pdf-64', month: '1 semana antes', task: 'Retirar traje do noivo', completed: false },
      { id: 'pdf-65', month: '1 semana antes', task: 'Arrumar malas para lua de mel', completed: false },

      // 1 dia
      { id: 'pdf-66', month: '1 dia antes', task: 'Dormir pelo menos 8 horas', completed: false },
      { id: 'pdf-67', month: '1 dia antes', task: 'Arrumar mala do dia do casamento', completed: false },

      // No dia
      { id: 'pdf-68', month: 'No dia!', task: 'Aproveitar o dia de princesa!', completed: false },
      { id: 'pdf-69', month: 'No dia!', task: 'Não pular refeições', completed: false },
    ];
    return tasks;
  });

  const [homeItems, setHomeItems] = useState<HomeItem[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  // Persist data
  useEffect(() => {
    localStorage.setItem('wedding_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);
  
  useEffect(() => {
    localStorage.setItem('wedding_guests', JSON.stringify(guests));
  }, [guests]);
  
  useEffect(() => {
    localStorage.setItem('wedding_honeymoon', JSON.stringify(honeymoon));
  }, [honeymoon]);
  
  useEffect(() => {
    localStorage.setItem('wedding_decoration', JSON.stringify(decoration));
  }, [decoration]);

  useEffect(() => {
    localStorage.setItem('wedding_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('wedding_config', JSON.stringify(weddingConfig));
  }, [weddingConfig]);

  useEffect(() => {
    localStorage.setItem('wedding_home_items', JSON.stringify(homeItems));
  }, [homeItems]);

  useEffect(() => {
    localStorage.setItem('wedding_invitations', JSON.stringify(invitations));
  }, [invitations]);

  useEffect(() => {
    localStorage.setItem('wedding_finances', JSON.stringify(finances));
  }, [finances]);

  useEffect(() => {
    localStorage.setItem('wedding_music', JSON.stringify(music));
  }, [music]);

  const tabs = [
    { id: 'cover', label: weddingConfig.tabNames?.cover || 'Capa', icon: Camera },
    { id: 'wedding', label: weddingConfig.tabNames?.wedding || 'Casamento', icon: Heart },
    { id: 'finances', label: weddingConfig.tabNames?.finances || 'Financeiro', icon: DollarSign },
    { id: 'checklist', label: weddingConfig.tabNames?.checklist || 'Checklist', icon: ClipboardList },
    { id: 'suppliers', label: weddingConfig.tabNames?.suppliers || 'Fornecedores', icon: Truck },
    { id: 'guests', label: weddingConfig.tabNames?.guests || 'Convidados', icon: Users },
    { id: 'music', label: weddingConfig.tabNames?.music || 'Músicas', icon: Music },
    { id: 'invitations', label: weddingConfig.tabNames?.invitations || 'Convites', icon: Mail },
    { id: 'honeymoon', label: weddingConfig.tabNames?.honeymoon || 'Lua de Mel', icon: Palmtree },
    { id: 'homeItems', label: weddingConfig.tabNames?.homeItems || 'Casa', icon: Home },
    { id: 'decoration', label: weddingConfig.tabNames?.decoration || 'Ornamentação', icon: Sparkles },
    { id: 'settings', label: weddingConfig.tabNames?.settings || 'Ajustes', icon: Settings },
  ];

  return (
    <div className="min-h-screen pb-24 bg-stone-50/50">
      {/* Header with Cover Photo */}
      <div className="relative h-80 md:h-[450px] w-full overflow-hidden">
        {weddingConfig.coverPhoto ? (
          <img 
            src={weddingConfig.coverPhoto} 
            className="w-full h-full object-cover" 
            alt="Wedding Cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-wedding-rose/10 flex items-center justify-center">
            <Camera className="text-wedding-rose/20" size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-12 left-0 right-0 px-6 flex flex-col items-center text-center text-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={cn("text-4xl md:text-7xl mb-3", weddingConfig.titleFont || "font-script")}>
              {weddingConfig.brideName} & {weddingConfig.groomName}
            </h1>
            <p className="text-lg md:text-2xl italic serif opacity-90 mb-4">
              {formatDate(weddingConfig.weddingDate)} • Estilo {weddingConfig.weddingStyle}
            </p>
            <Countdown targetDate={weddingConfig.weddingDate} />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'cover' && (
              <CoverTab config={weddingConfig} />
            )}
            {activeTab === 'wedding' && (
              <WeddingTab 
                title={weddingConfig.tabNames?.wedding || 'Nosso Casamento'}
                config={weddingConfig} 
                invitations={invitations} 
                guests={guests} 
              />
            )}
            {activeTab === 'finances' && (
              <FinanceTab 
                title={weddingConfig.tabNames?.finances || 'Financeiro'}
                finances={finances} 
                setFinances={setFinances} 
                categories={weddingConfig.financeCategories || []} 
              />
            )}
            {activeTab === 'checklist' && (
              <ChecklistTab 
                title={weddingConfig.tabNames?.checklist || 'Checklist'}
                checklist={checklist} 
                setChecklist={setChecklist} 
                periods={weddingConfig.checklistPeriods || []} 
              />
            )}
            {activeTab === 'suppliers' && (
              <SuppliersTab 
                title={weddingConfig.tabNames?.suppliers || 'Fornecedores'}
                suppliers={suppliers} 
                setSuppliers={setSuppliers} 
                categories={weddingConfig.supplierCategories || []} 
              />
            )}
            {activeTab === 'guests' && (
              <GuestsTab 
                title={weddingConfig.tabNames?.guests || 'Convidados'}
                guests={guests} 
                setGuests={setGuests} 
              />
            )}
            {activeTab === 'honeymoon' && (
              <HoneymoonTab 
                title={weddingConfig.tabNames?.honeymoon || 'Lua de Mel'}
                honeymoon={honeymoon} 
                setHoneymoon={setHoneymoon} 
              />
            )}
            {activeTab === 'invitations' && (
              <InvitationsTab 
                title={weddingConfig.tabNames?.invitations || 'Convites'}
                invitations={invitations} 
                setInvitations={setInvitations} 
                guests={guests} 
              />
            )}
            {activeTab === 'homeItems' && (
              <HomeItemsTab 
                title={weddingConfig.tabNames?.homeItems || 'Casa'}
                homeItems={homeItems} 
                setHomeItems={setHomeItems} 
                categories={weddingConfig.homeCategories || []} 
              />
            )}
            {activeTab === 'decoration' && (
              <DecorationTab 
                title={weddingConfig.tabNames?.decoration || 'Ornamentação'}
                decoration={decoration} 
                setDecoration={setDecoration} 
              />
            )}
            {activeTab === 'music' && (
              <MusicTab 
                title={weddingConfig.tabNames?.music || 'Músicas'}
                music={music} 
                setMusic={setMusic} 
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab 
                title={weddingConfig.tabNames?.settings || 'Ajustes'}
                config={weddingConfig} 
                setConfig={setWeddingConfig} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full px-4 py-2 shadow-xl flex items-center gap-2 z-50 max-w-[95vw] overflow-x-auto no-scrollbar whitespace-nowrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all flex-shrink-0",
                isActive ? "bg-wedding-rose/10 text-wedding-rose" : "text-stone-500 hover:bg-stone-100"
              )}
            >
              <Icon size={18} />
              <span className={cn("text-sm font-medium", !isActive && "hidden md:inline")}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// --- TAB COMPONENTS ---

function InvitationsTab({ title, invitations, setInvitations, guests }: { title: string, invitations: Invitation[], setInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>, guests: Guest[] }) {
  const [subTab, setSubTab] = useState<'printed' | 'box'>('printed');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Partial<Invitation>>({});
  const [newItem, setNewItem] = useState<Partial<Invitation>>({
    type: subTab,
    quantity: 1,
    individualInvitations: 0,
    price: 0,
    status: 'pending',
    isOnline: false,
    recipientName: '',
    deliveryDate: ''
  });

  useEffect(() => {
    setNewItem(prev => ({ ...prev, type: subTab }));
  }, [subTab]);

  const addItem = () => {
    if (!newItem.recipient) return;
    
    // If it's a printed invitation, we usually only need 1 main invitation per recipient
    const quantity = subTab === 'printed' ? 1 : (newItem.quantity || 1);
    const price = subTab === 'printed' ? 0 : (newItem.price || 0);

    const item: Invitation = {
      id: crypto.randomUUID(),
      type: subTab,
      recipient: newItem.recipient || '',
      recipientName: newItem.recipientName,
      individualInvitations: newItem.individualInvitations || 0,
      quantity,
      price,
      status: 'pending',
      isOnline: newItem.isOnline || false,
      deliveryDate: newItem.deliveryDate,
      notes: newItem.notes
    };
    setInvitations([...invitations, item]);
    setNewItem({ 
      type: subTab, 
      quantity: 1, 
      individualInvitations: 0, 
      price: 0, 
      status: 'pending', 
      isOnline: false,
      recipientName: '',
      deliveryDate: ''
    });
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editItem.recipient || !editingId) return;
    setInvitations(invitations.map(i => i.id === editingId ? {
      ...i,
      recipient: editItem.recipient || '',
      recipientName: editItem.recipientName,
      individualInvitations: editItem.individualInvitations || 0,
      quantity: editItem.quantity || 1,
      price: editItem.price || 0,
      isOnline: editItem.isOnline || false,
      deliveryDate: editItem.deliveryDate,
      notes: editItem.notes
    } : i));
    setEditingId(null);
    setEditItem({});
  };

  const startEditing = (item: Invitation) => {
    setEditingId(item.id);
    setEditItem(item);
    setIsAdding(false);
  };

  const handleRecipientChange = (val: string, isEditing = false) => {
    const target = isEditing ? editItem : newItem;
    const setter = isEditing ? setEditItem : setNewItem;
    
    const guest = guests.find(g => g.name === val);
    if (guest && subTab === 'printed') {
      setter(prev => ({ 
        ...prev, 
        recipient: val, 
        individualInvitations: 1 + (guest.spouseName ? 1 : 0) + (guest.childrenCount || 0)
      }));
    } else {
      setter(prev => ({ ...prev, recipient: val }));
    }
  };

  const removeItem = (id: string) => {
    setInvitations(invitations.filter(i => i.id !== id));
  };

  const updateStatus = (id: string, status: Invitation['status']) => {
    setInvitations(invitations.map(i => i.id === id ? { ...i, status } : i));
  };

  const filteredItems = invitations.filter(i => i.type === subTab);
  
  const boxRecipients = ['Padrinhos', 'Pais', 'Avós', 'Damas', 'Pajens', 'Celebrante', 'Outros'];

  const totalPrinted = invitations.filter(i => i.type === 'printed').length;
  const totalBoxes = invitations.filter(i => i.type === 'box').length;
  const pendingPrinted = invitations.filter(i => i.type === 'printed' && i.status === 'pending').length;
  const pendingBoxes = invitations.filter(i => i.type === 'box' && i.status === 'pending').length;
  const totalPending = pendingPrinted + pendingBoxes;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Gestão de convites impressos e especiais</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Convite'}
        </button>
      </div>

      {/* Invitations Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card flex flex-col items-center text-center py-4 border-l-4 border-l-wedding-rose">
          <div className="text-2xl font-serif text-stone-800">{totalPrinted}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Convites Impressos</div>
        </div>
        <div className="card flex flex-col items-center text-center py-4 border-l-4 border-l-wedding-gold">
          <div className="text-2xl font-serif text-stone-800">{totalBoxes}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Convites Caixa</div>
        </div>
        <div className="card flex flex-col items-center text-center py-4 border-l-4 border-l-yellow-400">
          <div className="text-2xl font-serif text-yellow-600">{totalPending}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Total a Entregar</div>
          <div className="text-[8px] text-yellow-500 mt-1">
            {pendingPrinted} impressos • {pendingBoxes} caixas
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-stone-200">
        <button 
          onClick={() => setSubTab('printed')}
          className={cn(
            "pb-2 px-4 transition-all relative",
            subTab === 'printed' ? "text-wedding-rose font-medium" : "text-stone-400"
          )}
        >
          Impressos
          {subTab === 'printed' && <motion.div layoutId="subtab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-wedding-rose" />}
        </button>
        <button 
          onClick={() => setSubTab('box')}
          className={cn(
            "pb-2 px-4 transition-all relative",
            subTab === 'box' ? "text-wedding-rose font-medium" : "text-stone-400"
          )}
        >
          Convites Caixa
          {subTab === 'box' && <motion.div layoutId="subtab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-wedding-rose" />}
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-stone-100 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                {subTab === 'printed' ? 'Nome do Convidado' : 'Destinatário'}
              </label>
              {subTab === 'box' ? (
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={newItem.recipient || ''}
                  onChange={e => setNewItem({ ...newItem, recipient: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {boxRecipients.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              ) : (
                <>
                  <input 
                    type="text" 
                    list="guest-list"
                    className="w-full p-2 border rounded-lg"
                    value={newItem.recipient || ''}
                    onChange={e => handleRecipientChange(e.target.value)}
                    placeholder="Digite o nome do convidado"
                  />
                  <datalist id="guest-list">
                    {guests.map(g => <option key={g.id} value={g.name} />)}
                  </datalist>
                </>
              )}
            </div>
            {subTab === 'printed' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Convites Individuais</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-lg"
                  value={newItem.individualInvitations}
                  onChange={e => setNewItem({ ...newItem, individualInvitations: parseInt(e.target.value) })}
                />
              </div>
            )}
            {subTab === 'box' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nome de quem irá receber</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-lg"
                  value={newItem.recipientName || ''}
                  onChange={e => setNewItem({ ...newItem, recipientName: e.target.value })}
                  placeholder="Ex: Tio João e Tia Maria"
                />
              </div>
            )}
            {subTab === 'box' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Data de Entrega</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-lg"
                  value={newItem.deliveryDate || ''}
                  onChange={e => setNewItem({ ...newItem, deliveryDate: e.target.value })}
                />
              </div>
            )}
            {subTab === 'box' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Quantidade de Caixas</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-lg"
                  value={newItem.quantity}
                  onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                />
              </div>
            )}
            {subTab === 'printed' && (
              <div className="md:col-span-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-stone-300 text-wedding-rose focus:ring-wedding-rose"
                    checked={newItem.isOnline}
                    onChange={e => setNewItem({ ...newItem, isOnline: e.target.checked })}
                  />
                  <span className="text-sm font-medium text-stone-700">Convite Online?</span>
                </label>
              </div>
            )}
            <div className={cn(subTab === 'printed' ? "md:col-span-2" : "")}>
              <label className="block text-sm font-medium text-stone-700 mb-1">Observações</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg"
                value={newItem.notes || ''}
                onChange={e => setNewItem({ ...newItem, notes: e.target.value })}
                placeholder="Ex: Papel linho, fita verde"
              />
            </div>
          </div>
          <button onClick={addItem} className="w-full btn-primary py-3">Salvar Convite</button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
            <Mail className="mx-auto text-stone-300 mb-4" size={48} />
            <p className="text-stone-400 italic">Nenhum convite {subTab === 'printed' ? 'impresso' : 'caixa'} cadastrado.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id}>
              {editingId === item.id ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-2xl shadow-md border border-wedding-rose/30 bg-wedding-rose/5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        {subTab === 'printed' ? 'Nome do Convidado' : 'Destinatário'}
                      </label>
                      {subTab === 'box' ? (
                        <select 
                          className="w-full p-2 border rounded-lg"
                          value={editItem.recipient || ''}
                          onChange={e => setEditItem({ ...editItem, recipient: e.target.value })}
                        >
                          <option value="">Selecione...</option>
                          {boxRecipients.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      ) : (
                        <>
                          <input 
                            type="text" 
                            list="edit-guest-list"
                            className="w-full p-2 border rounded-lg"
                            value={editItem.recipient || ''}
                            onChange={e => handleRecipientChange(e.target.value, true)}
                          />
                          <datalist id="edit-guest-list">
                            {guests.map(g => <option key={g.id} value={g.name} />)}
                          </datalist>
                        </>
                      )}
                    </div>
                    {subTab === 'printed' && (
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Convites Individuais</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-lg"
                          value={editItem.individualInvitations}
                          onChange={e => setEditItem({ ...editItem, individualInvitations: parseInt(e.target.value) })}
                        />
                      </div>
                    )}
                    {subTab === 'box' && (
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Nome de quem irá receber</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-lg"
                          value={editItem.recipientName || ''}
                          onChange={e => setEditItem({ ...editItem, recipientName: e.target.value })}
                        />
                      </div>
                    )}
                    {subTab === 'box' && (
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Data de Entrega</label>
                        <input 
                          type="date" 
                          className="w-full p-2 border rounded-lg"
                          value={editItem.deliveryDate || ''}
                          onChange={e => setEditItem({ ...editItem, deliveryDate: e.target.value })}
                        />
                      </div>
                    )}
                    {subTab === 'box' && (
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Quantidade de Caixas</label>
                        <input 
                          type="number" 
                          className="w-full p-2 border rounded-lg"
                          value={editItem.quantity}
                          onChange={e => setEditItem({ ...editItem, quantity: parseInt(e.target.value) })}
                        />
                      </div>
                    )}
                    {subTab === 'printed' && (
                      <div className="md:col-span-2 flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-stone-300 text-wedding-rose focus:ring-wedding-rose"
                            checked={editItem.isOnline}
                            onChange={e => setEditItem({ ...editItem, isOnline: e.target.checked })}
                          />
                          <span className="text-sm font-medium text-stone-700">Convite Online?</span>
                        </label>
                      </div>
                    )}
                    <div className={cn(subTab === 'printed' ? "md:col-span-2" : "")}>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Observações</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-lg"
                        value={editItem.notes || ''}
                        onChange={e => setEditItem({ ...editItem, notes: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="btn-primary flex-1">Salvar Alterações</button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-all">Cancelar</button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between group">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-stone-800">
                          {item.recipient}
                          {item.recipientName && <span className="text-stone-400 font-normal ml-2">• {item.recipientName}</span>}
                        </h3>
                        {item.isOnline && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                            Online
                          </span>
                        )}
                      </div>
                      {item.notes && <p className="text-xs text-stone-400 italic">{item.notes}</p>}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                        {item.type === 'printed' ? 'Individuais' : 'Qtd'}
                      </span>
                      <span className="text-sm font-serif text-stone-700">
                        {item.type === 'printed' ? (item.individualInvitations || 0) : item.quantity}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                        {item.type === 'printed' ? 'Status' : 'Data Entrega'}
                      </span>
                      {item.type === 'printed' ? (
                        <span className={cn(
                          "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full w-fit",
                          item.status === 'delivered' ? "bg-green-100 text-green-700" :
                          item.status === 'ordered' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                        )}>
                          {item.status === 'delivered' ? 'Entregue' : item.status === 'ordered' ? 'Encomendado' : 'Pendente'}
                        </span>
                      ) : (
                        <span className="text-sm font-serif text-stone-700">
                          {item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString('pt-BR') : '-'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {item.type === 'box' && (
                      <span className={cn(
                        "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full",
                        item.status === 'delivered' ? "bg-green-100 text-green-700" :
                        item.status === 'ordered' ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                      )}>
                        {item.status === 'delivered' ? 'Entregue' : item.status === 'ordered' ? 'Encomendado' : 'Pendente'}
                      </span>
                    )}
                    <button 
                      onClick={() => startEditing(item)}
                      className="text-stone-300 hover:text-wedding-gold transition-colors p-1"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => updateStatus(item.id, item.status === 'delivered' ? 'pending' : 'delivered')}
                      className={cn(
                        "p-1.5 rounded-full transition-colors",
                        item.status === 'delivered' ? "text-green-600 bg-green-50" : "text-red-400 bg-red-50"
                      )}
                      title={item.status === 'delivered' ? "Marcar como Pendente" : "Marcar como Entregue"}
                    >
                      <CheckCircle2 size={20} />
                    </button>
                    <select 
                      className="text-xs border rounded p-1 bg-stone-50"
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value as any)}
                    >
                      <option value="pending">Pendente</option>
                      <option value="ordered">Encomendado</option>
                      <option value="delivered">Entregue</option>
                    </select>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-stone-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function HomeItemsTab({ title, homeItems, setHomeItems, categories }: { title: string, homeItems: HomeItem[], setHomeItems: React.Dispatch<React.SetStateAction<HomeItem[]>>, categories: string[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Partial<HomeItem>>({});
  const [newItem, setNewItem] = useState<Partial<HomeItem>>({
    quantity: 1,
    price: 0,
    category: categories[0] || 'Geral',
    purchased: false
  });

  useEffect(() => {
    if (!newItem.category && categories.length > 0) {
      setNewItem(prev => ({ ...prev, category: categories[0] }));
    }
  }, [categories]);

  const addItem = () => {
    if (!newItem.name) return;
    const item: HomeItem = {
      id: crypto.randomUUID(),
      name: newItem.name || '',
      quantity: newItem.quantity || 1,
      price: newItem.price || 0,
      category: newItem.category || 'Geral',
      purchased: false,
      location: newItem.location || ''
    };
    setHomeItems([...homeItems, item]);
    setNewItem({ quantity: 1, price: 0, category: 'Cozinha', purchased: false, location: '' });
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editItem.name || !editingId) return;
    setHomeItems(homeItems.map(i => i.id === editingId ? {
      ...i,
      name: editItem.name || '',
      quantity: editItem.quantity || 1,
      price: editItem.price || 0,
      category: editItem.category || 'Geral',
      location: editItem.location || ''
    } : i));
    setEditingId(null);
    setEditItem({});
  };

  const startEditing = (item: HomeItem) => {
    setEditingId(item.id);
    setEditItem(item);
    setIsAdding(false);
  };

  const togglePurchased = (id: string) => {
    setHomeItems(homeItems.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const removeItem = (id: string) => {
    setHomeItems(homeItems.filter(item => item.id !== id));
  };

  const totalCost = homeItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const purchasedCost = homeItems.filter(i => i.purchased).reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Lista de enxoval e itens para o novo lar</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Item'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <p className="text-sm text-stone-500 uppercase tracking-wider mb-1">Total Estimado</p>
          <p className="text-3xl font-medium text-stone-800">R$ {totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-wedding-rose/5 p-6 rounded-2xl shadow-sm border border-wedding-rose/10">
          <p className="text-sm text-wedding-rose/60 uppercase tracking-wider mb-1">Já Comprado</p>
          <p className="text-3xl font-medium text-wedding-rose">R$ {purchasedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-stone-100 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Nome do Item</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg"
                value={newItem.name || ''}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Ex: Jogo de Panelas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Categoria</label>
              <select 
                className="w-full p-2 border rounded-lg"
                value={newItem.category}
                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Quantidade</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={newItem.quantity}
                onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Preço Unitário (R$)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded-lg"
                value={newItem.price}
                onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Onde encontrar / Link</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-lg"
                value={newItem.location || ''}
                onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                placeholder="Ex: Loja X, Link do site..."
              />
            </div>
          </div>
          <button onClick={addItem} className="w-full btn-primary py-3">Salvar Item</button>
        </motion.div>
      )}

      <div className="space-y-4">
        {homeItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200">
            <ShoppingCart className="mx-auto text-stone-300 mb-4" size={48} />
            <p className="text-stone-400 italic">Sua lista de casa está vazia. Comece a planejar seu enxoval!</p>
          </div>
        ) : (
          homeItems.map(item => (
            <div key={item.id}>
              {editingId === item.id ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-2xl shadow-md border border-wedding-rose/30 bg-wedding-rose/5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Nome do Item</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-lg"
                        value={editItem.name || ''}
                        onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Categoria</label>
                      <select 
                        className="w-full p-2 border rounded-lg"
                        value={editItem.category}
                        onChange={e => setEditItem({ ...editItem, category: e.target.value })}
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Quantidade</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded-lg"
                        value={editItem.quantity}
                        onChange={e => setEditItem({ ...editItem, quantity: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Preço Unitário (R$)</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded-lg"
                        value={editItem.price}
                        onChange={e => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Onde encontrar / Link</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-lg"
                        value={editItem.location || ''}
                        onChange={e => setEditItem({ ...editItem, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="btn-primary flex-1">Salvar Alterações</button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-all">Cancelar</button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => togglePurchased(item.id)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                        item.purchased ? "bg-wedding-rose border-wedding-rose text-white" : "border-stone-300"
                      )}
                    >
                      {item.purchased && <CheckCircle2 size={14} />}
                    </button>
                    <div>
                      <h3 className={cn("font-medium", item.purchased ? "text-stone-400 line-through" : "text-stone-800")}>
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-stone-500">
                        <span className="bg-stone-100 px-2 py-0.5 rounded-full">{item.category}</span>
                        <span>Qtd: {item.quantity}</span>
                        <span>R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        {item.location && (
                          <span className="flex items-center gap-1 text-wedding-gold">
                            <MapPin size={10} /> {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => startEditing(item)}
                      className="text-stone-300 hover:text-wedding-gold transition-colors p-1"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-stone-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SettingsTab({ title, config, setConfig }: { title: string, config: WeddingConfig, setConfig: React.Dispatch<React.SetStateAction<WeddingConfig>> }) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof WeddingConfig) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setConfig({ ...config, [field]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (field: keyof WeddingConfig) => {
    setConfig({ ...config, [field]: undefined });
  };

  const updateList = (field: keyof WeddingConfig, newList: string[]) => {
    setConfig({ ...config, [field]: newList });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-stone-800">{title}</h2>
        <p className="text-stone-500 serif italic">Deixe o aplicativo com a cara de vocês</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
            <Edit2 size={18} className="text-wedding-gold" /> Informações Básicas
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Nome da Noiva</label>
              <input 
                className="input-field"
                value={config.brideName}
                onChange={e => setConfig({ ...config, brideName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Nome do Noivo</label>
              <input 
                className="input-field"
                value={config.groomName}
                onChange={e => setConfig({ ...config, groomName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Data do Casamento</label>
              <input 
                type="date"
                className="input-field"
                value={config.weddingDate}
                onChange={e => setConfig({ ...config, weddingDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Estilo do Casamento</label>
              <select 
                className="input-field bg-white"
                value={config.weddingStyle}
                onChange={e => setConfig({ ...config, weddingStyle: e.target.value })}
              >
                <option value="">Selecione um estilo</option>
                {(config.weddingStyles || []).map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Fonte do Nome dos Noivos</label>
              <select 
                className="input-field bg-white"
                value={config.titleFont || 'font-script'}
                onChange={e => setConfig({ ...config, titleFont: e.target.value })}
              >
                <option value="font-script">Great Vibes (Padrão)</option>
                <option value="font-dancing">Dancing Script (Descontraída)</option>
                <option value="font-alex">Alex Brush (Clássica)</option>
                <option value="font-pinyon">Pinyon Script (Sofisticada)</option>
                <option value="font-playfair">Playfair Display (Elegante Serif)</option>
                <option value="font-cinzel">Cinzel (Imponente)</option>
                <option value="font-montserrat">Montserrat (Moderna)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
            <Camera size={18} className="text-wedding-gold" /> Fotos do Casal
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-2 block">Foto de Capa</label>
              <div className="relative h-32 w-full rounded-xl overflow-hidden border-2 border-dashed border-stone-200 group">
                {config.coverPhoto ? (
                  <>
                    <img src={config.coverPhoto} className="w-full h-full object-cover" alt="Cover Preview" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <label className="flex flex-col items-center gap-1 cursor-pointer text-white hover:text-wedding-gold transition-colors">
                        <Camera size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Alterar</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => handlePhotoUpload(e, 'coverPhoto')} />
                      </label>
                      <button 
                        onClick={() => removePhoto('coverPhoto')}
                        className="flex flex-col items-center gap-1 text-white hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Excluir</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center text-stone-300 hover:text-wedding-rose hover:bg-stone-50 cursor-pointer transition-all">
                    <Camera size={24} />
                    <span className="text-xs mt-1 font-medium">Adicionar Capa</span>
                    <input type="file" className="hidden" accept="image/*" onChange={e => handlePhotoUpload(e, 'coverPhoto')} />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-stone-400 mb-2 block">Noiva</label>
                <div className="relative aspect-square rounded-full overflow-hidden border-2 border-dashed border-stone-200 group">
                  {config.bridePhoto ? (
                    <>
                      <img src={config.bridePhoto} className="w-full h-full object-cover" alt="Bride Preview" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label className="flex flex-col items-center gap-0.5 cursor-pointer text-white hover:text-wedding-gold transition-colors">
                          <Camera size={16} />
                          <span className="text-[8px] font-bold uppercase">Alterar</span>
                          <input type="file" className="hidden" accept="image/*" onChange={e => handlePhotoUpload(e, 'bridePhoto')} />
                        </label>
                        <button 
                          onClick={() => removePhoto('bridePhoto')}
                          className="flex flex-col items-center gap-0.5 text-white hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="text-[8px] font-bold uppercase">Excluir</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center text-stone-300 hover:text-wedding-rose hover:bg-stone-50 cursor-pointer transition-all">
                      <Camera size={20} />
                      <span className="text-[10px] mt-1 font-medium">Adicionar</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => handlePhotoUpload(e, 'bridePhoto')} />
                    </label>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-stone-400 mb-2 block">Noivo</label>
                <div className="relative aspect-square rounded-full overflow-hidden border-2 border-dashed border-stone-200 group">
                  {config.groomPhoto ? (
                    <>
                      <img src={config.groomPhoto} className="w-full h-full object-cover" alt="Groom Preview" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label className="flex flex-col items-center gap-0.5 cursor-pointer text-white hover:text-wedding-gold transition-colors">
                          <Camera size={16} />
                          <span className="text-[8px] font-bold uppercase">Alterar</span>
                          <input type="file" className="hidden" accept="image/*" onChange={e => handlePhotoUpload(e, 'groomPhoto')} />
                        </label>
                        <button 
                          onClick={() => removePhoto('groomPhoto')}
                          className="flex flex-col items-center gap-0.5 text-white hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="text-[8px] font-bold uppercase">Excluir</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center text-stone-300 hover:text-wedding-rose hover:bg-stone-50 cursor-pointer transition-all">
                      <Camera size={20} />
                      <span className="text-[10px] mt-1 font-medium">Adicionar</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => handlePhotoUpload(e, 'groomPhoto')} />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Customization */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <Settings size={20} className="text-wedding-rose" />
            <h3 className="text-xl font-serif text-stone-800">Categorias e Listas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListManager 
              title="Estilos de Casamento" 
              items={config.weddingStyles || []} 
              onUpdate={(items) => updateList('weddingStyles', items)} 
            />
            <ListManager 
              title="Períodos do Checklist" 
              items={config.checklistPeriods || []} 
              onUpdate={(items) => updateList('checklistPeriods', items)} 
            />
            <ListManager 
              title="Categorias Financeiras" 
              items={config.financeCategories || []} 
              onUpdate={(items) => updateList('financeCategories', items)} 
            />
            <ListManager 
              title="Categorias de Fornecedores" 
              items={config.supplierCategories || []} 
              onUpdate={(items) => updateList('supplierCategories', items)} 
            />
            <ListManager 
              title="Categorias de Itens para Casa" 
              items={config.homeCategories || []} 
              onUpdate={(items) => updateList('homeCategories', items)} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

function ListManager({ title, items, onUpdate }: { title: string, items: string[], onUpdate: (items: string[]) => void }) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;
    if (items.includes(newItem.trim())) return;
    onUpdate([...items, newItem.trim()]);
    setNewItem('');
  };

  const removeItem = (index: number) => {
    const newList = [...items];
    newList.splice(index, 1);
    onUpdate(newList);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500">{title}</h4>
      
      <div className="flex gap-2">
        <input 
          type="text" 
          className="input-field py-2" 
          placeholder="Novo item..." 
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem} className="p-2 bg-wedding-rose text-white rounded-xl hover:bg-wedding-rose/90 transition-all">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto no-scrollbar p-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100 text-sm text-stone-600 group">
            <span>{item}</span>
            <button onClick={() => removeItem(idx)} className="text-stone-300 hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-stone-400 italic">Nenhum item cadastrado.</p>}
      </div>
    </div>
  );
}

function FinanceTab({ title, finances, setFinances, categories }: { title: string, finances: FinanceItem[], setFinances: React.Dispatch<React.SetStateAction<FinanceItem[]>>, categories: string[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Partial<FinanceItem>>({});
  const [newItem, setNewItem] = useState<Partial<FinanceItem>>({
    status: 'pending',
    category: categories[0] || 'Outros',
    paidAmount: 0
  });

  useEffect(() => {
    if (!newItem.category && categories.length > 0) {
      setNewItem(prev => ({ ...prev, category: categories[0] }));
    }
  }, [categories]);

  const addItem = () => {
    if (!newItem.description || !newItem.amount) return;
    const amount = Number(newItem.amount) || 0;
    const paidAmount = Number(newItem.paidAmount) || 0;
    
    let status: 'paid' | 'pending' | 'partial' = 'pending';
    if (paidAmount >= amount) status = 'paid';
    else if (paidAmount > 0) status = 'partial';

    const item: FinanceItem = {
      id: crypto.randomUUID(),
      description: newItem.description || '',
      amount: amount,
      paidAmount: paidAmount,
      category: newItem.category || 'Outros',
      date: newItem.date || new Date().toISOString().split('T')[0],
      status: status
    };
    setFinances([...finances, item]);
    setNewItem({ status: 'pending', category: 'Outros', paidAmount: 0 });
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editItem.description || !editItem.amount || !editingId) return;
    const amount = Number(editItem.amount) || 0;
    const paidAmount = Number(editItem.paidAmount) || 0;
    
    let status: 'paid' | 'pending' | 'partial' = 'pending';
    if (paidAmount >= amount) status = 'paid';
    else if (paidAmount > 0) status = 'partial';

    setFinances(finances.map(f => f.id === editingId ? {
      ...f,
      description: editItem.description || '',
      amount: amount,
      paidAmount: paidAmount,
      category: editItem.category || 'Outros',
      date: editItem.date || f.date,
      status: status
    } : f));
    setEditingId(null);
    setEditItem({});
  };

  const startEditing = (item: FinanceItem) => {
    setEditingId(item.id);
    setEditItem(item);
    setIsAdding(false);
  };

  const removeItem = (id: string) => {
    setFinances(finances.filter(f => f.id !== id));
  };

  const toggleStatus = (id: string) => {
    setFinances(finances.map(f => {
      if (f.id === id) {
        const isPaid = f.status === 'paid';
        return { 
          ...f, 
          status: isPaid ? 'pending' : 'paid',
          paidAmount: isPaid ? 0 : f.amount
        };
      }
      return f;
    }));
  };

  const totalBudget = finances.reduce((acc, f) => acc + f.amount, 0);
  const totalPaid = finances.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalPending = totalBudget - totalPaid;

  // Chart data
  const categoryData = categories.map(cat => ({
    name: cat,
    value: finances.filter(f => f.category === cat).reduce((acc, f) => acc + f.amount, 0)
  })).filter(d => d.value > 0);

  const COLORS = ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#c5a059', '#d4b475', '#e3c891', '#f2dcad', '#fff0c9'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Controle de gastos e pagamentos</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Gasto'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center py-4 bg-stone-50">
          <div className="text-2xl font-serif text-stone-800">R$ {totalBudget.toLocaleString()}</div>
          <div className="text-xs uppercase tracking-widest text-stone-500">Total Previsto</div>
        </div>
        <div className="card text-center py-4 bg-green-50/50">
          <div className="text-2xl font-serif text-green-600">R$ {totalPaid.toLocaleString()}</div>
          <div className="text-xs uppercase tracking-widest text-stone-500">Total Pago</div>
        </div>
        <div className="card text-center py-4 bg-red-50/50">
          <div className="text-2xl font-serif text-red-500">R$ {totalPending.toLocaleString()}</div>
          <div className="text-xs uppercase tracking-widest text-stone-500">Pendente</div>
        </div>
      </div>

      {/* Charts */}
      {categoryData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card h-80">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Gastos por Categoria</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="card h-80">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Distribuição de Valores</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" fontSize={10} tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} tick={{ fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                  cursor={{ fill: '#f9f9f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="md:col-span-2 lg:col-span-1">
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Descrição</label>
              <input 
                placeholder="Ex: Pagamento Buffet" 
                className="input-field"
                value={newItem.description || ''}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor Total (R$)</label>
              <input 
                type="number"
                placeholder="0,00" 
                className="input-field"
                value={newItem.amount || ''}
                onChange={e => setNewItem({...newItem, amount: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor Já Pago (R$)</label>
              <input 
                type="number"
                placeholder="0,00" 
                className="input-field"
                value={newItem.paidAmount || ''}
                onChange={e => setNewItem({...newItem, paidAmount: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor a Pagar (R$)</label>
              <div className="input-field bg-stone-50 text-stone-500 flex items-center">
                R$ {((Number(newItem.amount) || 0) - (Number(newItem.paidAmount) || 0)).toLocaleString()}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Categoria</label>
              <select 
                className="input-field bg-white"
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Data</label>
              <input 
                type="date"
                className="input-field"
                value={newItem.date || ''}
                onChange={e => setNewItem({...newItem, date: e.target.value})}
              />
            </div>
          </div>
          <button onClick={addItem} className="btn-primary w-full">Salvar Gasto</button>
        </motion.div>
      )}

      <div className="space-y-3">
        {finances.length === 0 && !isAdding && (
          <div className="text-center py-12 text-stone-400 italic">Nenhum gasto registrado ainda.</div>
        )}
        {finances.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(f => (
          <div key={f.id}>
            {editingId === f.id ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card space-y-4 border-wedding-rose/30 bg-wedding-rose/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="md:col-span-2 lg:col-span-1">
                    <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Descrição</label>
                    <input 
                      className="input-field"
                      value={editItem.description || ''}
                      onChange={e => setEditItem({...editItem, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor Total (R$)</label>
                    <input 
                      type="number"
                      className="input-field"
                      value={editItem.amount || ''}
                      onChange={e => setEditItem({...editItem, amount: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor Já Pago (R$)</label>
                    <input 
                      type="number"
                      className="input-field"
                      value={editItem.paidAmount || ''}
                      onChange={e => setEditItem({...editItem, paidAmount: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Categoria</label>
                    <select 
                      className="input-field bg-white"
                      value={editItem.category}
                      onChange={e => setEditItem({...editItem, category: e.target.value})}
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Data</label>
                    <input 
                      type="date"
                      className="input-field"
                      value={editItem.date || ''}
                      onChange={e => setEditItem({...editItem, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="btn-primary flex-1">Salvar Alterações</button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-all">Cancelar</button>
                </div>
              </motion.div>
            ) : (
              <div className="card py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleStatus(f.id)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      f.status === 'paid' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}
                  >
                    {f.status === 'paid' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  <div>
                    <h3 className="font-medium text-stone-800">{f.description}</h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="bg-stone-100 px-2 py-0.5 rounded-md">{f.category}</span>
                      <span>{formatDate(f.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-serif text-lg text-stone-800">R$ {f.amount.toLocaleString()}</div>
                    <div className="flex flex-col items-end">
                      <div className={cn(
                        "text-[10px] uppercase tracking-widest font-bold",
                        f.status === 'paid' ? "text-green-500" : f.status === 'partial' ? "text-wedding-gold" : "text-red-500"
                      )}>
                        {f.status === 'paid' ? 'Pago' : f.status === 'partial' ? 'Parcial' : 'Pendente'}
                      </div>
                      <div className="text-[9px] text-stone-400">
                        Pago: R$ {f.paidAmount.toLocaleString()} | Falta: R$ {(f.amount - f.paidAmount).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEditing(f)} className="text-stone-300 hover:text-wedding-gold transition-colors p-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => removeItem(f.id)} className="text-stone-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistTab({ title, checklist, setChecklist, periods }: { title: string, checklist: ChecklistItem[], setChecklist: React.Dispatch<React.SetStateAction<ChecklistItem[]>>, periods: string[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Partial<ChecklistItem>>({});
  const [newTask, setNewTask] = useState<Partial<ChecklistItem>>({});

  const addTask = () => {
    if (!newTask.task) return;
    const item: ChecklistItem = {
      id: crypto.randomUUID(),
      task: newTask.task || '',
      month: newTask.month || 'Outros',
      completed: false
    };
    setChecklist([...checklist, item]);
    setNewTask({});
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editTask.task || !editingId) return;
    setChecklist(checklist.map(t => t.id === editingId ? {
      ...t,
      task: editTask.task || '',
      month: editTask.month || t.month
    } : t));
    setEditingId(null);
    setEditTask({});
  };

  const startEditing = (task: ChecklistItem) => {
    setEditingId(task.id);
    setEditTask(task);
    setIsAdding(false);
  };

  const toggleTask = (id: string) => {
    setChecklist(checklist.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    setChecklist(checklist.filter(t => t.id !== id));
  };

  const groupedTasks = periods.reduce((acc, month) => {
    const items = checklist.filter(t => t.month === month);
    if (items.length > 0) acc[month] = items;
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  // Add tasks that don't match standard periods to "Outros"
  const otherTasks = checklist.filter(t => !periods.includes(t.month));
  if (otherTasks.length > 0) {
    groupedTasks["Outros"] = [...(groupedTasks["Outros"] || []), ...otherTasks];
  }

  const completedCount = checklist.filter(t => t.completed).length;
  const progress = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">O que fazer mês a mês</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Tarefa'}
        </button>
      </div>

      {/* Checklist Progress */}
      <div className="card space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Progresso Geral</div>
            <div className="text-2xl font-serif text-wedding-rose">{completedCount} de {checklist.length} tarefas</div>
          </div>
          <div className="text-lg font-medium text-wedding-gold">{progress.toFixed(0)}%</div>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-wedding-rose rounded-full"
          />
        </div>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Tarefa</label>
              <input 
                placeholder="Ex: Contratar fotógrafo" 
                className="input-field"
                value={newTask.task || ''}
                onChange={e => setNewTask({...newTask, task: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Período</label>
              <select 
                className="input-field"
                value={newTask.month || ''}
                onChange={e => setNewTask({...newTask, month: e.target.value})}
              >
                <option value="">Selecione o período</option>
                {periods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={addTask} className="btn-primary w-full">Adicionar Tarefa</button>
        </motion.div>
      )}

      <div className="space-y-8">
        {Object.entries(groupedTasks).map(([month, tasks]) => (
          <div key={month} className="space-y-3">
            <h3 className="text-lg font-semibold text-stone-400 uppercase tracking-widest pl-2 border-l-2 border-wedding-rose">{month}</h3>
            <div className="grid grid-cols-1 gap-2">
              {tasks.map(t => (
                <div key={t.id}>
                  {editingId === t.id ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card space-y-4 border-wedding-rose/30 bg-wedding-rose/5 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Tarefa</label>
                          <input 
                            className="input-field"
                            value={editTask.task || ''}
                            onChange={e => setEditTask({...editTask, task: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Período</label>
                          <select 
                            className="input-field"
                            value={editTask.month || ''}
                            onChange={e => setEditTask({...editTask, month: e.target.value})}
                          >
                            {periods.map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="btn-primary flex-1">Salvar</button>
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-all">Cancelar</button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className={cn(
                      "card py-3 px-4 flex items-center justify-between group transition-all",
                      t.completed ? "bg-stone-50 border-stone-100" : ""
                    )}>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleTask(t.id)}
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                            t.completed ? "bg-wedding-rose border-wedding-rose text-white" : "border-stone-200 text-transparent"
                          )}
                        >
                          {t.completed && <CheckCircle2 size={14} />}
                        </button>
                        <span className={cn(
                          "font-medium transition-all",
                          t.completed ? "text-stone-400 line-through" : "text-stone-700"
                        )}>
                          {t.task}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => startEditing(t)} className="text-stone-300 hover:text-wedding-gold transition-colors p-1">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => removeTask(t.id)} className="text-stone-300 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuppliersTab({ title, suppliers, setSuppliers, categories }: { title: string, suppliers: Supplier[], setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>, categories: string[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSupplier, setEditSupplier] = useState<Partial<Supplier>>({});
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({});
  const [fileLoading, setFileLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewSupplier({
        ...newSupplier,
        budgetFile: {
          name: file.name,
          data: reader.result as string
        }
      });
      setFileLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const addSupplier = () => {
    if (!newSupplier.name) return;
    const supplier: Supplier = {
      id: crypto.randomUUID(),
      name: newSupplier.name || '',
      category: newSupplier.category || 'Outros',
      contact: newSupplier.contact || '',
      notes: newSupplier.notes || '',
      price: Number(newSupplier.price) || 0,
      servicesOffered: newSupplier.servicesOffered || '',
      budgetFile: newSupplier.budgetFile
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({});
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editSupplier.name || !editingId) return;
    setSuppliers(suppliers.map(s => s.id === editingId ? {
      ...s,
      name: editSupplier.name || '',
      category: editSupplier.category || 'Outros',
      contact: editSupplier.contact || '',
      notes: editSupplier.notes || '',
      price: Number(editSupplier.price) || 0,
      servicesOffered: editSupplier.servicesOffered || '',
      budgetFile: editSupplier.budgetFile
    } : s));
    setEditingId(null);
    setEditSupplier({});
  };

  const startEditing = (supplier: Supplier) => {
    setEditingId(supplier.id);
    setEditSupplier(supplier);
    setIsAdding(false);
  };

  const removeSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  const groupedSuppliers = categories.reduce((acc, cat) => {
    const items = suppliers.filter(s => s.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, Supplier[]>);

  // Add suppliers that don't match standard categories to "Outros"
  const otherSuppliers = suppliers.filter(s => !categories.includes(s.category));
  if (otherSuppliers.length > 0) {
    groupedSuppliers["Outros"] = [...(groupedSuppliers["Outros"] || []), ...otherSuppliers];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Organize todos os serviços por categoria</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar'}
        </button>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Nome do Fornecedor</label>
              <input 
                placeholder="Ex: Espaço das Flores" 
                className="input-field"
                value={newSupplier.name || ''}
                onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Categoria</label>
              <select 
                className="input-field"
                value={newSupplier.category || ''}
                onChange={e => setNewSupplier({...newSupplier, category: e.target.value})}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Contato</label>
              <input 
                placeholder="WhatsApp ou Email" 
                className="input-field"
                value={newSupplier.contact || ''}
                onChange={e => setNewSupplier({...newSupplier, contact: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor (R$)</label>
              <input 
                type="number"
                placeholder="0,00" 
                className="input-field"
                value={newSupplier.price || ''}
                onChange={e => setNewSupplier({...newSupplier, price: Number(e.target.value)})}
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">O que oferece / Serviços inclusos</label>
            <textarea 
              placeholder="Descreva o que está incluso no pacote..." 
              className="input-field h-20"
              value={newSupplier.servicesOffered || ''}
              onChange={e => setNewSupplier({...newSupplier, servicesOffered: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Upload de Orçamento (PDF/Imagem)</label>
              <div className="relative">
                <input 
                  type="file" 
                  className="hidden" 
                  id="budget-upload" 
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                />
                <label 
                  htmlFor="budget-upload" 
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl border-2 border-dashed border-stone-200 hover:border-wedding-rose hover:bg-wedding-rose/5 cursor-pointer transition-all text-stone-500"
                >
                  <Upload size={18} />
                  {fileLoading ? 'Carregando...' : newSupplier.budgetFile ? newSupplier.budgetFile.name : 'Selecionar Arquivo'}
                </label>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Observações</label>
              <input 
                placeholder="Notas internas..." 
                className="input-field"
                value={newSupplier.notes || ''}
                onChange={e => setNewSupplier({...newSupplier, notes: e.target.value})}
              />
            </div>
          </div>

          <button onClick={addSupplier} className="btn-primary w-full">Salvar Fornecedor</button>
        </motion.div>
      )}

      <div className="space-y-8">
        {suppliers.length === 0 && !isAdding && (
          <div className="text-center py-12 text-stone-400 italic">Nenhum fornecedor cadastrado. Comece a organizar seu casamento!</div>
        )}
        
        {Object.entries(groupedSuppliers).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-400 uppercase tracking-widest pl-2 border-l-2 border-wedding-gold">{category}</h3>
            <div className="grid grid-cols-1 gap-4">
              {items.map(s => (
                <div key={s.id}>
                  {editingId === s.id ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card space-y-4 border-wedding-rose/30 bg-wedding-rose/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Nome do Fornecedor</label>
                          <input 
                            className="input-field"
                            value={editSupplier.name || ''}
                            onChange={e => setEditSupplier({...editSupplier, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Categoria</label>
                          <select 
                            className="input-field"
                            value={editSupplier.category || ''}
                            onChange={e => setEditSupplier({...editSupplier, category: e.target.value})}
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Contato</label>
                          <input 
                            className="input-field"
                            value={editSupplier.contact || ''}
                            onChange={e => setEditSupplier({...editSupplier, contact: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor (R$)</label>
                          <input 
                            type="number"
                            className="input-field"
                            value={editSupplier.price || ''}
                            onChange={e => setEditSupplier({...editSupplier, price: Number(e.target.value)})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Serviços Inclusos</label>
                        <textarea 
                          className="input-field h-20"
                          value={editSupplier.servicesOffered || ''}
                          onChange={e => setEditSupplier({...editSupplier, servicesOffered: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="btn-primary flex-1">Salvar Alterações</button>
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-all">Cancelar</button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="card group relative overflow-hidden">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-medium text-stone-800">{s.name}</h4>
                            <div className="text-lg font-serif text-wedding-rose">R$ {s.price.toLocaleString()}</div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                            <span className="flex items-center gap-1"><Phone size={14} /> {s.contact}</span>
                            {s.budgetFile && (
                              <a 
                                href={s.budgetFile.data} 
                                download={s.budgetFile.name}
                                className="flex items-center gap-1 text-wedding-gold hover:underline"
                              >
                                <FileText size={14} /> Ver Orçamento
                              </a>
                            )}
                          </div>

                          {s.servicesOffered && (
                            <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                              <span className="text-[10px] font-bold uppercase text-stone-400 block mb-1">Serviços Inclusos</span>
                              <p className="text-sm text-stone-600 italic">{s.servicesOffered}</p>
                            </div>
                          )}

                          {s.notes && (
                            <p className="text-xs text-stone-400 italic">Obs: {s.notes}</p>
                          )}
                        </div>
                        
                        <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-stone-100 pt-4 md:pt-0 md:pl-4">
                          <button onClick={() => startEditing(s)} className="text-stone-300 hover:text-wedding-gold transition-colors p-2">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => removeSupplier(s.id)} className="text-stone-300 hover:text-red-500 transition-colors p-2">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuestsTab({ title, guests, setGuests }: { title: string, guests: Guest[], setGuests: React.Dispatch<React.SetStateAction<Guest[]>> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editGuest, setEditGuest] = useState<Partial<Guest>>({});
  const [newGuest, setNewGuest] = useState<Partial<Guest>>({
    children: [],
    childrenCount: 0
  });

  const handleChildrenCountChange = (count: number, isEditing = false) => {
    const target = isEditing ? editGuest : newGuest;
    const setter = isEditing ? setEditGuest : setNewGuest;
    
    const currentChildren = target.children || [];
    let newChildren: Child[] = [...currentChildren];
    
    if (count > currentChildren.length) {
      for (let i = currentChildren.length; i < count; i++) {
        newChildren.push({ gender: 'boy', age: 0 });
      }
    } else {
      newChildren = currentChildren.slice(0, count);
    }
    
    setter({ ...target, childrenCount: count, children: newChildren });
  };

  const updateChild = (index: number, field: keyof Child, value: any, isEditing = false) => {
    const target = isEditing ? editGuest : newGuest;
    const setter = isEditing ? setEditGuest : setNewGuest;
    
    const newChildren = [...(target.children || [])];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setter({ ...target, children: newChildren });
  };

  const addGuest = () => {
    if (!newGuest.name) return;
    const guest: Guest = {
      id: crypto.randomUUID(),
      name: newGuest.name || '',
      contact: newGuest.contact || '',
      confirmed: false,
      plusOnes: 0,
      spouseName: newGuest.spouseName,
      childrenCount: newGuest.childrenCount || 0,
      children: newGuest.children || []
    };
    setGuests([...guests, guest]);
    setNewGuest({
      children: [],
      childrenCount: 0
    });
    setIsAdding(false);
  };

  const saveEdit = () => {
    if (!editGuest.name || !editingId) return;
    setGuests(guests.map(g => g.id === editingId ? {
      ...g,
      name: editGuest.name || '',
      contact: editGuest.contact || '',
      spouseName: editGuest.spouseName,
      childrenCount: editGuest.childrenCount || 0,
      children: editGuest.children || []
    } : g));
    setEditingId(null);
    setEditGuest({});
  };

  const startEditing = (guest: Guest) => {
    setEditingId(guest.id);
    setEditGuest(guest);
    setIsAdding(false);
  };

  const toggleConfirm = (id: string) => {
    setGuests(guests.map(g => g.id === id ? { ...g, confirmed: !g.confirmed } : g));
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const totalConfirmed = guests.filter(g => g.confirmed).reduce((acc, g) => acc + 1 + (g.spouseName ? 1 : 0) + (g.childrenCount || 0), 0);
  const totalInvited = guests.reduce((acc, g) => acc + 1 + (g.spouseName ? 1 : 0) + (g.childrenCount || 0), 0);

  const filteredGuests = guests;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Confirmações e lista de presença</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center py-4">
          <div className="text-3xl font-serif text-emerald-600">{totalConfirmed}</div>
          <div className="text-xs uppercase tracking-widest text-stone-500">Confirmados</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-3xl font-serif text-stone-400">{totalInvited}</div>
          <div className="text-xs uppercase tracking-widest text-stone-500">Total Convidados</div>
        </div>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              placeholder="Nome do Convidado" 
              className="input-field md:col-span-1"
              value={newGuest.name || ''}
              onChange={e => setNewGuest({...newGuest, name: e.target.value})}
            />
            <input 
              placeholder="Contato" 
              className="input-field md:col-span-2"
              value={newGuest.contact || ''}
              onChange={e => setNewGuest({...newGuest, contact: e.target.value})}
            />
          </div>

          {/* Spouse and Children Section */}
          <div className="border-t border-stone-100 pt-4 mt-2 space-y-4">
            <h4 className="text-sm font-semibold text-stone-600 flex items-center gap-2">
              <Users size={16} /> Detalhes da Família
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Nome do Cônjuge</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                  <input 
                    type="text" 
                    className="w-full pl-9 p-2 border rounded-lg text-sm"
                    value={newGuest.spouseName || ''}
                    onChange={e => setNewGuest({ ...newGuest, spouseName: e.target.value })}
                    placeholder="Nome do parceiro(a)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Quantidade de Filhos</label>
                <div className="relative">
                  <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                  <input 
                    type="number" 
                    className="w-full pl-9 p-2 border rounded-lg text-sm"
                    value={newGuest.childrenCount || 0}
                    onChange={e => handleChildrenCountChange(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {newGuest.children && newGuest.children.length > 0 && (
              <div className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-100">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Dados dos Filhos</p>
                {newGuest.children.map((child, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="block text-[10px] font-medium text-stone-500 mb-1">Gênero (Filho {index + 1})</label>
                      <select 
                        className="w-full p-2 border rounded-lg text-sm bg-white"
                        value={child.gender}
                        onChange={e => updateChild(index, 'gender', e.target.value)}
                      >
                        <option value="boy">Menino</option>
                        <option value="girl">Menina</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-stone-500 mb-1">Idade</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border rounded-lg text-sm bg-white"
                        value={child.age}
                        onChange={e => updateChild(index, 'age', parseInt(e.target.value) || 0)}
                        min="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={addGuest} className="btn-primary w-full">Adicionar à Lista</button>
        </motion.div>
      )}

      <div className="space-y-2">
        {filteredGuests.length === 0 && !isAdding && (
          <div className="text-center py-12 text-stone-400 italic">
            Nenhum convidado na lista ainda.
          </div>
        )}
        {filteredGuests.map(g => (
          <div key={g.id}>
            {editingId === g.id ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card space-y-4 border-wedding-rose/30 bg-wedding-rose/5 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    placeholder="Nome do Convidado" 
                    className="input-field md:col-span-1"
                    value={editGuest.name || ''}
                    onChange={e => setEditGuest({...editGuest, name: e.target.value})}
                  />
                  <input 
                    placeholder="Contato" 
                    className="input-field md:col-span-2"
                    value={editGuest.contact || ''}
                    onChange={e => setEditGuest({...editGuest, contact: e.target.value})}
                  />
                </div>

                <div className="border-t border-stone-100 pt-4 mt-2 space-y-4">
                  <h4 className="text-sm font-semibold text-stone-600 flex items-center gap-2">
                    <Users size={16} /> Detalhes da Família
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">Nome do Cônjuge</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                        <input 
                          type="text" 
                          className="w-full pl-9 p-2 border rounded-lg text-sm"
                          value={editGuest.spouseName || ''}
                          onChange={e => setEditGuest({ ...editGuest, spouseName: e.target.value })}
                          placeholder="Nome do parceiro(a)"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-500 mb-1">Quantidade de Filhos</label>
                      <div className="relative">
                        <Baby className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                        <input 
                          type="number" 
                          min="0"
                          className="w-full pl-9 p-2 border rounded-lg text-sm"
                          value={editGuest.childrenCount || 0}
                          onChange={e => handleChildrenCountChange(parseInt(e.target.value) || 0, true)}
                        />
                      </div>
                    </div>
                  </div>

                  {editGuest.children && editGuest.children.length > 0 && (
                    <div className="bg-stone-50 p-3 rounded-xl space-y-3 border border-stone-100">
                      <p className="text-[10px] font-bold uppercase text-stone-400">Informações dos Filhos</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {editGuest.children.map((child, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-stone-100">
                            <span className="text-xs font-medium text-stone-400 w-4">#{idx + 1}</span>
                            <select 
                              className="text-xs p-1 border rounded"
                              value={child.gender}
                              onChange={e => updateChild(idx, 'gender', e.target.value, true)}
                            >
                              <option value="boy">Menino</option>
                              <option value="girl">Menina</option>
                            </select>
                            <input 
                              type="number" 
                              placeholder="Idade"
                              className="text-xs p-1 border rounded w-16"
                              value={child.age || ''}
                              onChange={e => updateChild(idx, 'age', parseInt(e.target.value) || 0, true)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="btn-primary flex-1">Salvar Alterações</button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-stone-200 rounded-xl text-stone-500 hover:bg-stone-50 transition-all">Cancelar</button>
                </div>
              </motion.div>
            ) : (
              <div className={cn(
                "card py-4 flex items-center justify-between transition-all",
                g.confirmed ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
              )}>
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleConfirm(g.id)} className={cn(
                    "transition-colors",
                    g.confirmed ? "text-green-600" : "text-red-400"
                  )}>
                    {g.confirmed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div>
                    <h3 className={cn("font-medium", g.confirmed ? "text-green-800" : "text-red-800")}>
                      {g.name}
                    </h3>
                    <p className={cn("text-xs", g.confirmed ? "text-green-600/70" : "text-red-600/70")}>{g.contact || 'Sem contato'}</p>
                    
                    {(g.spouseName || (g.children && g.children.length > 0)) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {g.spouseName && (
                          <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px]", g.confirmed ? "bg-green-100/50 text-green-700" : "bg-red-100/50 text-red-700")}>
                            <User size={10} /> {g.spouseName}
                          </div>
                        )}
                        {g.children && g.children.map((child, idx) => (
                          <div key={idx} className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px]", g.confirmed ? "bg-green-100/50 text-green-700" : "bg-red-100/50 text-red-700")}>
                            <Baby size={10} className={cn(child.gender === 'boy' ? "text-blue-400" : "text-pink-400")} />
                            {child.age} {child.age === 1 ? 'ano' : 'anos'}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEditing(g)} className="text-stone-300 hover:text-wedding-gold transition-colors p-1">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => removeGuest(g.id)} className={cn("transition-colors p-2", g.confirmed ? "text-green-300 hover:text-red-500" : "text-red-300 hover:text-red-500")}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HoneymoonTab({ title, honeymoon, setHoneymoon }: { title: string, honeymoon: HoneymoonItem[], setHoneymoon: React.Dispatch<React.SetStateAction<HoneymoonItem[]>> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<HoneymoonItem>>({});

  const popularCities = [
    // Brasil
    "Rio de Janeiro, Brasil", "Gramado, Brasil", "Fernando de Noronha, Brasil", "Maragogi, Brasil",
    "Salvador, Brasil", "Fortaleza, Brasil", "Natal, Brasil", "Florianópolis, Brasil",
    "Curitiba, Brasil", "Belo Horizonte, Brasil", "Brasília, Brasil", "São Paulo, Brasil",
    "Porto de Galinhas, Brasil", "Jericoacoara, Brasil", "Búzios, Brasil", "Angra dos Reis, Brasil",
    "Foz do Iguaçu, Brasil", "Bonito, Brasil", "Paraty, Brasil", "Ouro Preto, Brasil",
    "Maceió, Brasil", "João Pessoa, Brasil", "Aracaju, Brasil", "Vitória, Brasil",
    "Cuiabá, Brasil", "Campo Grande, Brasil", "Goiânia, Brasil", "Manaus, Brasil",
    "Belém, Brasil", "São Luís, Brasil", "Teresina, Brasil", "Palmas, Brasil",
    "Porto Velho, Brasil", "Rio Branco, Brasil", "Macapá, Brasil", "Boa Vista, Brasil",
    
    // Europa - Portugal & Espanha
    "Lisboa, Portugal", "Porto, Portugal", "Funchal, Madeira, Portugal", "Ponta Delgada, Açores, Portugal",
    "Algarve, Portugal", "Cascais, Portugal", "Sintra, Portugal", "Évora, Portugal",
    "Madri, Espanha", "Barcelona, Espanha", "Sevilha, Espanha", "Valência, Espanha",
    "Ibiza, Espanha", "Maiorca, Espanha", "Granada, Espanha", "Bilbao, Espanha",
    
    // Europa - Itália & França
    "Roma, Itália", "Veneza, Itália", "Florença, Itália", "Milão, Itália",
    "Costa Amalfitana, Itália", "Positano, Itália", "Capri, Itália", "Sicília, Itália",
    "Toscana, Itália", "Verona, Itália", "Nápoles, Itália", "Turim, Itália",
    "Paris, França", "Nice, França", "Lyon, França", "Marselha, França",
    "Bordeaux, França", "Estrasburgo, França", "Cannes, França", "Chamonix, França",
    
    // Europa - Outros
    "Londres, Reino Unido", "Edimburgo, Escócia", "Dublin, Irlanda", "Amsterdã, Holanda",
    "Bruxelas, Bélgica", "Zurique, Suíça", "Genebra, Suíça", "Zermatt, Suíça",
    "Lucerna, Suíça", "Viena, Áustria", "Salzburgo, Áustria", "Berlim, Alemanha",
    "Munique, Alemanha", "Hamburgo, Alemanha", "Frankfurt, Alemanha", "Praga, Rep. Tcheca",
    "Budapeste, Hungria", "Varsóvia, Polônia", "Cracóvia, Polônia", "Copenhague, Dinamarca",
    "Estocolmo, Suécia", "Oslo, Noruega", "Helsinque, Finlândia", "Reykjavik, Islândia",
    "Atenas, Grécia", "Santorini, Grécia", "Mykonos, Grécia", "Creta, Grécia",
    "Istambul, Turquia", "Capadócia, Turquia", "Antalya, Turquia", "Dubrovnik, Croácia",
    "Split, Croácia", "Hvar, Croácia", "Moscou, Rússia", "São Petersburgo, Rússia",
    
    // América do Norte
    "Nova York, EUA", "Miami, EUA", "Orlando, EUA", "Las Vegas, EUA",
    "Los Angeles, EUA", "São Francisco, EUA", "Chicago, EUA", "Washington D.C., EUA",
    "Honolulu, Havaí, EUA", "Maui, Havaí, EUA", "Aspen, EUA", "New Orleans, EUA",
    "Toronto, Canadá", "Vancouver, Canadá", "Montreal, Canadá", "Quebec City, Canadá",
    "Cidade do México, México", "Cancun, México", "Playa del Carmen, México", "Tulum, México",
    "Cozumel, México", "Puerto Vallarta, México", "Los Cabos, México",
    
    // América Central e Caribe
    "Punta Cana, Rep. Dominicana", "Santo Domingo, Rep. Dominicana", "Havana, Cuba", "Varadero, Cuba",
    "San Juan, Porto Rico", "Nassau, Bahamas", "Montego Bay, Jamaica", "Negril, Jamaica",
    "Aruba", "Curaçao", "Bonaire", "Saint Barthélemy", "Antígua e Barbuda",
    "Cidade do Panamá, Panamá", "San José, Costa Rica", "Guanacaste, Costa Rica",
    
    // América do Sul
    "Buenos Aires, Argentina", "Bariloche, Argentina", "Mendoza, Argentina", "Ushuaia, Argentina",
    "Santiago, Chile", "Valparaíso, Chile", "Deserto do Atacama, Chile", "Torres del Paine, Chile",
    "Montevidéu, Uruguai", "Punta del Este, Uruguai", "Colônia do Sacramento, Uruguai",
    "Lima, Peru", "Cusco, Peru", "Machu Picchu, Peru", "Bogotá, Colômbia",
    "Cartagena, Colômbia", "Medellín, Colômbia", "Quito, Equador", "Ilhas Galápagos, Equador",
    "La Paz, Bolívia", "Salar de Uyuni, Bolívia", "Assunção, Paraguai", "Caracas, Venezuela",
    
    // Ásia
    "Tóquio, Japão", "Kyoto, Japão", "Osaka, Japão", "Seul, Coreia do Sul",
    "Pequim, China", "Xangai, China", "Hong Kong", "Bangkok, Tailândia",
    "Phuket, Tailândia", "Chiang Mai, Tailândia", "Koh Samui, Tailândia", "Bali, Indonésia",
    "Jacarta, Indonésia", "Singapura", "Kuala Lumpur, Malásia", "Hanoi, Vietnã",
    "Ho Chi Minh, Vietnã", "Siem Reap, Camboja", "Maldivas", "Colombo, Sri Lanka",
    "Nova Deli, Índia", "Mumbai, Índia", "Goa, Índia", "Agra, Índia",
    
    // Oriente Médio e África
    "Dubai, Emirados Árabes", "Abu Dhabi, Emirados Árabes", "Doha, Catar", "Tel Aviv, Israel",
    "Jerusalém, Israel", "Petra, Jordânia", "Marrakech, Marrocos", "Casablanca, Marrocos",
    "Cairo, Egito", "Luxor, Egito", "Cidade do Cabo, África do Sul", "Joanesburgo, África do Sul",
    "Parque Kruger, África do Sul", "Nairóbi, Quênia", "Zanzibar, Tanzânia", "Ilhas Seychelles",
    "Ilhas Maurício", "Antananarivo, Madagascar",
    
    // Oceania
    "Sydney, Austrália", "Melbourne, Austrália", "Brisbane, Austrália", "Perth, Austrália",
    "Auckland, Nova Zelândia", "Queenstown, Nova Zelândia", "Ilhas Fiji", "Bora Bora, Polinésia Francesa",
    "Tahiti, Polinésia Francesa"
  ];

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0;
    const diffTime = e.getTime() - s.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    if (newItem.startDate && newItem.endDate) {
      const days = calculateDays(newItem.startDate, newItem.endDate);
      if (days !== newItem.days) {
        setNewItem(prev => ({ ...prev, days }));
      }
    }
  }, [newItem.startDate, newItem.endDate]);

  const addItem = () => {
    if (!newItem.destination) return;
    
    if (editingId) {
      setHoneymoon(honeymoon.map(h => h.id === editingId ? { ...h, ...newItem as HoneymoonItem, budget: (Number(newItem.hotelCost) || 0) + (Number(newItem.foodCost) || 0) + (Number(newItem.activitiesCost) || 0) + (Number(newItem.carRentalCost) || 0) + (Number(newItem.ticketsCost) || 0) } : h));
      setEditingId(null);
    } else {
      const item: HoneymoonItem = {
        id: crypto.randomUUID(),
        destination: newItem.destination || '',
        startDate: newItem.startDate || '',
        endDate: newItem.endDate || '',
        days: Number(newItem.days) || 0,
        hotelCost: Number(newItem.hotelCost) || 0,
        foodCost: Number(newItem.foodCost) || 0,
        activitiesCost: Number(newItem.activitiesCost) || 0,
        carRentalCost: Number(newItem.carRentalCost) || 0,
        ticketsCost: Number(newItem.ticketsCost) || 0,
        mealPlan: newItem.mealPlan || 'Café da manhã',
        activities: newItem.activities || '',
        budget: (Number(newItem.hotelCost) || 0) + (Number(newItem.foodCost) || 0) + (Number(newItem.activitiesCost) || 0) + (Number(newItem.carRentalCost) || 0) + (Number(newItem.ticketsCost) || 0),
        spent: Number(newItem.spent) || 0
      };
      setHoneymoon([...honeymoon, item]);
    }
    setNewItem({});
    setIsAdding(false);
  };

  const startEdit = (item: HoneymoonItem) => {
    setNewItem(item);
    setEditingId(item.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeItem = (id: string) => {
    setHoneymoon(honeymoon.filter(h => h.id !== id));
  };

  const totalBudget = honeymoon.reduce((acc, h) => acc + h.budget, 0);
  const totalSpent = honeymoon.reduce((acc, h) => acc + h.spent, 0);
  const progressPercentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Planejando a primeira viagem como casados</p>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); if (isAdding) { setEditingId(null); setNewItem({}); } }} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Destino'}
        </button>
      </div>

      {/* Budget Progress Bar */}
      {totalBudget > 0 && (
        <div className="card space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Orçamento Total</div>
              <div className="text-2xl font-serif text-wedding-rose">R$ {totalSpent.toLocaleString()} / R$ {totalBudget.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Progresso</div>
              <div className="text-lg font-medium text-wedding-gold">{progressPercentage.toFixed(1)}%</div>
            </div>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full transition-all",
                progressPercentage > 90 ? "bg-red-400" : "bg-wedding-rose"
              )}
            />
          </div>
          {totalSpent > totalBudget && (
            <p className="text-xs text-red-500 italic">Atenção: O gasto total excedeu o orçamento planejado!</p>
          )}
        </div>
      )}

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Destino</label>
              <input 
                list="cities"
                placeholder="Para onde vocês vão?" 
                className="input-field"
                value={newItem.destination || ''}
                onChange={e => setNewItem({...newItem, destination: e.target.value})}
              />
              <datalist id="cities">
                {popularCities.map(city => <option key={city} value={city} />)}
              </datalist>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Ida</label>
              <input 
                type="date"
                className="input-field"
                value={newItem.startDate || ''}
                onChange={e => setNewItem({...newItem, startDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Volta</label>
              <input 
                type="date"
                className="input-field"
                value={newItem.endDate || ''}
                onChange={e => setNewItem({...newItem, endDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Duração (Dias)</label>
              <input 
                type="number"
                placeholder="Calculado automaticamente" 
                className="input-field bg-stone-50"
                value={newItem.days || ''}
                readOnly
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Passagens (R$)</label>
              <input 
                type="number"
                placeholder="R$ 0,00" 
                className="input-field"
                value={newItem.ticketsCost || ''}
                onChange={e => setNewItem({...newItem, ticketsCost: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Hotel (R$)</label>
              <input 
                type="number"
                placeholder="R$ 0,00" 
                className="input-field"
                value={newItem.hotelCost || ''}
                onChange={e => setNewItem({...newItem, hotelCost: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Alimentação (R$)</label>
              <input 
                type="number"
                placeholder="R$ 0,00" 
                className="input-field"
                value={newItem.foodCost || ''}
                onChange={e => setNewItem({...newItem, foodCost: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Passeios (R$)</label>
              <input 
                type="number"
                placeholder="R$ 0,00" 
                className="input-field"
                value={newItem.activitiesCost || ''}
                onChange={e => setNewItem({...newItem, activitiesCost: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Aluguel Carro (R$)</label>
              <input 
                type="number"
                placeholder="R$ 0,00" 
                className="input-field"
                value={newItem.carRentalCost || ''}
                onChange={e => setNewItem({...newItem, carRentalCost: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Regime de Alimentação</label>
              <select 
                className="input-field bg-white"
                value={newItem.mealPlan || 'Café da manhã'}
                onChange={e => setNewItem({...newItem, mealPlan: e.target.value})}
              >
                <option value="Café da manhã">Café da manhã</option>
                <option value="Meia pensão">Meia pensão</option>
                <option value="All inclusive">All inclusive</option>
                <option value="Café e janta">Café e janta</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Já Gasto (R$)</label>
              <input 
                type="number"
                placeholder="Quanto já pagou?" 
                className="input-field"
                value={newItem.spent || ''}
                onChange={e => setNewItem({...newItem, spent: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Atividades Planejadas</label>
              <input 
                placeholder="Ex: Jantar romântico, Mergulho..." 
                className="input-field"
                value={newItem.activities || ''}
                onChange={e => setNewItem({...newItem, activities: e.target.value})}
              />
            </div>
          </div>
          <button onClick={addItem} className="btn-primary w-full">
            {editingId ? 'Salvar Alterações' : 'Salvar Planejamento de Viagem'}
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {honeymoon.length === 0 && !isAdding && (
          <div className="text-center py-12 text-stone-400 italic">Para onde vocês vão? Adicione um destino!</div>
        )}
        {honeymoon.map(h => (
          <div key={h.id} className="card relative overflow-hidden group border-l-4 border-l-wedding-rose">
            <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
              <button onClick={() => startEdit(h)} className="text-stone-300 hover:text-wedding-gold transition-colors">
                <Edit2 size={18} />
              </button>
              <button onClick={() => removeItem(h.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-wedding-gold mb-1">
                    <MapPin size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Destino Lua de Mel</span>
                  </div>
                  <h3 className="text-3xl font-serif text-wedding-rose">{h.destination}</h3>
                  <div className="flex items-center gap-4 text-sm text-stone-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> 
                      {h.startDate ? formatDate(h.startDate) : 'A definir'} - {h.endDate ? formatDate(h.endDate) : 'A definir'}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-stone-700">{h.days} dias</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">Total Planejado</div>
                  <div className="text-2xl font-serif text-stone-800">R$ {h.budget.toLocaleString()}</div>
                  <div className="text-xs text-wedding-rose font-medium">R$ {h.spent.toLocaleString()} já pagos</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <CostItem icon={<Truck className="rotate-12" size={16} />} label="Passagens" value={h.ticketsCost} />
                <CostItem icon={<Heart size={16} />} label="Hotel" value={h.hotelCost} subLabel={h.mealPlan} />
                <CostItem icon={<Users size={16} />} label="Alimentação" value={h.foodCost} />
                <CostItem icon={<Palmtree size={16} />} label="Passeios" value={h.activitiesCost} />
                <CostItem icon={<Truck size={16} />} label="Carro" value={h.carRentalCost} />
              </div>

              {h.activities && (
                <div className="bg-wedding-cream/50 p-4 rounded-2xl border border-wedding-rose/10">
                  <h4 className="text-xs font-bold uppercase text-wedding-rose mb-2">Atividades Planejadas</h4>
                  <p className="text-sm text-stone-600 italic">"{h.activities}"</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostItem({ icon, label, value, subLabel }: { icon: React.ReactNode, label: string, value: number, subLabel?: string }) {
  return (
    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
      <div className="flex items-center gap-2 text-stone-400 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
      </div>
      <div className="text-sm font-semibold text-stone-800">R$ {value.toLocaleString()}</div>
      {subLabel && <div className="text-[10px] text-wedding-rose font-medium">{subLabel}</div>}
    </div>
  );
}

function DecorationTab({ title, decoration, setDecoration }: { title: string, decoration: DecorationItem[], setDecoration: React.Dispatch<React.SetStateAction<DecorationItem[]>> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<DecorationItem>>({});

  const addItem = () => {
    if (!newItem.item) return;
    
    if (editingId) {
      setDecoration(decoration.map(d => d.id === editingId ? { ...d, ...newItem as DecorationItem } : d));
      setEditingId(null);
    } else {
      const item: DecorationItem = {
        id: crypto.randomUUID(),
        item: newItem.item || '',
        area: newItem.area || 'Geral',
        status: 'pending',
        supplier: newItem.supplier || '',
        price: Number(newItem.price) || 0,
        location: newItem.location || ''
      };
      setDecoration([...decoration, item]);
    }
    setNewItem({});
    setIsAdding(false);
  };

  const startEdit = (item: DecorationItem) => {
    setNewItem(item);
    setEditingId(item.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleStatus = (id: string) => {
    setDecoration(decoration.map(d => {
      if (d.id === id) {
        const nextStatus: DecorationItem['status'] = d.status === 'pending' ? 'in-progress' : d.status === 'in-progress' ? 'completed' : 'pending';
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const removeItem = (id: string) => {
    setDecoration(decoration.filter(d => d.id !== id));
  };

  const areas = Array.from(new Set(decoration.map(d => d.area)));

  const totalBudget = decoration.reduce((acc, d) => acc + (d.price || 0), 0);
  const totalCompleted = decoration.filter(d => d.status === 'completed').reduce((acc, d) => acc + (d.price || 0), 0);
  const completedCount = decoration.filter(d => d.status === 'completed').length;
  const totalCount = decoration.length;
  const progressPercentage = totalBudget > 0 ? (totalCompleted / totalBudget) * 100 : 0;
  const checklistPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Checklist de decoração e estilo</p>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); if (isAdding) { setEditingId(null); setNewItem({}); } }} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Item'}
        </button>
      </div>

      {/* Decoration Summary Panels */}
      {totalCount > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Gastos Ornamentação</div>
                <div className="text-2xl font-serif text-wedding-rose">R$ {totalCompleted.toLocaleString()} / R$ {totalBudget.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Financeiro</div>
                <div className="text-lg font-medium text-wedding-gold">{progressPercentage.toFixed(1)}%</div>
              </div>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-wedding-rose rounded-full"
              />
            </div>
          </div>

          <div className="card space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Checklist Itens</div>
                <div className="text-2xl font-serif text-stone-800">{completedCount} / {totalCount} concluídos</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">Progresso</div>
                <div className="text-lg font-medium text-wedding-gold">{checklistPercentage.toFixed(1)}%</div>
              </div>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${checklistPercentage}%` }}
                className="h-full bg-wedding-gold rounded-full"
              />
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Item</label>
              <input 
                placeholder="Ex: Flores do Altar" 
                className="input-field"
                value={newItem.item || ''}
                onChange={e => setNewItem({...newItem, item: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Área</label>
              <input 
                placeholder="Ex: Cerimônia, Recepção" 
                className="input-field"
                value={newItem.area || ''}
                onChange={e => setNewItem({...newItem, area: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Fornecedor</label>
              <input 
                placeholder="Nome do Fornecedor" 
                className="input-field"
                value={newItem.supplier || ''}
                onChange={e => setNewItem({...newItem, supplier: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Valor (R$)</label>
              <input 
                type="number"
                placeholder="0,00" 
                className="input-field"
                value={newItem.price || ''}
                onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Onde encontrar / Link</label>
              <input 
                placeholder="Link ou Localização" 
                className="input-field"
                value={newItem.location || ''}
                onChange={e => setNewItem({...newItem, location: e.target.value})}
              />
            </div>
          </div>
          <button onClick={addItem} className="btn-primary w-full">
            {editingId ? 'Salvar Alterações' : 'Adicionar Item'}
          </button>
        </motion.div>
      )}

      <div className="space-y-8">
        {decoration.length === 0 && !isAdding && (
          <div className="text-center py-12 text-stone-400 italic">Como será a decoração? Comece a listar os itens!</div>
        )}
        
        {areas.length > 0 ? areas.map(area => (
          <div key={area} className="space-y-3">
            <h3 className="text-lg font-semibold text-stone-400 uppercase tracking-widest pl-2">{area}</h3>
            <div className="grid grid-cols-1 gap-2">
              {decoration.filter(d => d.area === area).map(d => (
                <div key={d.id} className="card py-3 px-4 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleStatus(d.id)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        d.status === 'completed' ? "bg-wedding-rose border-wedding-rose text-white" : 
                        d.status === 'in-progress' ? "border-wedding-gold text-wedding-gold" : "border-stone-200 text-transparent"
                      )}
                    >
                      {d.status === 'completed' ? <CheckCircle2 size={14} /> : d.status === 'in-progress' ? <div className="w-2 h-2 bg-wedding-gold rounded-full" /> : null}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-medium transition-all",
                          d.status === 'completed' ? "text-stone-400 line-through" : "text-stone-700"
                        )}>
                          {d.item}
                        </span>
                      </div>
                      {(d.supplier || d.price || d.location) && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[10px] text-stone-500">
                          {d.supplier && <span className="flex items-center gap-1"><Users size={10} /> {d.supplier}</span>}
                          {d.price && d.price > 0 && <span className="flex items-center gap-1 font-medium text-wedding-rose"><DollarSign size={10} /> R$ {d.price.toLocaleString()}</span>}
                          {d.location && <span className="flex items-center gap-1"><MapPin size={10} /> {d.location}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(d)} className="text-stone-300 hover:text-wedding-gold transition-colors p-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => removeItem(d.id)} className="text-stone-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!targetDate) return null;
      const [year, month, day] = targetDate.split('-').map(Number);
      const target = new Date(year, month - 1, day);
      const difference = +target - +new Date();
      let timeLeft = null;

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="text-black/60 italic">O grande dia chegou!</div>;

  return (
    <div className="flex gap-4 text-black justify-center">
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-serif">{timeLeft.days}</span>
        <span className="text-[10px] uppercase tracking-widest opacity-60">Dias</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-serif">{timeLeft.hours}</span>
        <span className="text-[10px] uppercase tracking-widest opacity-60">Horas</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-serif">{timeLeft.minutes}</span>
        <span className="text-[10px] uppercase tracking-widest opacity-60">Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl md:text-3xl font-serif">{timeLeft.seconds}</span>
        <span className="text-[10px] uppercase tracking-widest opacity-60">Seg</span>
      </div>
    </div>
  );
}

function CoverTab({ config }: { config: WeddingConfig }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12 py-12">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-wedding-rose/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-wedding-gold/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-8 ring-wedding-rose/5">
              {config.bridePhoto ? (
                <img src={config.bridePhoto} className="w-full h-full object-cover" alt={config.brideName} />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                  <User size={64} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border border-stone-100">
              <span className={cn("text-2xl text-black whitespace-nowrap", config.titleFont || "font-script")}>
                {config.brideName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <Heart className="text-black animate-bounce" size={48} fill="currentColor" />
          </div>

          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-8 ring-wedding-rose/5">
              {config.groomPhoto ? (
                <img src={config.groomPhoto} className="w-full h-full object-cover" alt={config.groomName} />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                  <User size={64} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border border-stone-100">
              <span className={cn("text-2xl text-black whitespace-nowrap", config.titleFont || "font-script")}>
                {config.groomName}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="space-y-4"
      >
        <h2 className={cn("text-5xl md:text-7xl text-black", config.titleFont || "font-script")}>
          {config.brideName} & {config.groomName}
        </h2>
        <div className="flex items-center justify-center gap-4 text-black serif italic text-xl md:text-2xl">
          <div className="h-px w-8 bg-stone-200" />
          <span>{formatDate(config.weddingDate)}</span>
          <div className="h-px w-8 bg-stone-200" />
        </div>
        {config.weddingStyle && (
          <p className="text-black font-medium tracking-widest uppercase text-sm">
            Estilo {config.weddingStyle}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pt-8"
      >
        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-sm inline-block">
          <Countdown targetDate={config.weddingDate} />
        </div>
      </motion.div>
    </div>
  );
}

function WeddingTab({ title, config, invitations, guests }: { title: string, config: WeddingConfig, invitations: Invitation[], guests: Guest[] }) {
  const totalInvitations = invitations.length;
  const deliveredInvitations = invitations.filter(i => i.status === 'delivered').length;
  const pendingInvitations = totalInvitations - deliveredInvitations;

  const totalAdults = guests.reduce((acc, g) => acc + 1 + (g.spouseName ? 1 : 0), 0);
  const totalChildren = guests.reduce((acc, g) => acc + (g.childrenCount || 0), 0);
  const totalGuests = totalAdults + totalChildren;

  const confirmedAdults = guests.filter(g => g.confirmed).reduce((acc, g) => acc + 1 + (g.spouseName ? 1 : 0), 0);
  const confirmedChildren = guests.filter(g => g.confirmed).reduce((acc, g) => acc + (g.childrenCount || 0), 0);
  const confirmedGuests = confirmedAdults + confirmedChildren;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Visão geral do grande dia</p>
        </div>
        <div className={cn("flex items-center gap-2 text-wedding-rose text-4xl", config.titleFont || "font-script")}>
          <span>{config.brideName}</span>
          <Heart size={24} fill="currentColor" />
          <span>{config.groomName}</span>
        </div>
      </div>

      {/* Guests Panel */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
          <Users size={18} className="text-wedding-rose" /> Painel de Convidados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-emerald-500" size={24} />
            </div>
            <p className="text-sm text-stone-500 uppercase tracking-widest mb-1">Confirmados</p>
            <p className="text-4xl font-serif text-emerald-600">{confirmedGuests}</p>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-emerald-600/60 flex gap-3">
              <span>{confirmedAdults} Adultos</span>
              <span>{confirmedChildren} Crianças</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4">
              <Users className="text-stone-400" size={24} />
            </div>
            <p className="text-sm text-stone-500 uppercase tracking-widest mb-1">Total Convidados</p>
            <p className="text-4xl font-serif text-stone-800">{totalGuests}</p>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-stone-400 flex gap-3">
              <span>{totalAdults} Adultos</span>
              <span>{totalChildren} Crianças</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invitations Panel */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
          <Mail size={18} className="text-wedding-rose" /> Painel de Convites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-stone-400" size={24} />
            </div>
            <p className="text-sm text-stone-500 uppercase tracking-widest mb-1">Total de Convites</p>
            <p className="text-4xl font-serif text-stone-800">{totalInvitations}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
              <Truck className="text-yellow-500" size={24} />
            </div>
            <p className="text-sm text-stone-500 uppercase tracking-widest mb-1">A Entregar</p>
            <p className="text-4xl font-serif text-yellow-600">{pendingInvitations}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-green-500" size={24} />
            </div>
            <p className="text-sm text-stone-500 uppercase tracking-widest mb-1">Entregues</p>
            <p className="text-4xl font-serif text-green-600">{deliveredInvitations}</p>
          </div>
        </div>
      </div>

      <div className="bg-wedding-rose/5 p-8 rounded-3xl border border-wedding-rose/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-serif text-wedding-rose mb-2">Contagem Regressiva</h3>
            <p className="text-stone-600 italic serif">Cada segundo nos aproxima do nosso "sim".</p>
          </div>
          <div className="bg-wedding-rose p-6 rounded-2xl shadow-lg">
            <Countdown targetDate={config.weddingDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MusicTab({ title, music, setMusic }: { title: string, music: MusicItem[], setMusic: React.Dispatch<React.SetStateAction<MusicItem[]>> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<MusicItem>>({});

  const addItem = () => {
    if (!newItem.moment) return;
    
    if (editingId) {
      setMusic(music.map(m => m.id === editingId ? { ...m, ...newItem as MusicItem } : m));
      setEditingId(null);
    } else {
      const item: MusicItem = {
        id: crypto.randomUUID(),
        moment: newItem.moment || '',
        songTitle: newItem.songTitle || '',
        artist: newItem.artist || '',
        link: newItem.link || ''
      };
      setMusic([...music, item]);
    }
    setNewItem({});
    setIsAdding(false);
  };

  const startEdit = (item: MusicItem) => {
    setNewItem(item);
    setEditingId(item.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeItem = (id: string) => {
    setMusic(music.filter(m => m.id !== id));
  };

  const totalSongs = music.length;
  const definedSongs = music.filter(m => m.songTitle).length;
  const pendingSongs = totalSongs - definedSongs;

  const addDefaultMoments = () => {
    const defaults = [
      { id: '1', moment: 'Entrada do Noivo', songTitle: '', artist: '' },
      { id: '2', moment: 'Entrada das Damas e Pajens', songTitle: '', artist: '' },
      { id: '3', moment: 'Entrada dos Padrinhos', songTitle: '', artist: '' },
      { id: '4', moment: 'Entrada da Noiva', songTitle: '', artist: '' },
      { id: '5', moment: 'Entrada das Alianças', songTitle: '', artist: '' },
      { id: '6', moment: 'Saída dos Noivos', songTitle: '', artist: '' },
      { id: '7', moment: 'Saída dos Padrinhos', songTitle: '', artist: '' },
      { id: '8', moment: 'Saída dos Pais', songTitle: '', artist: '' }
    ];

    // Only add moments that don't already exist (by name)
    const newMoments = defaults.filter(def => !music.some(m => m.moment === def.moment));
    if (newMoments.length > 0) {
      setMusic([...music, ...newMoments.map(m => ({ ...m, id: crypto.randomUUID() }))]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl text-stone-800">{title}</h2>
          <p className="text-stone-500 serif italic">Trilha sonora do grande dia</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {music.length < 8 && (
            <button onClick={addDefaultMoments} className="flex-1 md:flex-none px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 transition-all text-sm flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-wedding-gold" /> Momentos Padrão
            </button>
          )}
          <button onClick={() => { setIsAdding(!isAdding); if (isAdding) { setEditingId(null); setNewItem({}); } }} className="flex-1 md:flex-none btn-primary flex items-center justify-center gap-2">
            <Plus size={18} /> {isAdding ? 'Cancelar' : 'Adicionar Música'}
          </button>
        </div>
      </div>

      {/* Music Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card flex flex-col items-center text-center py-4 border-l-4 border-l-stone-400">
          <div className="text-2xl font-serif text-stone-800">{totalSongs}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Total de Momentos</div>
        </div>
        <div className="card flex flex-col items-center text-center py-4 border-l-4 border-l-green-500">
          <div className="text-2xl font-serif text-green-600">{definedSongs}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Músicas Definidas</div>
        </div>
        <div className="card flex flex-col items-center text-center py-4 border-l-4 border-l-red-500">
          <div className="text-2xl font-serif text-red-600">{pendingSongs}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Pendentes</div>
        </div>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Momento / Entrada</label>
              <input 
                placeholder="Ex: Entrada da Noiva" 
                className="input-field"
                value={newItem.moment || ''}
                onChange={e => setNewItem({...newItem, moment: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Título da Música</label>
              <input 
                placeholder="Nome da música" 
                className="input-field"
                value={newItem.songTitle || ''}
                onChange={e => setNewItem({...newItem, songTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Artista / Cantor</label>
              <input 
                placeholder="Nome do artista" 
                className="input-field"
                value={newItem.artist || ''}
                onChange={e => setNewItem({...newItem, artist: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-stone-400 mb-1 block">Link (Spotify/YouTube)</label>
              <input 
                placeholder="https://..." 
                className="input-field"
                value={newItem.link || ''}
                onChange={e => setNewItem({...newItem, link: e.target.value})}
              />
            </div>
          </div>
          <button onClick={addItem} className="btn-primary w-full">
            {editingId ? 'Salvar Alterações' : 'Adicionar à Playlist'}
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {music.length === 0 && !isAdding && (
          <div className="text-center py-12 text-stone-400 italic">Nenhuma música adicionada ainda.</div>
        )}
        {music.map(m => (
          <div 
            key={m.id} 
            className={cn(
              "card py-4 px-6 flex items-center justify-between group border-l-4 hover:shadow-md transition-all",
              m.songTitle ? "border-l-green-500 bg-green-50/30" : "border-l-red-500 bg-red-50/30"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                m.songTitle ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              )}>
                <Music size={20} />
              </div>
              <div>
                <div className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mb-0.5",
                  m.songTitle ? "text-green-600" : "text-red-600"
                )}>
                  {m.moment}
                </div>
                <h3 className="text-lg font-medium text-stone-800">
                  {m.songTitle || <span className="text-red-400 italic">Música não definida</span>}
                </h3>
                {m.artist && <p className="text-xs text-stone-500">{m.artist}</p>}
                {m.link && (
                  <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-wedding-rose hover:underline flex items-center gap-1 mt-1">
                    <ExternalLink size={10} /> Ver música
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 transition-opacity">
              <button onClick={() => startEdit(m)} className="p-2 text-stone-400 hover:text-wedding-gold transition-colors">
                <Edit2 size={18} />
              </button>
              <button onClick={() => removeItem(m.id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
