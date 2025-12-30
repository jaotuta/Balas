
import { ColorSegment } from './types';

// Lista de cores únicas baseadas nos sabores, mas tratadas apenas como cores
// para garantir probabilidade igual (1 segmento por cor)
export const COLOR_SEGMENTS: ColorSegment[] = [
  { id: 'c1', color: '#fef08a', borderColor: '#ca8a04', displayName: 'Amarelo Claro' },
  { id: 'c2', color: '#4b5563', borderColor: '#1f2937', displayName: 'Cinza' },
  { id: 'c3', color: '#84cc16', borderColor: '#3f6212', displayName: 'Verde Lima' },
  { id: 'c4', color: '#fbcfe8', borderColor: '#be185d', displayName: 'Rosa Pastel' },
  { id: 'c5', color: '#ef4444', borderColor: '#991b1b', displayName: 'Vermelho' },
  { id: 'c6', color: '#b91c1c', borderColor: '#7f1d1d', displayName: 'Vinho' },
  { id: 'c7', color: '#78350f', borderColor: '#451a03', displayName: 'Marrom' },
  { id: 'c8', color: '#fde68a', borderColor: '#b45309', displayName: 'Bege' },
  { id: 'c9', color: '#22c55e', borderColor: '#166534', displayName: 'Verde Grama' },
  { id: 'c10', color: '#bfdbfe', borderColor: '#1d4ed8', displayName: 'Azul Claro' },
  { id: 'c11', color: '#f472b6', borderColor: '#db2777', displayName: 'Rosa Choque' },
  { id: 'c12', color: '#eab308', borderColor: '#854d0e', displayName: 'Amarelo Ouro' },
  { id: 'c13', color: '#ea580c', borderColor: '#9a3412', displayName: 'Laranja' }
];

export const MAGICAL_QUOTES = [
  "Qual cor o destino reservou para você?",
  "Ouse girar o círculo cromático.",
  "Deixe a cor guiar sua sorte."
];
