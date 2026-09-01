export interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  room?: string;
  alternateLink?: string;
  courseState?: string;
}

export interface ClassroomMaterial {
  driveFile?: {
    driveFile: {
      id: string;
      title: string;
      alternateLink: string;
      thumbnailUrl?: string;
    };
    shareMode?: string;
  };
  youtubeVideo?: {
    id: string;
    title: string;
    alternateLink: string;
    thumbnailUrl?: string;
  };
  link?: {
    url: string;
    title?: string;
    thumbnailUrl?: string;
  };
  form?: {
    formUrl: string;
    title?: string;
    thumbnailUrl?: string;
  };
}

export interface ClassroomCourseWork {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  materials?: ClassroomMaterial[];
  state: 'PUBLISHED' | 'DRAFT' | 'DELETED';
  alternateLink?: string;
  creationTime: string;
  updateTime?: string;
  dueDate?: {
    year: number;
    month: number;
    day: number;
  };
  dueTime?: {
    hours?: number;
    minutes?: number;
    nanos?: number;
  };
  maxPoints?: number;
  workType?: 'ASSIGNMENT' | 'SHORT_ANSWER_QUESTION' | 'MULTIPLE_CHOICE_QUESTION';
  submissionState?: 'NEW' | 'CREATED' | 'TURNED_IN' | 'RETURNED' | 'RECLAIMED_BY_STUDENT';
}

export interface AISourceLink {
  title: string;
  url: string;
  domain: string;
  description: string;
  type: 'doc' | 'article' | 'tool' | 'tutorial' | 'academic';
}

export interface AIYouTubeRecommendation {
  title: string;
  channel: string;
  searchQuery: string;
  searchUrl: string;
  reason: string;
  keyTakeaways: string[];
}

export interface AIAnalysisResult {
  summary: string;
  estimatedMinutes: number;
  difficulty: 'Mudah' | 'Sedang' | 'Menantang';
  keyConcepts: string[];
  checklist: { id: string; text: string; done: boolean }[];
  sources: AISourceLink[];
  youtubeVideos: AIYouTubeRecommendation[];
  studyTips: string[];
  recommendedStrategy: string;
  generatedAt: string;
}

export interface TodoTask {
  id: string;
  courseWorkId?: string;
  courseId?: string;
  courseName: string;
  title: string;
  description?: string;
  dueDateStr?: string; // ISO string or formatted
  dueTimestamp?: number | null;
  points?: number;
  isCompleted: boolean;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
  syncSource: 'classroom' | 'manual';
  classroomLink?: string;
  materials?: ClassroomMaterial[];
  aiAnalysis?: AIAnalysisResult;
  aiLoading?: boolean;
  aiError?: string;
  customNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  taskId?: string;
  taskTitle?: string;
  isError?: boolean;
}

export interface UserPreferences {
  learningStyle: string; // e.g., 'Visual', 'Membaca/Menulis', 'Praktik'
  explanationDetail: string; // e.g., 'Singkat', 'Detail', 'Bertahap'
  aiTone: string; // e.g., 'Santai', 'Tegas', 'Socratic'
}

export interface AIConfig {
  provider: 'gemini' | 'openai' | 'local';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export interface SyncStats {
  lastSyncTime: string | null;
  totalCourses: number;
  totalSyncedTasks: number;
  newTasksFound: number;
  isSyncing: boolean;
}
