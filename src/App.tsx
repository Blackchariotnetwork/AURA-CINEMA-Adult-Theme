/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewTab, Scene, Model, SubscriptionPlan } from './types';
import { MOCK_SCENES, MOCK_MODELS, MOCK_PHOTO_SETS, SUBSCRIPTION_PLANS } from './data/mockData';
import { Header } from './components/Header';
import { HeroTrailer } from './components/HeroTrailer';
import { VideoGallery } from './components/VideoGallery';
import { VideoModal } from './components/VideoModal';
import { ModelDirectory } from './components/ModelDirectory';
import { ModelModal } from './components/ModelModal';
import { PhotoGallery } from './components/PhotoGallery';
import { BillingSection } from './components/BillingSection';
import { PerksComparison } from './components/PerksComparison';
import { CheckoutModal } from './components/CheckoutModal';
import { LoginModal } from './components/LoginModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { ShieldCheck, Lock, Sparkles, Film, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('tour');
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | undefined>(undefined);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModelFilter, setSelectedModelFilter] = useState<string | null>(null);

  const handleOpenJoinWithPlan = (plan: SubscriptionPlan) => {
    setSelectedPlanForCheckout(plan);
    setJoinModalOpen(true);
  };

  const handleOpenJoinGeneral = () => {
    setSelectedPlanForCheckout(undefined);
    setJoinModalOpen(true);
  };

  const handleFilterByModel = (modelName: string) => {
    setSelectedModelFilter(modelName);
    setCurrentTab('scenes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModelFromScene = (modelName: string) => {
    const found = MOCK_MODELS.find(
      (m) => m.name.toLowerCase() === modelName.toLowerCase()
    );
    if (found) {
      setSelectedModel(found);
    } else {
      handleFilterByModel(modelName);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#ededf0] flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenJoinModal={handleOpenJoinGeneral}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {/* TAB 1: Studio Tour Home (Comprehensive overview) */}
        {currentTab === 'tour' && (
          <div className="space-y-4">
            {/* Flagship Hero Showcase Player */}
            <HeroTrailer
              featuredScenes={MOCK_SCENES.filter((s) => s.isFeatured)}
              onSelectScene={(scene) => setSelectedScene(scene)}
              onOpenJoinModal={handleOpenJoinGeneral}
            />

            {/* Top 4K Releases Showcase Grid */}
            <VideoGallery
              scenes={MOCK_SCENES}
              onSelectScene={(scene) => setSelectedScene(scene)}
              onOpenJoinModal={handleOpenJoinGeneral}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedModelFilter={selectedModelFilter}
              onClearModelFilter={() => setSelectedModelFilter(null)}
            />

            {/* Exclusive Stars Teaser Section */}
            <ModelDirectory
              models={MOCK_MODELS}
              onSelectModel={(model) => setSelectedModel(model)}
              onFilterByModel={handleFilterByModel}
              onOpenJoinModal={handleOpenJoinGeneral}
            />

            {/* Free Tour vs VIP Member Perks Breakdown */}
            <PerksComparison onOpenJoinModal={handleOpenJoinGeneral} />

            {/* High-Resolution Photo Sets Teaser */}
            <PhotoGallery
              photoSets={MOCK_PHOTO_SETS}
              onOpenJoinModal={handleOpenJoinGeneral}
            />

            {/* Secure Member Billing Hub & Discrete Descriptors */}
            <BillingSection onSelectPlan={handleOpenJoinWithPlan} />
          </div>
        )}

        {/* TAB 2: Dedicated Video Galleries View */}
        {currentTab === 'scenes' && (
          <div className="pt-4">
            <VideoGallery
              scenes={MOCK_SCENES}
              onSelectScene={(scene) => setSelectedScene(scene)}
              onOpenJoinModal={handleOpenJoinGeneral}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedModelFilter={selectedModelFilter}
              onClearModelFilter={() => setSelectedModelFilter(null)}
            />
          </div>
        )}

        {/* TAB 3: Dedicated Performers / Models View */}
        {currentTab === 'models' && (
          <div className="pt-4">
            <ModelDirectory
              models={MOCK_MODELS}
              onSelectModel={(model) => setSelectedModel(model)}
              onFilterByModel={handleFilterByModel}
              onOpenJoinModal={handleOpenJoinGeneral}
            />
          </div>
        )}

        {/* TAB 4: Dedicated Photo Sets View */}
        {currentTab === 'photos' && (
          <div className="pt-4">
            <PhotoGallery
              photoSets={MOCK_PHOTO_SETS}
              onOpenJoinModal={handleOpenJoinGeneral}
            />
          </div>
        )}

        {/* TAB 5: Dedicated VIP Membership & Pricing View */}
        {currentTab === 'pricing' && (
          <div className="pt-4">
            <BillingSection onSelectPlan={handleOpenJoinWithPlan} />
            <PerksComparison onOpenJoinModal={handleOpenJoinGeneral} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenJoinModal={handleOpenJoinGeneral}
        onOpenLoginModal={() => setLoginModalOpen(true)}
      />

      {/* Mobile-First Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenJoinModal={handleOpenJoinGeneral}
      />

      {/* Modals */}
      <VideoModal
        scene={selectedScene}
        onClose={() => setSelectedScene(null)}
        onOpenJoinModal={handleOpenJoinGeneral}
        onSelectModel={handleSelectModelFromScene}
      />

      <ModelModal
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
        onFilterByModel={handleFilterByModel}
        onOpenJoinModal={handleOpenJoinGeneral}
        relatedScenes={
          selectedModel
            ? MOCK_SCENES.filter((s) =>
                s.models.some((m) => m.name.toLowerCase() === selectedModel.name.toLowerCase())
              )
            : []
        }
      />

      <CheckoutModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        initialPlan={selectedPlanForCheckout}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onOpenJoinModal={handleOpenJoinGeneral}
      />
    </div>
  );
}
