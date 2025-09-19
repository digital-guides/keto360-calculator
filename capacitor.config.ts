import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fbf6a34f8cba424e9ca80149998d9995',
  appName: 'keto-compass-guide',
  webDir: 'dist',
  server: {
    url: 'https://fbf6a34f-8cba-424e-9ca8-0149998d9995.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;