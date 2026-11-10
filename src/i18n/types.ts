export type Language = 'ru' | 'kg' | 'en' | 'zh';

export interface LanguageOption {
  code: Language;
  label: string;
  shortLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ru', label: 'Русский', shortLabel: 'РУ', flag: '🇷🇺' },
  { code: 'kg', label: 'Кыргызча', shortLabel: 'КГ', flag: '🇰🇬' },
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧' },
  { code: 'zh', label: '中文', shortLabel: '中文', flag: '🇨🇳' },
];
