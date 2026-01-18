import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, FileText, Send, Sun, Moon } from 'lucide-react';
import { LiquidGlassCard } from './components/ui/liquid-weather-glass';

// Design Tokens - Golden Apple Style
const tokens = {
  light: {
    bgPrimary: '#F8F8F8',
    bgSecondary: '#EBEBEB',
    bgTertiary: '#DADADA',
    textPrimary: '#0D0E0A',
    textSecondary: '#85858D',
    strokeSoft: 'rgba(0, 0, 0, 0.08)',
    accentLime: '#DFF73D',
    accentLime2: '#CEE30A',
    accentLimeDark: '#758215',
    accentPink: '#FB6ACA',
    chrome: '#D6D7D7',
    glass: 'rgba(255, 255, 255, 0.25)',
    glassBorder: 'rgba(0, 0, 0, 0.08)'
  },
  dark: {
    bgPrimary: '#0D0E0A',
    bgSecondary: '#1A1B17',
    bgTertiary: '#2A2B27',
    textPrimary: '#F8F8F8',
    textSecondary: '#85858D',
    strokeSoft: 'rgba(255, 255, 255, 0.1)',
    accentLime: '#DFF73D',
    accentLime2: '#CEE30A',
    accentLimeDark: '#758215',
    accentPink: '#FB6ACA',
    chrome: '#D6D7D7',
    glass: 'rgba(26, 27, 23, 0.35)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  }
};

const keyResults = [
  {
    company: 'Itgro',
    context: 'TravelTech B2B2C',
    metric: '20% → 62%',
    label: 'Конверсия лид → клиент',
    levers: ['Self-serve онбординг', 'Сокращение шагов', 'Улучшение пути внедрения'],
    period: 'Апр 2025 — н.в.'
  },
  {
    company: 'Itgro',
    context: 'TravelTech B2B2C',
    metric: '10 → 3 дня',
    label: 'Срок онбординга',
    levers: ['Стандартизация', 'Автоматизация', 'Чек-листы/шаблоны'],
    period: 'Апр 2025 — н.в.'
  },
  {
    company: 'Itgro',
    context: 'TravelTech B2B2C',
    metric: '−45%',
    label: 'Нагрузка на саппорт',
    levers: ['Самообслуживание', 'Подсказки в продукте', 'Устранение проблем'],
    period: 'Апр 2025 — н.в.'
  },
  {
    company: 'Itgro',
    context: 'TravelTech B2B2C',
    metric: '−50%',
    label: 'Стоимость обслуживания',
    levers: ['Автоматизация', 'Стандартизация', 'Снижение ручного труда'],
    period: 'Апр 2025 — н.в.'
  },
  {
    company: 'Тетрика',
    context: 'EdTech B2C',
    metric: '21% → 33%',
    label: 'Конверсия пробного урока',
    levers: ['Исследования', 'Итерации сценария', 'Улучшение оффера'],
    period: 'Апр 2024 — Апр 2025'
  },
  {
    company: 'Тетрика',
    context: 'EdTech B2C',
    metric: '+10%',
    label: 'Средний чек и доходимость',
    levers: ['Упаковка', 'Улучшение раннего опыта'],
    period: 'Апр 2024 — Апр 2025'
  },
  {
    company: 'Тетрика',
    context: 'EdTech B2C',
    metric: '+3%',
    label: 'LTV',
    levers: ['Удержание', 'Снижение раннего оттока'],
    period: 'Апр 2024 — Апр 2025'
  },
  {
    company: 'Productoria',
    context: 'ML B2B HoReCa',
    metric: '5 / 4 мес',
    label: 'Клиентов за период',
    levers: ['Вывод на рынок', 'GTM-тесты'],
    period: 'Янв 2023 — Мар 2024'
  }
];

const experiences = [
  {
    company: 'Itgro',
    role: 'Product Manager',
    period: 'Апрель 2025 — настоящее время',
    duration: '10 месяцев',
    achievements: [
      'Поднял конверсию из лида в клиента с 20% до 62%',
      'Сократил срок онбординга с 10 до 3 дней',
      'Снизил нагрузку на саппорт на 45%',
      'Сократил стоимость обслуживания на 50%'
    ]
  },
  {
    company: 'Тетрика (VK)',
    role: 'Product Manager',
    period: 'Апрель 2024 — Апрель 2025',
    duration: '1 год 1 месяц',
    achievements: [
      'Повысил средний чек и доходимость на 10%',
      'Увеличил конверсию пробного урока с 21% до 33%',
      'Улучшил LTV на 3%'
    ]
  },
  {
    company: 'Productoria.space',
    role: 'Product Manager',
    period: 'Январь 2023 — Март 2024',
    duration: '1 год 3 месяца',
    achievements: [
      'Привлёк 5 клиентов за 4 месяца',
      'Средний чек 400 тыс. руб.',
      'Вывел ML-продукт на рынок от discovery до внедрений'
    ]
  },
  {
    company: 'Productoria.space',
    role: 'Product Analyst',
    period: 'Май 2022 — Декабрь 2022',
    duration: '8 месяцев',
    achievements: [
      'Снизил time-to-first-response с 15 до 3 минут',
      'Увеличил конверсию в бронь на 7%'
    ]
  }
];

const projects = [
  {
    title: 'TravelTech Growth',
    category: 'Onboarding & Activation',
    metrics: ['20→62%', '10→3 дня', '−45%', '−50%'],
    levers: ['Self-serve онбординг', 'Автоматизация', 'Стандартизация']
  },
  {
    title: 'EdTech Growth',
    category: 'Conversion & Retention',
    metrics: ['21→33%', '+10%', '+3% LTV'],
    levers: ['Исследования', 'Итерации', 'Ранний опыт']
  },
  {
    title: 'ML B2B Launch',
    category: 'Market Entry',
    metrics: ['5 клиентов', '4 месяца', '400k чек'],
    levers: ['GTM-тесты', 'Позиционирование', 'Упаковка ценности']
  },
  {
    title: 'Золотое Яблоко → Китай',
    category: 'Research Case',
    metrics: ['Проектная группа'],
    levers: ['Вывод на рынок', 'Стратегия']
  }
];

const skills = {
  'Product': ['CustDev', 'JTBD', 'CJM', 'Roadmap', 'Product strategy', 'Discovery/Delivery', 'Product-led growth', 'PMF'],
  'Experimentation & Metrics': ['A/B тесты', 'Unit-экономика', 'ARPU/LTV/CAC', 'Деревья метрик', 'DAU/WAU/MAU'],
  'Analytics & Tools': ['SQL', 'Python', 'Amplitude', 'PowerBI/Superset', 'Excel'],
  'AI & Automation': ['n8n', 'GPT', 'Cursor', 'Gemini agents']
};

const PortfolioApp = () => {
  const [theme, setTheme] = useState('light');
  const colors = tokens[theme];
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved || (prefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // 3D Glossy Object Component
  const GlossyBlob = () => {
    const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    
    return (
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ y: prefersReducedMotion ? 0 : y }}
      >
        <motion.div
          className="relative w-64 h-64 md:w-96 md:h-96"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          {/* Main glossy sphere */}
          <div 
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.accentLime}, ${colors.accentLime2})`,
              filter: 'blur(40px)'
            }}
          />
          <div 
            className="absolute inset-8 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${colors.accentLime} 0%, ${colors.accentLime2} 100%)`,
              boxShadow: `0 20px 60px rgba(223, 247, 61, 0.3), inset 0 -20px 40px rgba(0,0,0,0.2), inset 0 20px 40px rgba(255,255,255,0.4)`
            }}
          />
          {/* Highlight */}
          <div 
            className="absolute top-12 left-12 w-20 h-20 rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)'
            }}
          />
        </motion.div>
      </motion.div>
    );
  };

  const GlassCard = ({ children, className = '' }) => {
    return (
      <LiquidGlassCard
        draggable={false}
        expandable={false}
        blurIntensity="xl"
        glowIntensity="sm"
        shadowIntensity="md"
        borderRadius="28px"
        className={`p-6 bg-white/10 dark:bg-white/5 transition-all ${className}`}
      >
        {children}
      </LiquidGlassCard>
    );
  };


  const Pill = ({ children, variant = 'default', className = '' }) => {
    const bg = variant === 'lime' ? colors.accentLime : 
                variant === 'chrome' ? colors.chrome : colors.bgTertiary;
    const text = variant === 'lime' ? colors.textPrimary : colors.textPrimary;
    const border = variant === 'lime' ? colors.accentLimeDark : colors.glassBorder;

    return (
      <span 
        className={`liquid-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${className}`}
        style={{ background: bg, color: text, borderColor: border }}
      >
        {children}
      </span>
    );
  };

  const LiquidButton = ({ children, href, className = '', style = {}, ...props }) => {
    const content = (
      <span
        className={`liquid-glass inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 ${className}`}
        style={style}
        {...props}
      >
        {children}
      </span>
    );

    if (!href) {
      return content;
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  };

  const IconButton = ({ icon: Icon, href, ariaLabel }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="liquid-icon w-12 h-12 flex items-center justify-center"
    >
      <Icon size={20} style={{ color: colors.textPrimary }} />
    </a>
  );

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-colors duration-300"
      style={{ 
        background: colors.bgPrimary,
        color: colors.textPrimary,
        '--glass-bg': colors.glass,
        '--glass-border': colors.glassBorder,
        '--chip-bg': theme === 'light'
          ? 'rgba(255,255,255,0.3)'
          : 'rgba(26,27,23,0.35)',
        '--chip-border': colors.strokeSoft
      }}
    >
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Pill variant="lime">Артём Попов</Pill>
          
          <div className="flex gap-3">
            <IconButton 
              icon={FileText} 
              href="https://ekaterinburg.hh.ru/resume/6d6458b5ff0fca29e60039ed1f366743483038"
              ariaLabel="HH Resume"
            />
            <IconButton 
              icon={Linkedin} 
              href="https://www.linkedin.com/in/artem-popov-a05b65323/"
              ariaLabel="LinkedIn"
            />
            <button
              onClick={toggleTheme}
              className="liquid-icon w-12 h-12 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <GlossyBlob />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Product Manager
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            style={{ color: colors.textSecondary }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            3+ года опыта. End-to-end продукт, аналитика, эксперименты и AI-автоматизации.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <LiquidButton
              href="https://ekaterinburg.hh.ru/resume/6d6458b5ff0fca29e60039ed1f366743483038"
              style={{ background: colors.accentLime, color: colors.textPrimary }}
            >
              Открыть резюме
            </LiquidButton>
            <LiquidButton
              href="https://t.me/K2a33b"
              style={{ background: colors.glass, color: colors.textPrimary }}
            >
              Написать в Telegram
            </LiquidButton>
            <LiquidButton
              href="https://www.linkedin.com/in/artem-popov-a05b65323/"
              style={{ background: colors.glass, color: colors.textPrimary }}
            >
              LinkedIn
            </LiquidButton>
          </motion.div>
        </div>
      </section>

      {/* Key Results */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Ключевые результаты</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {keyResults.map((result, i) => (
              <GlassCard key={i}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Pill variant="default">{result.company}</Pill>
                    <Pill variant="chrome" className="text-xs">{result.context}</Pill>
                  </div>
                  <span className="text-xs" style={{ color: colors.textSecondary }}>{result.period}</span>
                </div>
                
                <div className="mb-3">
                  <div 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: colors.accentLime }}
                  >
                    {result.metric}
                  </div>
                  <div className="text-lg font-medium">{result.label}</div>
                </div>

                <div className="pt-3 border-t" style={{ borderColor: colors.strokeSoft }}>
                  <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>За счёт:</div>
                  <div className="flex flex-wrap gap-2">
                    {result.levers.map((lever, j) => (
                      <span key={j} className="liquid-chip px-3 py-1 text-xs">
                        {lever}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Опыт работы</h2>
          
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <GlassCard key={i}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.company}</h3>
                    <p className="text-lg mt-1" style={{ color: colors.accentLimeDark }}>{exp.role}</p>
                  </div>
                  <div className="text-right text-sm" style={{ color: colors.textSecondary }}>
                    <div>{exp.period}</div>
                    <div className="mt-1">{exp.duration}</div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((ach, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: colors.accentLime }}
                      />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Проекты и кейсы</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <GlassCard key={i}>
                <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>{project.category}</div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((m, j) => (
                    <Pill key={j} variant="lime" className="font-bold">
                      {m}
                    </Pill>
                  ))}
                </div>

                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  <div className="mb-1">Рычаги:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.levers.map((lever, j) => (
                      <span key={j}>
                        {lever}{j < project.levers.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Навыки</h2>
          
          <div className="space-y-6">
            {Object.entries(skills).map(([category, items], i) => (
              <GlassCard key={i}>
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: colors.accentLimeDark }}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, j) => (
                    <span key={j} className="liquid-chip px-4 py-2 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Образование</h2>
          
          <GlassCard>
            <h3 className="text-xl font-bold mb-4">Высшее образование</h3>
            <div className="space-y-3 mb-8">
              <div>
                <div className="font-medium">Уральский федеральный университет</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>Международная экономика (Full Eng) • Выпуск 2026</div>
              </div>
              <div>
                <div className="font-medium">Beijing University</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>2024 • Обучение по гранту</div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Курсы</h3>
            <ul className="space-y-2" style={{ color: colors.textSecondary }}>
              <li>2024 • Karpov.courses • Принятие решений на основе данных</li>
              <li>2024 • GoPractice • Симулятор управления ростом продукта</li>
              <li>2023 • GoPractice • SQL для продуктовой аналитики</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Обо мне</h2>
          
          <GlassCard>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Я продуктовый менеджер, который любит понятные метрики, быстрые итерации и честный impact. 
              Комфортно веду discovery и delivery, умею копать в данные и общаться с командой. 
              Быстро автоматизирую рутину и ускоряю проверку гипотез через AI-инструменты. 
              Сферы: TravelTech, EdTech, B2B SaaS, ML-продукты.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Контакты</h2>
          
          <GlassCard>
            <div className="text-center mb-8">
              <p className="text-lg" style={{ color: colors.textSecondary }}>
                Открыт к обсуждению новых возможностей
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <LiquidButton
                href="https://t.me/K2a33b"
                className="w-full"
                style={{ background: colors.accentLime, color: colors.textPrimary }}
              >
                <Send size={20} /> Telegram
              </LiquidButton>
              
              <a href="mailto:artem.product.manager12@gmail.com">
                <LiquidButton
                  className="w-full"
                  style={{ background: colors.glass, color: colors.textPrimary }}
                >
                  <Mail size={20} /> Email
                </LiquidButton>
              </a>

              <LiquidButton
                href="https://www.linkedin.com/in/artem-popov-a05b65323/"
                className="w-full"
                style={{ background: colors.glass, color: colors.textPrimary }}
              >
                <Linkedin size={20} /> LinkedIn
              </LiquidButton>

              <LiquidButton
                href="https://ekaterinburg.hh.ru/resume/6d6458b5ff0fca29e60039ed1f366743483038"
                className="w-full"
                style={{ background: colors.glass, color: colors.textPrimary }}
              >
                <FileText size={20} /> Резюме HH
              </LiquidButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 px-6 border-t"
        style={{ borderColor: colors.strokeSoft }}
      >
        <div className="max-w-7xl mx-auto text-center text-sm" style={{ color: colors.textSecondary }}>
          <p>© 2026 Артём Попов • Product Manager</p>
          <p className="mt-2">Русский (родной) • English C1</p>
        </div>
      </footer>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{
          scaleX: scrollYProgress,
          background: colors.accentLime
        }}
      />
    </div>
  );
};

export default PortfolioApp
