import React from 'react';

export interface UnitData {
  id: number;
  unitCode: string; // e.g., "FEB", "FH"
  unitName: string; // Full name if needed, or just use code
  pagu: number;
  usulan: number;
  percentUsulan: number;
  review: number;
  percentReview: number;
  paguBlokir: number;
  paguAktif: number;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  colorClass: string;
}

export type BudgetType = 'program' | 'kegiatan' | 'output' | 'suboutput' | 'komponen' | 'akun' | 'detail';

export interface BudgetHierarchy {
  id: string;
  code: string;
  description: string;
  type: BudgetType;
  volume?: number;
  unit?: string;
  unitPrice?: number;
  paguTetap: number;
  usulan: number;
  children?: BudgetHierarchy[];
}

export interface User {
  id: number;
  username: string;
  name: string;
  nip: string;
  unit: string;
  role: string;
  jabatan: string;
  status: 'active' | 'inactive';
}