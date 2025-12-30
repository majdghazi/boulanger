'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare, Users, TrendingUp, Clock, Star, ShoppingCart,
  BarChart3, PieChart, Activity, Target, Zap, AlertCircle,
  CheckCircle, ArrowUp, ArrowDown, Calendar, Filter
} from 'lucide-react';

export default function DashboardPage() {
  const metrics = [
    {
      label: 'Conversations totales',
      value: '12,847',
      change: 23,
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      label: 'Taux de conversion',
      value: '34.2%',
      change: 5.2,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      label: 'Temps moyen',
      value: '4m 32s',
      change: -12,
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      label: 'Satisfaction client',
      value: '4.7/5',
      change: 0.3,
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const topCategories = [
    { name: 'Électroménager', count: 4521, percentage: 35 },
    { name: 'TV & Son', count: 3102, percentage: 24 },
    { name: 'Informatique', count: 2567, percentage: 20 },
    { name: 'Téléphonie', count: 1843, percentage: 14 },
    { name: 'Cuisine', count: 814, percentage: 7 }
  ];

  const recentConversations = [
    {
      id: 1,
      user: 'Client #4521',
      category: 'Lave-linge',
      status: 'converted',
      duration: '3m 45s',
      product: 'Bosch EcoSilence Serie 6'
    },
    {
      id: 2,
      user: 'Client #4520',
      category: 'TV OLED',
      status: 'converted',
      duration: '5m 12s',
      product: 'LG OLED 55"'
    },
    {
      id: 3,
      user: 'Client #4519',
      category: 'Réfrigérateur',
      status: 'abandoned',
      duration: '2m 30s',
      product: '-'
    },
    {
      id: 4,
      user: 'Client #4518',
      category: 'Aspirateur',
      status: 'converted',
      duration: '4m 05s',
      product: 'Dyson V15'
    }
  ];

  const agentRules = [
    {
      id: 1,
      name: 'Question budget obligatoire',
      status: 'active',
      triggers: 1243,
      description: 'Toujours demander le budget avant de recommander'
    },
    {
      id: 2,
      name: 'Promotion services Boulanger',
      status: 'active',
      triggers: 892,
      description: 'Mentionner les services après chaque recommandation'
    },
    {
      id: 3,
      name: 'Limite 3 produits',
      status: 'active',
      triggers: 756,
      description: 'Maximum 3 produits recommandés par conversation'
    },
    {
      id: 4,
      name: 'Escalade humain',
      status: 'warning',
      triggers: 45,
      description: 'Proposer un conseiller si insatisfaction détectée'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#003366]">Dashboard Product Owner</h1>
              <p className="text-gray-600 mt-1">Suivi et pilotage du Shopping Agent IA</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Calendar size={16} />
                7 derniers jours
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Filter size={16} />
                Filtrer
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#ff6600] text-white rounded-lg text-sm hover:bg-[#e55a00]">
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${metric.color} rounded-lg`}>
                  <metric.icon size={20} className="text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Categories Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Catégories les plus demandées</h2>
              <PieChart size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count} conversations</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-[#003366] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Performance Temps Réel</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">47</div>
                  <div className="text-sm text-gray-500">Conversations actives</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target size={20} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">89%</div>
                  <div className="text-sm text-gray-500">Objectif atteint (T1)</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ShoppingCart size={20} className="text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">€156K</div>
                  <div className="text-sm text-gray-500">Ventes assistées (mois)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Conversations & Agent Rules */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Conversations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Conversations récentes</h2>
              <button className="text-sm text-[#ff6600] hover:underline">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Catégorie</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {recentConversations.map((conv) => (
                    <tr key={conv.id} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium">{conv.user}</td>
                      <td className="py-3 text-sm text-gray-600">{conv.category}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                          conv.status === 'converted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {conv.status === 'converted' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                          {conv.status === 'converted' ? 'Converti' : 'Abandonné'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{conv.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Agent Rules */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Règles Agentiques</h2>
              <button className="text-sm text-[#ff6600] hover:underline">Configurer</button>
            </div>
            <div className="space-y-4">
              {agentRules.map((rule) => (
                <div key={rule.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    rule.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{rule.name}</span>
                      <span className="text-xs text-gray-500">{rule.triggers} déclenchements</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MVP Roadmap */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Roadmap MVP - T1 2025</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="font-medium text-green-800">Livré</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Phase 1 - Core Agent</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Parcours conversationnel</li>
                <li>• Recommandations produits</li>
                <li>• Intégration services</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-blue-600" />
                <span className="font-medium text-blue-800">En cours</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Phase 2 - Personnalisation</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Historique client</li>
                <li>• Recommandations ML</li>
                <li>• A/B testing</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-gray-500" />
                <span className="font-medium text-gray-600">Planifié</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Phase 3 - Omnicanal</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• App mobile</li>
                <li>• WhatsApp</li>
                <li>• Magasin connecté</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-gray-500" />
                <span className="font-medium text-gray-600">Vision</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Phase 4 - Agent Autonome</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Actions automatisées</li>
                <li>• Négociation prix</li>
                <li>• Suivi post-achat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
