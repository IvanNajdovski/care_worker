-- wrangler d1 execute care_db --file sql/populateInitialValues.sql --remote
INSERT INTO roles (
        name,
        description
    )
VALUES (
        'admin',
        'Administrator with full access'
    ),
    (
        'service_provider',
        'A user who offers and manages services, interacting directly with clients to fulfill their needs'
    ),(
        'service_client',
        'A user who seeks, requests, and utilizes services provided by service providers'
    );

INSERT INTO services (
        id,
        name,
        display_name,
        description,
        provider_description,
        client_description,
        enabled
    )
VALUES (
        'child_care',
        'child_care',
        "Child Care",
        "Child care services to support families in providing safe, nurturing, and engaging environments for children of all ages.",
        "Are you passionate about caring for children? Join our community to offer your trusted child care services and connect with families who need your help.",
        "Looking for reliable and loving child care? Browse qualified caregivers ready to support your family’s needs with flexible and attentive care.",
        1
    ),
    (
        'senior_care',
        'senior_care',
        "Senior Care",
        "Senior care services focused on compassionate assistance, companionship, and support for daily living to enhance quality of life.",
        "If you specialize in senior care, join our platform to offer your compassionate services and make a positive impact in seniors’ lives.",
        "Find experienced senior caregivers who provide personalized support, helping your loved ones maintain independence and comfort.",
        1
    ),
    (
        'adult_care',
        'adult_care',
        "Adult Care",
        "Adult care services designed to assist individuals with daily tasks, personal care, and companionship in a respectful and supportive way.",
        "Offer your skills in adult care to help those needing assistance with daily living and companionship, providing dignity and comfort.",
        "Need help with personal or daily care? Find dependable adult caregivers ready to support your specific needs.",
        1
    ),
    (
        'housekeeping',
        'housekeeping',
        "Housekeeping",
        "Housekeeping services to keep homes clean, organized, and comfortable through regular or one-time cleaning appointments.",
        "Are you a cleaning professional? List your housekeeping services to connect with clients who value a spotless and well-maintained home.",
        "Looking for trusted housekeeping help? Find experienced cleaners who can keep your home tidy and welcoming on your schedule.",
        1
    ),
    (
        'pet_care',
        'pet_care',
        "Pet Care",
        "Pet care services offering walking, sitting, grooming, and more to ensure pets are happy and healthy.",
        "Pet care services offering walking, sitting, grooming, and more to ensure pets are happy and healthy.",
        "Need someone to care for your pets? Discover pet sitters and walkers who will treat your furry friends with kindness and attention.",
        1
    ),
    (
        'tutoring',
        'tutoring',
        "Tutoring",
        "Tutoring services designed to support learners with personalized academic assistance across various subjects and grade levels.",
        "Are you a tutor? Showcase your expertise and connect with students looking for guidance and academic support.",
        "Want to improve your skills or grades? Find experienced tutors offering personalized help tailored to your learning goals.",
        1
    );

INSERT INTO services_subcategories (
    id,
    service_id,
    name,
    display_name,
    description,
    enabled
    )
VALUES('cc1', 'child_care', 'babysitting', 'Babysitting', 'Occasional or regular babysitting services for children of all ages.', 1),
('cc2', 'child_care', 'full_time_nanny', 'Full-Time Nanny', 'Dedicated full-time care for children, often including daily routines and activities.', 1),
('cc3', 'child_care', 'part_time_nanny', 'Part-Time Nanny', 'Part-time child care support for specific hours or days.', 1),
('cc4', 'child_care', 'after_school_care', 'After-School Care', 'Supervision and activities for children after school hours.', 1),
('cc5', 'child_care', 'newborn_infant_care', 'Newborn & Infant Care', 'Specialized care for newborns and infants, including feeding and soothing.', 1),
('cc6', 'child_care', 'special_needs_child_care', 'Special Needs Child Care', 'Tailored care for children with special needs or disabilities.', 1),
('cc7', 'child_care', 'overnight_care', 'Overnight Care', 'Child care provided during nighttime hours.', 1),
('cc8', 'child_care', 'event_care', 'Event/Occasional Care', 'Child care for special events or one-time occasions.', 1),
('cc9', 'child_care', 'homework_help', 'Homework Help', 'Assistance with homework and school assignments for children.', 1),

-- SENIOR CARE
('sc1', 'senior_care', 'companionship', 'Companionship', 'Friendly companionship and conversation for seniors.', 1),
('sc2', 'senior_care', 'personal_care', 'Personal Care', 'Help with bathing, dressing, grooming, and hygiene.', 1),
('sc3', 'senior_care', 'medication_reminders', 'Medication Reminders', 'Reminders and assistance with taking prescribed medication.', 1),
('sc4', 'senior_care', 'meal_preparation', 'Meal Preparation', 'Cooking and preparing nutritious meals for seniors.', 1),
('sc5', 'senior_care', 'mobility_assistance', 'Mobility Assistance', 'Help with moving around, walking, and preventing falls.', 1),
('sc6', 'senior_care', 'transportation', 'Transportation to Appointments', 'Safe transportation to and from medical or personal appointments.', 1),
('sc7', 'senior_care', 'dementia_care', 'Dementia & Alzheimer’s Care', 'Specialized support for individuals with dementia or Alzheimer’s.', 1),
('sc8', 'senior_care', 'respite_care', 'Respite Care', 'Temporary relief for primary caregivers of seniors.', 1),
('sc9', 'senior_care', 'live_in_care', 'Live-In Care', '24/7 care provided by a live-in caregiver.', 1),

-- ADULT CARE
('ac1', 'adult_care', 'daily_living_assistance', 'Daily Living Assistance', 'Help with everyday tasks such as dressing, grooming, and hygiene.', 1),
('ac2', 'adult_care', 'post_surgery_care', 'Post-Surgery Care', 'Support during recovery after medical procedures.', 1),
('ac3', 'adult_care', 'personal_hygiene', 'Personal Hygiene Assistance', 'Help with bathing, grooming, and other personal hygiene needs.', 1),
('ac4', 'adult_care', 'meal_preparation', 'Meal Preparation', 'Cooking and preparing meals according to dietary needs.', 1),
('ac5', 'adult_care', 'mobility_help', 'Mobility Help', 'Assistance with moving around and staying active.', 1),
('ac6', 'adult_care', 'companionship', 'Companionship', 'Providing company and conversation to reduce loneliness.', 1),
('ac7', 'adult_care', 'errand_running', 'Errand Running', 'Helping with shopping, mail, and other errands.', 1),
('ac8', 'adult_care', 'transportation', 'Transportation Services', 'Safe and reliable transport to appointments or events.', 1),
('ac9', 'adult_care', 'live_in_support', 'Live-In Support', 'Full-time support for adults in need of continuous care.', 1),

-- HOUSEKEEPING
('hk1', 'housekeeping', 'regular_cleaning', 'Regular Home Cleaning', 'Routine cleaning to keep homes neat and tidy.', 1),
('hk2', 'housekeeping', 'deep_cleaning', 'Deep Cleaning', 'Thorough cleaning of all areas, including hard-to-reach spots.', 1),
('hk3', 'housekeeping', 'kitchen_bathroom_cleaning', 'Kitchen & Bathroom Cleaning', 'Detailed cleaning of kitchens and bathrooms.', 1),
('hk4', 'housekeeping', 'laundry_ironing', 'Laundry & Ironing', 'Washing, drying, folding, and ironing clothes.', 1),
('hk5', 'housekeeping', 'window_cleaning', 'Window Cleaning', 'Cleaning of interior and exterior windows.', 1),
('hk6', 'housekeeping', 'decluttering', 'Decluttering & Organization', 'Tidying and organizing home spaces.', 1),
('hk7', 'housekeeping', 'move_in_out_cleaning', 'Move-In/Move-Out Cleaning', 'Cleaning services for relocation purposes.', 1),
('hk8', 'housekeeping', 'seasonal_cleaning', 'Seasonal Cleaning', 'Spring, fall, or holiday deep cleaning.', 1),
('hk9', 'housekeeping', 'carpet_cleaning', 'Carpet & Upholstery Cleaning', 'Professional cleaning for carpets and furniture.', 1),

-- PET CARE
('pc1', 'pet_care', 'dog_walking', 'Dog Walking', 'Regular or occasional walks for dogs.', 1),
('pc2', 'pet_care', 'pet_sitting', 'Pet Sitting', 'Care for pets in the owner’s or sitter’s home.', 1),
('pc3', 'pet_care', 'feeding', 'Feeding & Fresh Water', 'Ensuring pets are fed and hydrated.', 1),
('pc4', 'pet_care', 'grooming', 'Grooming & Bathing', 'Bathing, brushing, and basic grooming.', 1),
('pc5', 'pet_care', 'pet_transportation', 'Pet Transportation', 'Transporting pets safely to appointments or activities.', 1),
('pc6', 'pet_care', 'medication_admin', 'Administering Medication', 'Giving pets their required medications.', 1),
('pc7', 'pet_care', 'overnight_care', 'Overnight Care', 'Looking after pets overnight.', 1),
('pc8', 'pet_care', 'training', 'Training Sessions', 'Basic obedience or advanced training for pets.', 1),
('pc9', 'pet_care', 'small_animal_care', 'Small Animal & Exotic Pet Care', 'Specialized care for small or exotic pets.', 1),

-- TUTORING
('tu1', 'tutoring', 'math', 'Math Tutoring', 'Help with mathematics at various levels.', 1),
('tu2', 'tutoring', 'science', 'Science Tutoring', 'Tutoring in biology, chemistry, physics, and related fields.', 1),
('tu3', 'tutoring', 'languages', 'Language Learning', 'Learning and practicing new languages.', 1),
('tu4', 'tutoring', 'reading_writing', 'Reading & Writing Help', 'Improving literacy and writing skills.', 1),
('tu5', 'tutoring', 'exam_prep', 'Exam Preparation', 'Preparation for standardized tests and school exams.', 1),
('tu6', 'tutoring', 'music_lessons', 'Music Lessons', 'Learning to play instruments or sing.', 1),
('tu7', 'tutoring', 'art_lessons', 'Art & Creative Skills', 'Developing artistic and creative abilities.', 1),
('tu8', 'tutoring', 'computer_skills', 'Computer Skills & Coding', 'Learning computer literacy and programming.', 1),
('tu9', 'tutoring', 'special_needs_tutoring', 'Special Needs Tutoring', 'Academic support for students with special needs.', 1);
