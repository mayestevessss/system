# Database Seeding Guide

## 🌱 Quick Start

To seed your database with all necessary data, simply run:

```bash
php artisan db:seed
```

or

```bash
php artisan migrate:fresh --seed
```

The second command will drop all tables, recreate them, and seed them with data.

## 📋 What Gets Seeded

### 1. **Admin Users** 👤
- **Username**: `admin123` | **Password**: `admin123`
- **Email**: `john@gmail.com` | **Password**: `12345`

### 2. **Departments** 📁 (10 departments)
- Computer Science Department
- Mathematics Department
- Engineering
- Business Administration
- Arts and Sciences
- Education
- Information Technology
- College of Education
- College of Engineering
- Engineering Department

### 3. **Courses** 📚 (8 courses)
- BS Computer Science (BSCS)
- BS Mathematics (BSMATH)
- BSE - Bachelor of Secondary Education
- BSBA - Bachelor of Science in Business Administration
- BAS - Bachelor of Arts and Sciences
- BSEd - Bachelor of Science in Education
- BSIT - Bachelor of Science in Information Technology
- Computer Science (CS)

### 4. **Academic Years** 📅
- 2025-2026
- 2024-2025

### 5. **Sample Data**
- Sample Students (via StudentSeeder)
- Sample Faculty Members (via FacultySeeder)

## 🔄 Re-seeding

If you want to reset and re-seed your database:

```bash
# Drop all tables and re-run migrations + seeds
php artisan migrate:fresh --seed

# Or just re-run seeds (keeps existing data, updates duplicates)
php artisan db:seed
```

## 🎯 Running Individual Seeders

If you only want to seed specific data:

```bash
# Seed only users
php artisan db:seed --class=UserSeeder

# Seed only departments and courses
php artisan db:seed --class=SystemSettingsSeeder

# Seed only students
php artisan db:seed --class=StudentSeeder

# Seed only faculty
php artisan db:seed --class=FacultySeeder
```

## 📝 Notes

- All seeders use `updateOrCreate()` which means running them multiple times won't create duplicates
- The seeders are safe to run on an existing database
- Admin credentials will be displayed in the console after seeding

