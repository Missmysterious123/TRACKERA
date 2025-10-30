"use server";

import { redirect } from 'next/navigation';
import { managers, staffMembers } from './data';

export async function authenticateManager(formData: FormData) {
  const managerId = formData.get('id') as string;
  const isValid = managers.some((manager) => manager.id === managerId.toUpperCase());
  
  if (isValid) {
    redirect('/manager/dashboard');
  } else {
    return { error: 'Invalid Manager ID. Please try again.' };
  }
}

export async function authenticateStaff(formData: FormData) {
  const staffId = formData.get('id') as string;
  const isValid = staffMembers.some((staff) => staff.id === staffId.toUpperCase());
  
  if (isValid) {
    redirect('/staff/dashboard');
  } else {
    return { error: 'Invalid Staff ID. Please try again.' };
  }
}
