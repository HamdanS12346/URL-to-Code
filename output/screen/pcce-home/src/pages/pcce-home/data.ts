// Content, assets and destinations for pcce-home. Every value is copied from
// outputs/pcce-home (content.md, capture/dom.json, capture/controls.json, spec/UI_SPEC.md).
// Asset paths are the capture's own paths, served from public/assets/.

export const A = (p: string) => `/${p}`

const SITE = 'https://pccegoa.edu.in'

/* §2.2 main menu. Items with `chevron` carry the elementskit down arrow; their
   sub-menu panels are a known gap (open question 1). */
export const MENU = [
  { key: 'link-home-2', label: 'HOME', href: `${SITE}/`, chevron: false, active: true },
  { key: 'link-about-us-2', label: 'ABOUT US', href: `${SITE}/#`, chevron: true },
  { key: 'link-admin-2', label: 'ADMIN', href: `${SITE}/#`, chevron: true },
  { key: 'link-academic-2', label: 'ACADEMIC', href: `${SITE}/#`, chevron: true },
  { key: 'link-research-2', label: 'RESEARCH', href: `${SITE}/#`, chevron: true },
  { key: 'link-placement-3', label: 'PLACEMENT', href: `${SITE}/#`, chevron: true },
  { key: 'link-events-17', label: 'EVENTS', href: `${SITE}/#`, chevron: true },
  { key: 'link-achievements-2', label: 'ACHIEVEMENTS', href: `${SITE}/#`, chevron: true },
  { key: 'link-alumni-3', label: 'ALUMNI', href: `${SITE}/#`, chevron: true },
  { key: 'link-library-3', label: 'LIBRARY', href: `${SITE}/#`, chevron: true },
  { key: 'link-contact-us-4', label: 'CONTACT US', href: `${SITE}/contact-us/`, chevron: false },
]

/* §2.1 header social glyphs. WhatsApp has no href in the capture (known gap). */
export const SOCIAL = [
  { key: 'link-2', icon: '', label: 'Instagram', href: 'https://www.instagram.com/pccegoaofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { key: 'link-3', icon: '', label: 'Facebook', href: 'https://www.facebook.com/pccegoaofficialpage' },
  { key: 'link-4', icon: '', label: 'YouTube', href: 'https://www.youtube.com/@PCCE-PadreConceicao' },
  { key: null, icon: '', label: 'WhatsApp', href: null },
]

export const ABOUT_TEXT =
  'Padre Conceição College of Engineering(PCCE) is an engineering college in Verna, Goa, India, established in 1997. ' +
  'The college is affiliated to Goa University, Taleigao, Goa, and the programmes are approved by All India Council ' +
  'for Technical Education (AICTE), New Delhi. The college is a part of Agnel Technical Education Complex, Verna, Goa. ' +
  'PCCE has Bachelor disciplines: Mechanical Engineering, Computer Engineering, Electronics and Computer Engineering, ' +
  'Information Technology, Computer Science and Engineering(AI & ML)and Masters in Artificial Intelligence and Data Science'

export const ABOUT_TILES = [
  {
    key: 'link-6',
    readMoreKey: 'link-read-more',
    img: 'assets/wp-content/uploads/2026/03/INST.png',
    label: 'Institute Vision, Mission and Quality Policy',
    href: `${SITE}/home/home_vision_mission_qp/`,
  },
  {
    key: 'link-7',
    readMoreKey: 'link-read-more-2',
    img: 'assets/wp-content/uploads/2026/03/AICTE.png',
    label: 'AICTE Approval Letters',
    href: `${SITE}/wp-content/uploads/2025/05/LOA-Till-2025-2.pdf`,
  },
]

/* About Us carousel, DOM slide order (group-1-3 is the active slide). */
export const ABOUT_SLIDES = [
  'assets/wp-content/uploads/2026/02/Corridor.png',
  'assets/wp-content/uploads/2026/02/5.png',
  'assets/wp-content/uploads/2026/02/4.png',
]

export const TICKER = [
  { key: 'link-payment-of-odd-semester-fees-202', text: 'Payment of Odd Semester Fees 2026-27', href: `${SITE}/wp-content/uploads/2026/09/Payment-of-Odd-Semester-Fees-2026-27.pdf` },
  { key: 'link-cr-students-council-lr-elections', text: 'CR, Students Council & LR Elections', href: `${SITE}/wp-content/uploads/2026/10/PCCEVernaElections-CR-StudentsCouncil-and-LR-2026-2027.pdf` },
  { key: 'link-ufr-elections', text: 'UFR Elections', href: `${SITE}/wp-content/uploads/2026/10/PCCEVernaElectionsUFR-2026-2027.pdf` },
  { key: 'link-valid-nominations-for-ucr', text: 'Valid Nominations for UCR', href: `${SITE}/wp-content/uploads/2026/10/ValidNominationsUCR.pdf` },
  { key: 'link-ucr-elections', text: 'UCR Elections', href: `${SITE}/wp-content/uploads/2026/09/PCCEVerna-UCRElectionNoticetoStudents2026-2027.pdf` },
]

export const COURSES = [
  {
    key: 'button-3', titleKey: 'link-bachelor-in-mechanical-engineeri', learnKey: 'link-learn-more',
    img: 'assets/wp-content/uploads/2026/02/8-300x169.png',
    badge: 'Bachelors Degree', master: false,
    title: 'Bachelor in Mechanical Engineering',
    text: 'Designs, analyzes, and manufactures mechanical systems that power industries. Blends physics, materials, and innovation to build efficient real-world solutions.',
    href: `${SITE}/home/me-mechanical-department/`,
  },
  {
    key: 'button-5', titleKey: 'link-bachelor-in-computer-engineering', learnKey: 'link-learn-more-3',
    img: 'assets/wp-content/uploads/2026/02/COMP-1-300x169.png',
    badge: 'Bachelors Degree', master: false,
    title: 'Bachelor in Computer Engineering',
    text: 'Integrates hardware and software to create intelligent computing systems. Focuses on processors, embedded systems, and high-performance computing.',
    href: `${SITE}/home/computer_main/`,
  },
  {
    key: 'button-7', titleKey: 'link-bachelor-in-electronics-and-comp', learnKey: 'link-learn-more-5',
    img: 'assets/wp-content/uploads/2026/02/10-300x169.png',
    badge: 'Bachelors Degree', master: false,
    title: 'Bachelor in Electronics and Computer Engineering',
    text: 'Combines electronics with computing to develop smart digital systems. Emphasizes communication, embedded technologies, and modern computing solutions.',
    href: `${SITE}/home/electronics-and-computer-department/`,
  },
  {
    key: 'button-9', titleKey: 'link-bachelor-in-computer-science-and', learnKey: 'link-learn-more-7',
    img: 'assets/wp-content/uploads/2026/02/11-300x169.png',
    badge: 'Bachelors Degree', master: false,
    title: 'Bachelor in Computer Science and Engineering (AI & ML)',
    text: 'Develops intelligent software using artificial intelligence and machine learning. Focuses on data-driven models, automation, and next-generation computing.',
    href: `${SITE}/home/computer-science-and-engineeringai-ml/`,
  },
  {
    key: 'button-11', titleKey: 'link-masters-in-artificial-intelligen', learnKey: 'link-learn-more-9',
    img: 'assets/wp-content/uploads/2026/02/Untitled-design-3-300x169.png',
    badge: 'Masters Degree', master: true,
    title: 'Masters in Artificial Intelligence and Data Science',
    text: 'Develops intelligent software using artificial intelligence and machine learning. Focuses on data-driven models, automation, and next-generation computing.',
    href: `${SITE}/me-artificial-intelligence-and-data-science/`,
  },
]

/* PCCE Newsline carousel, DOM slide order (group-1-9 is the active slide). */
export const NEWS_SLIDES = [
  'assets/wp-content/uploads/2026/10/IDEAS-WEBSITE-SIZE-1024x394.png',
  'assets/wp-content/uploads/2026/04/web-verse-26-WEBSITE-SIZE-4-1024x394.png',
  'assets/wp-content/uploads/2026/04/web-verse-26-WEBSITE-SIZE-2-1024x394.png',
  'assets/wp-content/uploads/2026/02/7-1024x394.png',
  'assets/wp-content/uploads/2026/02/6-1-1024x394.png',
  'assets/wp-content/uploads/2026/02/2-1024x394.png',
  'assets/wp-content/uploads/2026/02/3-1024x394.png',
  'assets/wp-content/uploads/2026/02/4-1-1024x394.png',
  'assets/wp-content/uploads/2026/02/5-1-1024x394.png',
]

export const QUICK_LINKS = [
  { key: 'button-13', img: 'assets/wp-content/uploads/2026/03/1-300x86.png', label: 'Admissions', href: `${SITE}/home/home_admission/` },
  { key: 'button-14', img: 'assets/wp-content/uploads/2026/03/2-300x86.png', label: 'Notices', href: `${SITE}/home/home_notices/` },
  { key: 'button-15', img: 'assets/wp-content/uploads/2026/03/3-300x86.png', label: 'Examination', href: `${SITE}/home/home_examination/` },
  { key: 'button-16', img: 'assets/wp-content/uploads/2026/03/4-300x86.png', label: 'Results', href: `${SITE}/home/home_results/` },
  { key: 'button-17', img: 'assets/wp-content/uploads/2026/03/5-300x86.png', label: 'Uniform Mental Health Policy', href: `${SITE}/umhp/` },
]

/* §2.9 ten tiles. `wrapper` = the exad-link-anything div (its own URL),
   `inner` = the anchor around the image where the capture has one. */
export const IMPORTANT_LINKS = [
  { wrapperKey: 'button-23', innerKey: null, caption: 'Mandatory Disclosure', img: 'assets/wp-content/uploads/2021/11/mandatoryDisclosure1-150x129-1.jpg', wrapperHref: `${SITE}/wp-content/uploads/2026/05/OPMD-2026-All-Pages.pdf`, innerHref: null },
  { wrapperKey: 'button-24', innerKey: 'link-8', caption: 'Pay Fees Online', img: 'assets/wp-content/uploads/2021/11/hdfcBank-1.png', wrapperHref: 'https://www.eduqfix.com/PayDirect/#/student/pay/BGfMyfMMIKSJUDBJhq71k6d707Yz35ArbsHjvjvoF2vja5f0hTLnZhI1+Zl3TU5d/1540', innerHref: 'https://paydirect.eduqfix.com/app/BGfMyfMMIKSJUDBJhq71k6d707Yz35ArbsHjvjvo/1540' },
  { wrapperKey: null, innerKey: 'link-9', caption: 'Academic Calender', img: 'assets/wp-content/uploads/2021/11/calendar-150x150-1.png', wrapperHref: null, innerHref: `${SITE}/wp-content/uploads/2025/08/AcademicCalendar2025OddSemesterRevised1August.pdf` },
  { wrapperKey: 'button-25', innerKey: 'link-10', caption: 'Webmail', img: 'assets/wp-content/uploads/2021/11/webmail.png', wrapperHref: 'https://cs-mum-21.webhostbox.net:2096/', innerHref: 'https://cs-mum-21.webhostbox.net:2096/' },
  { wrapperKey: 'button-26', innerKey: null, caption: 'CIBA', img: 'assets/wp-content/uploads/2021/11/Logo_ciba_pcce.png', wrapperHref: 'https://ciba.org.in/home.php#', innerHref: null },
  { wrapperKey: 'button-27', innerKey: 'link-11', caption: 'NIRF Ranking', img: 'assets/wp-content/uploads/2021/11/nirf-150x150-1.png', wrapperHref: `${SITE}/wp-content/uploads/2022/02/NIRF-2022-FINAL-REPORT.pdf`, innerHref: `${SITE}/wp-content/uploads/2026/04/NIRF-Report-February-2026.pdf` },
  { wrapperKey: null, innerKey: 'link-12', caption: 'IQAC', img: 'assets/wp-content/uploads/2021/11/index.png', wrapperHref: null, innerHref: `${SITE}/home/home_iqac` },
  { wrapperKey: null, innerKey: 'link-13', caption: 'Grievance Redressal', img: 'assets/wp-content/uploads/2022/04/Grievance-Redressal-Cell-1.png', wrapperHref: null, innerHref: `${SITE}/wp-content/uploads/2024/02/Grievance_Redressal_Committee_26-04-2023.pdf` },
  { wrapperKey: null, innerKey: 'link-14', caption: 'Anti Ragging Cell', img: 'assets/wp-content/uploads/2022/04/Administration_AntiRaging.png.jpg', wrapperHref: null, innerHref: `${SITE}/wp-content/uploads/2022/03/ANTI-RAGGING.pdf` },
  { wrapperKey: null, innerKey: 'link-15', caption: 'AICTE Feedback Facility of Students and Faculty', img: 'assets/wp-content/uploads/2022/04/AICTE-FEEDBACK-1.png', wrapperHref: null, innerHref: 'https://www.aicte-india.org/feedback/' },
]

/* 40 placement posters, DOM slide order (group-1-40 first). */
export const PLACEMENT_SLIDES = [
  'assets/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-30-at-10.53.01-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-30-at-10.53.00-724x1024.jpeg',
  'assets/wp-content/uploads/2025/07/WhatsApp-Image-2025-06-30-at-10.53.01-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-13-at-11.43.50-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-13-at-11.43.50-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-12-at-16.53.32-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-12-at-11.27.57-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-10-at-14.39.05-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-07-at-19.28.16-1-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-07-at-19.28.16-2-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-07-at-19.28.16-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-10-at-14.39.05-724x1024.jpeg',
  'assets/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-07-at-19.28.16-724x1024.jpeg',
  'assets/wp-content/uploads/2025/05/HFCL-724x1024.jpeg',
  'assets/wp-content/uploads/2025/05/Speed-724x1024.jpeg',
  'assets/wp-content/uploads/2025/05/Kilowott-724x1024.jpeg',
  'assets/wp-content/uploads/2025/05/Eyelit-724x1024.jpeg',
  'assets/wp-content/uploads/2025/05/EDOT-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.16.53-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.16.53-2-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.16.53-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.16.54-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.16.54-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.57-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.56-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.56-3-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.56-2-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.56-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.55-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.55-2-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.55-1-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.54-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.54-2-724x1024.jpeg',
  'assets/wp-content/uploads/2025/04/WhatsApp-Image-2025-03-31-at-05.24.54-1-724x1024.jpeg',
  'assets/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-22-at-15.41.26-724x1024.jpeg',
  'assets/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-22-at-15.57.32-2-724x1024.jpeg',
  'assets/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-22-at-15.57.32-1-724x1024.jpeg',
  'assets/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-22-at-15.57.32-724x1024.jpeg',
  'assets/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-21.36.22-724x1024.jpeg',
  'assets/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-15-at-21.36.21-724x1024.jpeg',
]

export const COUNTERS = [
  { to: 7000, delimiter: ',', suffix: '+', label: 'Alumni' },
  { to: 90, delimiter: ',', suffix: '+', label: 'Companies' },
  { to: 180, delimiter: ',', suffix: '+', label: 'Job Offers Annually' },
]

/* Campus activity posts, in the slick slide order of the capture
   (the first real slide is "First Year Induction Programme For"). */
export const POSTS = [
  { key: 'link-first-year-induction-programme-f', readMoreKey: 'link-read-more-6', imgKey: 'link-19', date: '16 August 2026', title: 'First Year Induction Programme For', img: 'assets/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-28-at-3.31.21-PM-396x360.jpeg', href: `${SITE}/2026/08/16/first-year-induction-programme/` },
  { key: 'link-hands-on-drone-technology-bootca', readMoreKey: 'link-read-more-7', imgKey: 'link-20', date: '18 May 2026', title: 'Hands-on Drone Technology Bootcamp', img: 'assets/wp-content/uploads/2026/05/a1-396x360.jpg', href: `${SITE}/2026/05/18/hands-on-drone-technology-bootcamp/` },
  { key: 'link-drone-technology-workshop', readMoreKey: 'link-read-more-8', imgKey: 'link-21', date: '25 April 2026', title: 'Drone Technology Workshop', img: 'assets/wp-content/uploads/2026/04/drone1-396x360.jpg', href: `${SITE}/2026/04/25/drone-technology-workshop/` },
  { key: 'link-blood-donation-camp', readMoreKey: 'link-read-more-3', imgKey: 'link-16', date: '12 April 2026', title: 'Blood Donation Camp', img: 'assets/wp-content/uploads/2026/06/image3-396x360.png', href: `${SITE}/2026/04/12/blood-donation-camp-2/` },
  { key: 'link-ishrae-visited-acrex-india-2026', readMoreKey: 'link-read-more-4', imgKey: 'link-17', date: '24 March 2026', title: 'ISHRAE visited ACREX India 2026', img: 'assets/wp-content/uploads/2026/04/image7-396x360.png', href: `${SITE}/2026/03/24/ishrae-visited-acrex-india-2026/` },
  { key: 'link-faculty-visit-gpp', readMoreKey: 'link-read-more-5', imgKey: 'link-18', date: '24 March 2026', title: 'Faculty visit GPP', img: 'assets/wp-content/uploads/2026/04/image7-396x360.png', href: `${SITE}/2026/03/24/faculty-visit-gpp/` },
]

/* §2.12 footer. The last five useful links have no href in the capture (known gap). */
export const USEFUL_LINKS = [
  { key: 'link-student-rules-and-policies', text: 'Student Rules and Policies', href: `${SITE}/wp-content/uploads/2025/05/PCCE-HANDBOOK.pdf` },
  { key: 'link-faculty-rules-and-policies', text: 'Faculty Rules and Policies', href: `${SITE}/wp-content/uploads/2025/05/FACULTY-AND-STAFF-RULES.pdf` },
  { key: null, text: 'Goa University', href: null },
  { key: null, text: 'All India Council For Technical Education (AICTE)', href: null },
  { key: null, text: 'Directorate Of Technical Education ,Goa', href: null },
  { key: null, text: 'Goa Technology Association (GTA)', href: null },
  { key: null, text: 'Online Payment Facility', href: null },
]
