-- 1. Insert a Test User (Requires direct DB access or Supabase Admin Panel)
-- Since you cannot easily insert into auth.users via raw SQL without hashing,
-- Use the Supabase Dashboard -> Authentication -> Add User:
-- Email: test@clinical.com
-- Password: password123

-- Email: test@patient.com
-- Password: password123

-- 2. Retrieve the UUIDs for these new users from the Supabase Dashboard.

-- 3. Run the following SQL in Supabase SQL Editor to link them:

-- Replace 'UUID_FROM_DASHBOARD_CLINICAL' with the actual UUID
INSERT INTO public.users (id, full_name, email, role, created_at, updated_at)
VALUES 
('UUID_FROM_DASHBOARD_CLINICAL', 'Dr. Test Smith', 'test@clinical.com', 'dentist', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Replace 'UUID_FROM_DASHBOARD_PATIENT' with the actual UUID
INSERT INTO public.users (id, full_name, email, role, created_at, updated_at)
VALUES 
('UUID_FROM_DASHBOARD_PATIENT', 'John Doe', 'test@patient.com', 'patient', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. Create a Clinic
INSERT INTO public.clinics (id, name, address, phone)
VALUES 
(gen_random_uuid(), 'Dental Prodigy Main Clinic', '123 Smile St', '555-0123');

-- 5. Create a Patient Record (linked to the patient user)
-- You need the Clinic ID generated above. Let's assume we just use a subquery or variable if running in a script, 
-- but for manual SQL:

WITH new_clinic AS (
  SELECT id FROM public.clinics LIMIT 1
)
INSERT INTO public.patients (id, user_id, clinic_id, first_name, last_name, dob, gender, phone, email, created_at, updated_at)
SELECT 
  gen_random_uuid(), 
  'UUID_FROM_DASHBOARD_PATIENT', 
  id, 
  'John', 
  'Doe', 
  '1990-01-01', 
  'Male', 
  '555-9999', 
  'test@patient.com', 
  NOW(), 
  NOW()
FROM new_clinic;

-- 6. Create some Appointments
WITH pat AS (SELECT id FROM public.patients WHERE email = 'test@patient.com' LIMIT 1),
     clin AS (SELECT id FROM public.clinics LIMIT 1),
     dent AS (SELECT id FROM public.users WHERE email = 'test@clinical.com' LIMIT 1)
INSERT INTO public.appointments (id, patient_id, clinic_id, dentist_id, appointment_date, reason, status, created_at, updated_at)
SELECT 
  gen_random_uuid(), 
  pat.id, 
  clin.id, 
  dent.id, 
  NOW() + INTERVAL '1 day', 
  'Routine Checkup', 
  'scheduled', 
  NOW(), 
  NOW()
FROM pat, clin, dent;
