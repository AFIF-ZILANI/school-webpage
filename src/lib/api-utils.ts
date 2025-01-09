// Utility functions for API calls
import { mockNotices, mockResults, mockTeachers } from './mock-data';

export async function fetchNotices() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNotices;
}

export async function fetchNoticeById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNotices.find(notice => notice._id === id);
}

export async function fetchResults(studentId: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockResults;
}

export async function fetchTeachers() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTeachers;
}