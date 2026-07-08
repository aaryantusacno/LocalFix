import { MousePointer, Calendar, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MousePointer,
      titleKey: 'step1Title' as const,
      descKey: 'step1Desc' as const,
      color: 'bg-primary',
    },
    {
      icon: Calendar,
      titleKey: 'step2Title' as const,
      descKey: 'step2Desc' as const,
      color: 'bg-accent',
    },
    {
      icon: Wrench,
      titleKey: 'step3Title' as const,
      descKey: 'step3Desc' as const,
      color: 'bg-success',
    },
  ];

  return (
    <section className="py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-10">{t('howItWorks')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="relative mb-4">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-border rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary">{index + 1}</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{t(step.titleKey)}</h3>
              <p className="text-muted-foreground text-sm">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
