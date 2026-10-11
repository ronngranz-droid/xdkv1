'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClassHubState,
  ClassInfo,
  Student,
  OrgNode,
  OrgPositionKey,
  ScheduleItem,
  DayOfWeek,
  PicketDayData,
  PicketTask,
  Announcement,
  PolaroidMemory,
  MenfessMessage,
  ClassPoll,
  ClassAssignment,
} from '@/types';
import { initialClassHubState } from '@/lib/data/initialData';

interface ClassDataContextType {
  state: ClassHubState;
  isLoaded: boolean;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  // Class Info
  updateClassInfo: (info: Partial<ClassInfo>) => void;
  // Students
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  // Organization
  updateOrgNode: (positionKey: OrgPositionKey, data: Partial<OrgNode>) => void;
  // Schedule
  addSchedule: (schedule: Omit<ScheduleItem, 'id'>) => void;
  updateSchedule: (id: string, data: Partial<ScheduleItem>) => void;
  deleteSchedule: (id: string) => void;
  // Picket
  togglePicketTask: (day: DayOfWeek, taskId: string) => void;
  resetPicketTasks: (day?: DayOfWeek) => void;
  updatePicketDay: (day: DayOfWeek, data: Partial<PicketDayData>) => void;
  addPicketTask: (title: string, description?: string) => void;
  deletePicketTask: (id: string) => void;
  // Announcements
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  // Assignments / PR Kelas
  addAssignment: (assignment: Omit<ClassAssignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (id: string, data: Partial<ClassAssignment>) => void;
  deleteAssignment: (id: string) => void;
  toggleAssignmentCompleted: (id: string) => void;
  // Fun Classroom Features
  likeMemory: (id: string) => void;
  addMemory: (memory: Omit<PolaroidMemory, 'id' | 'likes'>) => void;
  likeMenfess: (id: string) => void;
  addMenfess: (message: Omit<MenfessMessage, 'id' | 'likes' | 'date'>) => void;
  votePoll: (pollId: string, optionId: string) => void;
  // Backup & Restore
  resetToDefaultData: () => void;
  exportDataToJson: () => string;
  importDataFromJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'classhub_data_v10';
const ADMIN_AUTH_KEY = 'classhub_admin_session';
const ADMIN_DEFAULT_PASSWORD = 'admin';

const ClassDataContext = createContext<ClassDataContextType | undefined>(undefined);

export function ClassDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ClassHubState>(initialClassHubState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed && parsed.classInfo && parsed.students) {
          // Merge with initial state for new features if missing
          setState({
            ...initialClassHubState,
            ...parsed,
            orgHierarchy: parsed.orgHierarchy || initialClassHubState.orgHierarchy,
            assignments: parsed.assignments && parsed.assignments.length > 0 ? parsed.assignments : initialClassHubState.assignments,
            memories: parsed.memories && parsed.memories.length > 0 ? parsed.memories : initialClassHubState.memories,
            menfess: parsed.menfess && parsed.menfess.length > 0 ? parsed.menfess : initialClassHubState.menfess,
            polls: parsed.polls && parsed.polls.length > 0 ? parsed.polls : initialClassHubState.polls,
            playlist: parsed.playlist && parsed.playlist.length > 0 ? parsed.playlist : initialClassHubState.playlist,
          });
        }
      }
      const auth = localStorage.getItem(ADMIN_AUTH_KEY);
      if (auth === 'authenticated') {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error('Failed to load ClassHub data from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes (after load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to persist ClassHub data to localStorage', e);
      }
    }
  }, [state, isLoaded]);

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_DEFAULT_PASSWORD || password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const updateClassInfo = (info: Partial<ClassInfo>) => {
    setState((prev) => ({
      ...prev,
      classInfo: {
        ...prev.classInfo,
        ...info,
        homeroomTeacher: {
          ...prev.classInfo.homeroomTeacher,
          ...(info.homeroomTeacher || {}),
        },
      },
    }));
  };

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      students: [...prev.students, newStudent],
    }));
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setState((prev) => ({
      ...prev,
      students: prev.students.map((std) => (std.id === id ? { ...std, ...data } : std)),
    }));
  };

  const deleteStudent = (id: string) => {
    setState((prev) => ({
      ...prev,
      students: prev.students.filter((std) => std.id !== id),
      orgHierarchy: prev.orgHierarchy.map((org) =>
        org.assignedStudentId === id ? { ...org, assignedStudentId: undefined } : org
      ),
    }));
  };

  const updateOrgNode = (positionKey: OrgPositionKey, data: Partial<OrgNode>) => {
    setState((prev) => ({
      ...prev,
      orgHierarchy: prev.orgHierarchy.map((node) =>
        node.positionKey === positionKey ? { ...node, ...data } : node
      ),
    }));
  };

  const addSchedule = (schedData: Omit<ScheduleItem, 'id'>) => {
    const newSchedule: ScheduleItem = {
      ...schedData,
      id: `sch-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      schedules: [...prev.schedules, newSchedule],
    }));
  };

  const updateSchedule = (id: string, data: Partial<ScheduleItem>) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.map((sch) => (sch.id === id ? { ...sch, ...data } : sch)),
    }));
  };

  const deleteSchedule = (id: string) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((sch) => sch.id !== id),
    }));
  };

  const togglePicketTask = (day: DayOfWeek, taskId: string) => {
    const key = `${day}_${taskId}`;
    setState((prev) => ({
      ...prev,
      picketCompleted: {
        ...prev.picketCompleted,
        [key]: !prev.picketCompleted[key],
      },
    }));
  };

  const resetPicketTasks = (day?: DayOfWeek) => {
    setState((prev) => {
      const nextCompleted = { ...prev.picketCompleted };
      if (day) {
        Object.keys(nextCompleted).forEach((key) => {
          if (key.startsWith(`${day}_`)) {
            nextCompleted[key] = false;
          }
        });
      } else {
        Object.keys(nextCompleted).forEach((key) => {
          nextCompleted[key] = false;
        });
      }
      return {
        ...prev,
        picketCompleted: nextCompleted,
      };
    });
  };

  const updatePicketDay = (day: DayOfWeek, data: Partial<PicketDayData>) => {
    setState((prev) => ({
      ...prev,
      picketDays: prev.picketDays.map((p) => (p.day === day ? { ...p, ...data } : p)),
    }));
  };

  const addPicketTask = (title: string, description?: string) => {
    const newTask: PicketTask = {
      id: `task-${Date.now()}`,
      title,
      description,
    };
    setState((prev) => ({
      ...prev,
      picketTasks: [...prev.picketTasks, newTask],
    }));
  };

  const deletePicketTask = (id: string) => {
    setState((prev) => ({
      ...prev,
      picketTasks: prev.picketTasks.filter((t) => t.id !== id),
    }));
  };

  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'date'>) => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const newAnnouncement: Announcement = {
      ...annData,
      id: `ann-${Date.now()}`,
      date: dateStr,
    };
    setState((prev) => ({
      ...prev,
      announcements: [newAnnouncement, ...prev.announcements],
    }));
  };

  const updateAnnouncement = (id: string, data: Partial<Announcement>) => {
    setState((prev) => ({
      ...prev,
      announcements: prev.announcements.map((ann) => (ann.id === id ? { ...ann, ...data } : ann)),
    }));
  };

  const deleteAnnouncement = (id: string) => {
    setState((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((ann) => ann.id !== id),
    }));
  };

  // Assignments Handlers
  const addAssignment = (assignment: Omit<ClassAssignment, 'id' | 'createdAt'>) => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const newAssignment: ClassAssignment = {
      ...assignment,
      id: `asg-${Date.now()}`,
      createdAt: dateStr,
      isCompleted: false,
    };
    setState((prev) => ({
      ...prev,
      assignments: [newAssignment, ...(prev.assignments || [])],
    }));
  };

  const updateAssignment = (id: string, data: Partial<ClassAssignment>) => {
    setState((prev) => ({
      ...prev,
      assignments: (prev.assignments || []).map((a) => (a.id === id ? { ...a, ...data } : a)),
    }));
  };

  const deleteAssignment = (id: string) => {
    setState((prev) => ({
      ...prev,
      assignments: (prev.assignments || []).filter((a) => a.id !== id),
    }));
  };

  const toggleAssignmentCompleted = (id: string) => {
    setState((prev) => ({
      ...prev,
      assignments: (prev.assignments || []).map((a) =>
        a.id === id ? { ...a, isCompleted: !a.isCompleted } : a
      ),
    }));
  };

  // Fun Features Handlers
  const likeMemory = (id: string) => {
    setState((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m)),
    }));
  };

  const addMemory = (memory: Omit<PolaroidMemory, 'id' | 'likes'>) => {
    const newMem: PolaroidMemory = {
      ...memory,
      id: `mem-${Date.now()}`,
      likes: 1,
    };
    setState((prev) => ({
      ...prev,
      memories: [newMem, ...prev.memories],
    }));
  };

  const likeMenfess = (id: string) => {
    setState((prev) => ({
      ...prev,
      menfess: prev.menfess.map((mf) => (mf.id === id ? { ...mf, likes: mf.likes + 1 } : mf)),
    }));
  };

  const addMenfess = (message: Omit<MenfessMessage, 'id' | 'likes' | 'date'>) => {
    const newMsg: MenfessMessage = {
      ...message,
      id: `mf-${Date.now()}`,
      likes: 0,
      date: 'Baru saja',
    };
    setState((prev) => ({
      ...prev,
      menfess: [newMsg, ...prev.menfess],
    }));
  };

  const votePoll = (pollId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      polls: prev.polls.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          options: poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      }),
    }));
  };

  const resetToDefaultData = () => {
    setState(initialClassHubState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportDataToJson = (): string => {
    return JSON.stringify(state, null, 2);
  };

  const importDataFromJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.classInfo && Array.isArray(parsed.students)) {
        setState(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <ClassDataContext.Provider
      value={{
        state,
        isLoaded,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        updateClassInfo,
        addStudent,
        updateStudent,
        deleteStudent,
        updateOrgNode,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        togglePicketTask,
        resetPicketTasks,
        updatePicketDay,
        addPicketTask,
        deletePicketTask,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        toggleAssignmentCompleted,
        likeMemory,
        addMemory,
        likeMenfess,
        addMenfess,
        votePoll,
        resetToDefaultData,
        exportDataToJson,
        importDataFromJson,
      }}
    >
      {children}
    </ClassDataContext.Provider>
  );
}

export function useClassData() {
  const context = useContext(ClassDataContext);
  if (!context) {
    throw new Error('useClassData must be used within a ClassDataProvider');
  }
  return context;
}
