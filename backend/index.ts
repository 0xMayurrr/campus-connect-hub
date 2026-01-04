// Backend Services Export
export { TicketService } from './tickets';
export { LectureService } from './lectures';
export { SyllabusService } from './syllabus';
export { AuthService } from './auth';
export { NoticeService } from './notices';
export { AIService } from './ai';
export { LocationService } from './locations';
export { QRService } from './qr';

// Core Services
export { FirestoreService } from './firestore.service';
export { StorageService } from './storage.service';
export { RoutingService } from './routing.service';

// Firebase Configuration
export { auth, db, storage } from './firebase';
export { default as firebaseApp } from './firebase';