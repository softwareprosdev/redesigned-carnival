import { pgTable, text, timestamp, uuid, pgEnum, integer, decimal } from 'drizzle-orm/pg-core';

export const roles = pgEnum('roles', ['admin', 'dentist', 'staff', 'patient']);
// Enums removed to avoid migration casting issues; handled in app logic
// export const appointmentStatus = pgEnum('appointment_status', ['scheduled', 'completed', 'canceled', 'no_show']);
// export const treatmentStatus = pgEnum('treatment_status', ['planned', 'in_progress', 'completed']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Matches Supabase Auth ID
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  role: roles('role').notNull().default('patient'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const clinics = pgTable('clinics', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    address: text('address').notNull(),
    phone: text('phone').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const patients = pgTable('patients', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }), // Optional: if patient manages their own account
    clinicId: uuid('clinic_id').references(() => clinics.id),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    dob: timestamp('dob'),
    gender: text('gender'),
    address: text('address'),
    phone: text('phone'),
    email: text('email'),
    medicalHistory: text('medical_history'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom(),
    patientId: uuid('patient_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
    clinicId: uuid('clinic_id').references(() => clinics.id),
    dentistId: uuid('dentist_id').references(() => users.id),
    appointmentDate: timestamp('appointment_date').notNull(),
    reason: text('reason'),
    status: text('status').notNull().default('scheduled'), // scheduled, completed, canceled, no_show
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const treatments = pgTable('treatments', {
    id: uuid('id').primaryKey().defaultRandom(),
    appointmentId: uuid('appointment_id').notNull().references(() => appointments.id, { onDelete: 'cascade' }),
    name: text('name').notNull(), // e.g., "Root Canal", "Cleaning"
    description: text('description'),
    cost: decimal('cost', { precision: 10, scale: 2 }).notNull().default('0'),
    status: text('status').notNull().default('planned'), // planned, in_progress, completed
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});